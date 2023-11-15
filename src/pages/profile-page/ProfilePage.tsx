import { ReactNode, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../App.scss'
import { InputButton } from '../../components/button/InputButton'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { ProfilePageLoader } from '../../index'
import { FriendListModel } from '../../model/friend-list.model'
import { ProfileDataModel } from '../../model/profile-data.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_FRIEND_STATUS, PATH_PROFILE } from '../../util/RequestConstants'
import { ROUTE_PROFILE_EDIT } from '../../util/RouteConstants'
import { FriendsTab } from '../profile-page-tabs/friends-tab/FriendsTab'
import { PostsTab } from '../profile-page-tabs/posts-tab/PostsTab'
import { DynamicFriendButton } from './dynamic-button/DynamicFriendButton'
import { InformationAndBio } from './InformationAndBio'
import './profile-page.scss'

type ProfilePageProps = {
    className?: string
    children?: ReactNode
}

export const ProfilePage = (props: ProfilePageProps) => {
    const { getJson } = useFetch()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [friendship, setFriendship] = useState<FriendListModel>()
    const [loading, setLoading] = useState<boolean>(true)
    const { profileId } = useLoaderData() as ProfilePageLoader
    const sessionId = StorageUtil.get<number>('SESSION', 'personId') as number
    const token = StorageUtil.get<string>('SESSION', 'token')
    if (sessionId === null || sessionId === undefined) {
        /*todo navigate to login page, display proper error.*/
        throw new Error()
    }
    const isOwner = Number(sessionId) === Number(profileId)

    function requestFriendship() {
        let params = {
            personId: sessionId ?? '',
            friendId: profileId ?? '',
        }
        return getJson<FriendListModel>(PATH_FRIEND_STATUS, params, token)
    }

    function requestProfileData() {
        return getJson<ProfileDataModel>(PATH_PROFILE + `/${profileId}`, undefined, token)
    }

    useEffect(() => {
        if (isOwner) {
            console.log(token)
            requestProfileData().then((res) => {
                setProfileData(res)
                setLoading(false)
            })
        } else {
            const getProfileData = requestProfileData()
            const getFriendship = requestFriendship()
            Promise.all([getProfileData, getFriendship]).then((res) => {
                setProfileData(res[0])
                setFriendship(res[1])
                setLoading(false)
            })
        }
    }, [profileId])

    function refreshFriendship() {
        requestFriendship().then((res) => {
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
                        <InputButton
                            type={'info'}
                            label={'Edit Profile'}
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

                    <TabPanel>
                        <PostsTab isOwner={isOwner} className={'align-items-start w-100'} />
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
