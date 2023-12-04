import { useFetch } from '../../../hooks/useFetch'
import { FriendRequestModel } from '../../../model/friend-request-model'
import { FriendshipStatus } from '../../../util/enum/FriendshipStatus'
import { PATH_FRIEND_ADD } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicSubButtonProps } from './DynamicFriendButton'

function getValue(friendshipStatus: keyof typeof FriendshipStatus | undefined) {
    switch (friendshipStatus) {
        case FriendshipStatus.FR_STATUS_R: {
            return 'Accept Friend Request'
        }
        case undefined: {
            return 'Add Friend'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

function getStyling(friendshipStatus: keyof typeof FriendshipStatus | undefined) {
    switch (friendshipStatus) {
        case FriendshipStatus.FR_STATUS_R: {
            return 'accept-request'
        }
        case undefined: {
            return 'add-friend'
        }
        default: {
            return ''
        }
    }
}

export const AddFriendButton = (props: DynamicSubButtonProps) => {
    const { postJson } = useFetch()

    function addFriend() {
        const friendRequest = new FriendRequestModel(String(props.personId), String(props.friendId))
        postJson(PATH_FRIEND_ADD, friendRequest).then(() => {
            props.onClick()
        })
    }

    return (
        <BaseButton
            className={getStyling(props.friendshipStatusCode) + ' btn-secondary'}
            value={getValue(props.friendshipStatusCode)}
            onClick={addFriend}
        />
    )
}
