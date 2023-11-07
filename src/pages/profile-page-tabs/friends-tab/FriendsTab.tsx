import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Loader } from '../../../components/loader/Loader'
import { useFetch } from '../../../hooks/useFetch'
import { ProfilePageLoader } from '../../../index'
import { FriendListModel } from '../../../model/friend-list.model'
import { StorageUtil } from '../../../util/BrowerStorageUtil'
import { PATH_FRIEND_ALL } from '../../../util/RequestConstants'
import { FriendSlot } from './FriendSlot'

export type FriendsTabProps = {
    className?: string
    isOwner: boolean
}

export const FriendsTab = (props: FriendsTabProps) => {
    const { getJson } = useFetch()
    const { profileId } = useLoaderData() as ProfilePageLoader
    const [friends, setFriends] = useState<FriendListModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const token = StorageUtil.get<string>('SESSION', 'token')

    useEffect(() => {
        setLoading(true)
        getJson<FriendListModel[]>(PATH_FRIEND_ALL + `/${profileId}`, undefined, token)
            .then((res) => {
                setFriends(res)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [profileId])

    if (loading) return <Loader />

    return (
        <div className={'w-100 mb-5 px-5 ' + (props.className ?? '')}>
            {friends.map((friend) => {
                return <FriendSlot key={friend.id} data={friend} />
            })}
        </div>
    )
}
