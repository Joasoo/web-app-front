import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../App.scss'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { PostModel } from '../../model/post.model'
import { ProfileDataModel } from '../../model/profile-data.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_FRIEND_STATUS, PATH_POST_PERSON, PATH_PROFILE } from '../../util/RequestConstants'
import { ROUTE_PROFILE_EDIT } from '../../util/RouteConstants'
import { formatDateString } from '../../util/StringUtil'
import './PersonalProfilePage.scss'
import { Post } from './Post'
import { InformationAndBio } from './InformationAndBio'
import { CreatePostSection } from './CreatePostSection'
import { FriendshipModel } from '../../model/friendship-model'
import { DynamicFriendButton } from './dynamic-button/DynamicFriendButton'


type ProfilePageProps = {
    className?: string
    children?: ReactNode
}

export const PersonalProfilePage = (props: ProfilePageProps) => {
    const { getJson } = useFetch()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [friendshipStatus, setFriendshipStatus] = useState<FriendshipModel>()
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const sessionId = StorageUtil.get<string>('SESSION', 'personId')
    const token = StorageUtil.get<string>('SESSION', 'token')
    const profileId = window.location.pathname.split('/').pop()
    const isOwner = sessionId === profileId
    // const foreignProfileId = new URLSearchParams(window.location.search).get('id') <- For params

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
                'personId': sessionId ?? '',
                'friendId': profileId ?? '',
            }
            const getFriendship = getJson<FriendshipModel>(PATH_FRIEND_STATUS, params, token)
            Promise.all([getProfileData, getPosts, getFriendship]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setFriendshipStatus(res[2])
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

    function refreshFriendship() {
        let params = {
            'personId': sessionId ?? '',
            'friendId': profileId ?? '',
        }
        getJson<FriendshipModel>(PATH_FRIEND_STATUS, params)
            .then((res) => {
                setFriendshipStatus(res)
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
                    {isOwner ?
                        <input
                            className={'btn btn-primary align-self-end'}
                            type={'button'}
                            value={'Edit Profile'}
                            onClick={() => navigate(ROUTE_PROFILE_EDIT)}
                        />
                        : friendshipStatus ?
                            <DynamicFriendButton
                                friendshipStatus={friendshipStatus}
                                personId={sessionId ?? ''}
                                friendId={profileId ?? ''}
                                onClick={refreshFriendship}
                            />
                            : ''
                    }
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
                        {isOwner ?
                            <>
                                <CreatePostSection
                                    profileId={profileId}
                                    onCreate={refreshPosts}
                                />

                                <h4 className={'mt-5'}>Posts</h4>
                            </>
                            : ''
                        }

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
