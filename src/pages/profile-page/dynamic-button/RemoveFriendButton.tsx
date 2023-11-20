import { useFetch } from '../../../hooks/useFetch'
import { StorageUtil } from '../../../util/BrowerStorageUtil'
import { FriendshipStatus } from '../../../util/enum/FriendshipStatus'
import { PATH_FRIEND_REMOVE } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicSubButtonProps } from './DynamicFriendButton'

function getValue(friendshipStatus: keyof typeof FriendshipStatus | undefined) {
    switch (friendshipStatus) {
        case FriendshipStatus.FR_STATUS_A: {
            return 'Remove Friend'
        }
        case FriendshipStatus.FR_STATUS_S: {
            return 'Cancel Friend Request'
        }
        case FriendshipStatus.FR_STATUS_R: {
            return 'Decline Friend Request'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

function getStyling(friendshipStatus: keyof typeof FriendshipStatus | undefined) {
    switch (friendshipStatus) {
        case FriendshipStatus.FR_STATUS_A: {
            return 'remove-friend'
        }
        case FriendshipStatus.FR_STATUS_S: {
            return 'cancel-request'
        }
        case FriendshipStatus.FR_STATUS_R: {
            return 'decline-request'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

export const RemoveFriendButton = (props: DynamicSubButtonProps) => {
    const { deleteJson } = useFetch()
    const token = StorageUtil.get<string>('SESSION', 'token')

    function removeFriend() {
        let params = {
            personId: props.personId,
            friendId: props.friendId,
        }
        deleteJson(PATH_FRIEND_REMOVE, params, token).then(() => {
            props.onClick()
        })
    }

    return (
        <BaseButton
            className={getStyling(props.friendshipStatusCode) + ' btn-danger'}
            value={getValue(props.friendshipStatusCode)}
            onClick={removeFriend}
        />
    )
}
