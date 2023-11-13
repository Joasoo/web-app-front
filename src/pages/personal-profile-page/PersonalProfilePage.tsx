import { ReactNode, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../App.scss'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { ProfilePageLoader } from '../../index'
import { FriendListModel } from '../../model/friend-list.model'
import { PostModel } from '../../model/post.model'
import { ProfileDataModel } from '../../model/profile-data.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_FRIEND_STATUS, PATH_POST_PERSON, PATH_PROFILE } from '../../util/RequestConstants'
import { ROUTE_PROFILE_EDIT } from '../../util/RouteConstants'
import { formatDateString } from '../../util/StringUtil'
import { FriendsTab } from '../profile-page-tabs/friends-tab/FriendsTab'
import { CreatePostSection } from './CreatePostSection'
import { DynamicFriendButton } from './dynamic-button/DynamicFriendButton'
import { InformationAndBio } from './InformationAndBio'
import './personal-profile-page.scss'
import { Post } from './Post'

type ProfilePageProps = {
    className?: string
    children?: ReactNode
}

export const PersonalProfilePage = (props: ProfilePageProps) => {
    const { getJson } = useFetch()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [friendship, setFriendship] = useState<FriendListModel>()
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { profileId } = useLoaderData() as ProfilePageLoader
    const sessionId = StorageUtil.get<number>('SESSION', 'personId') as number
    const token = StorageUtil.get<string>('SESSION', 'token')
    if (sessionId === null || sessionId === undefined) {
        /*todo navigate to login page, display proper error.*/
        throw new Error()
    }
    const isOwner = Number(sessionId) === Number(profileId)

    useEffect(() => {
        if (isOwner) {
            console.log(token)
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${profileId}`, undefined, token)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`, undefined, token)
            Promise.all([getProfileData, getPosts]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setLoading(false)
            })
        } else {
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${profileId}`, undefined, token)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`, undefined, token)
            let params = {
                personId: sessionId ?? '',
                friendId: profileId ?? '',
            }
            const getFriendship = getJson<FriendListModel>(PATH_FRIEND_STATUS, params, token)
            Promise.all([getProfileData, getPosts, getFriendship]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setFriendship(res[2])
                setLoading(false)
            })
        }
    }, [profileId])

    function refreshPosts() {
        getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`)
            .then((res) => {
                setPostList(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function refreshFriendship() {
        let params = {
            personId: sessionId ?? '',
            friendId: profileId ?? '',
        }
        getJson<FriendListModel>(PATH_FRIEND_STATUS, params).then((res) => {
            setFriendship(res)
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

                <h2 className={'mt-2 align-self-center'}>
                    {profileData?.firstName} {profileData?.lastName}
                </h2>

                <div className={'d-flex justify-content-end'}>
                    {isOwner ? (
                        <input
                            className={'btn btn-primary align-self-end'}
                            type={'button'}
                            value={'Edit Profile'}
                            onClick={() => navigate(ROUTE_PROFILE_EDIT)}
                        />
                    ) : (
                        <div className={'d-flex flex-column flex-lg-row gap-2'}>
                            <DynamicFriendButton
                                statusCode={friendship?.status}
                                personId={sessionId}
                                friendId={profileId}
                                onClick={refreshFriendship}
                            />
                        </div>
                    )}
                </div>

                <InformationAndBio
                    dateOfBirth={profileData?.dateOfBirth}
                    workplace={profileData?.workplace}
                    residence={profileData?.residence}
                    hometown={profileData?.hometown}
                    bio={profileData?.bio}
                    relationshipStatus={profileData?.relationshipStatus}
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

                    <TabPanel>
                        <FriendsTab isOwner={isOwner} />
                    </TabPanel>

                    <TabPanel>(!) Photos not implemented</TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
