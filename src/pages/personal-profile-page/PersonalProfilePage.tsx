import { ReactNode, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../App.scss'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { ProfilePageLoader } from '../../index'
import { PostModel } from '../../model/post.model'
import { ProfileDataModel } from '../../model/profile-data.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_POST_PERSON, PATH_PROFILE } from '../../util/RequestConstants'
import { ROUTE_PROFILE_EDIT } from '../../util/RouteConstants'
import { formatDateString } from '../../util/StringUtil'
import { CreatePostSection } from './CreatePostSection'
import { InformationAndBio } from './InformationAndBio'
import './PersonalProfilePage.scss'
import { Post } from './Post'

type ProfilePageProps = {
    className?: string
    children?: ReactNode
}

export const PersonalProfilePage = (props: ProfilePageProps) => {
    const { getJson } = useFetch()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { profileId } = useLoaderData() as ProfilePageLoader
    const isOwner = StorageUtil.get('SESSION', 'personId') === String(profileId)
    // const foreignProfileId = new URLSearchParams(window.location.search).get('id') <- For params

    useEffect(() => {
        if (isOwner) {
            /*todo Logic for personal page*/
            const token = StorageUtil.get<string>('SESSION', 'token')
            console.log(token)
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${profileId}`, undefined, token)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`, undefined, token)
            Promise.all([getProfileData, getPosts]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setLoading(false)
            })
        } else {
            /*todo logic for foreign/friends page*/
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${profileId}`)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`)
            Promise.all([getProfileData, getPosts]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setLoading(false)
            })
        }
    }, [])

    function refreshPosts() {
        getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`)
            .then((res) => {
                setPostList(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (loading) {
        return <Loader overlay />
    }

    return (
        <div>
            <div className={'profile-box'}>
                <div className={'profile-background bg bg-secondary-subtle border rounded'} />
                <div className={'flex-center'}>
                    <div className={'profile-picture rounded-circle bg bg-secondary'} />
                </div>

                <div className={'d-flex justify-content-end'}>
                    {isOwner ? (
                        <input
                            className={'btn btn-primary align-self-end'}
                            type={'button'}
                            value={'Edit Profile'}
                            onClick={() => navigate(ROUTE_PROFILE_EDIT + '?id=' + profileId)}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <div className={'d-flex justify-content-center'}>
                    <h2>
                        {profileData?.firstName} {profileData?.lastName}
                    </h2>
                </div>

                <InformationAndBio
                    dateOfBirth={profileData?.dateOfBirth}
                    workplace={profileData?.workplace}
                    residence={profileData?.residence}
                    hometown={profileData?.hometown}
                    bio={profileData?.bio}
                />

                <Tabs>
                    <TabList>
                        <Tab>Posts</Tab>
                        <Tab>Friends</Tab>
                        <Tab>Photos</Tab>
                    </TabList>

                    <TabPanel className={'align-items-start'}>
                        {isOwner ? (
                            <>
                                <CreatePostSection profileId={profileId} onCreate={refreshPosts} />

                                <h4 className={'mt-5'}>Posts</h4>
                            </>
                        ) : (
                            ''
                        )}

                        <>
                            {Array.isArray(postList)
                                ? postList?.map((post) => {
                                      return (
                                          <Post
                                              key={post.id}
                                              id={post.id}
                                              content={post.content}
                                              author={post.author}
                                              createdAt={formatDateString(post.createdAt)}
                                              isOwner={isOwner}
                                              onClickDelete={refreshPosts}
                                          />
                                      )
                                  })
                                : ''}
                        </>
                    </TabPanel>

                    <TabPanel>(!) Friends not implemented</TabPanel>

                    <TabPanel>(!) Photos not implemented</TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
