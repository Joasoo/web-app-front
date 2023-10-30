import { useFetch } from '../../../hooks/useFetch'
import { PATH_FRIEND_REMOVE } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicButtonSubProps } from './DynamicFriendButton'
import './Button.scss'
import { ParsedFriendship } from '../../../util/ParseFriendshipStatus'

const textValues = {
    ALREADY_FRIENDS: 'Remove Friend',
    REQUEST_PENDING_FROM_PERSON: 'Cancel Friend Request',
    REQUEST_PENDING_FROM_FRIEND: 'Decline Friend Request',
}

const buttonStyling = {
    ALREADY_FRIENDS: 'remove-friend',
    REQUEST_PENDING_FROM_PERSON: 'cancel-request',
    REQUEST_PENDING_FROM_FRIEND: 'decline-request',
}

function getValue(friendshipStatus: string) {
    switch (friendshipStatus) {
        case ParsedFriendship.ALREADY_FRIENDS: {
            return 'Remove Friend'
        }
        case ParsedFriendship.REQUEST_PENDING_FROM_PERSON: {
            return 'Cancel Friend Request'
        }
        case ParsedFriendship.REQUEST_PENDING_FROM_FRIEND: {
            return 'Decline Friend Request'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

function getStyling(friendshipStatus: string) {
    switch (friendshipStatus) {
        case ParsedFriendship.ALREADY_FRIENDS: {
            return 'remove-friend'
        }
        case ParsedFriendship.REQUEST_PENDING_FROM_PERSON: {
            return 'cancel-request'
        }
        case ParsedFriendship.REQUEST_PENDING_FROM_FRIEND: {
            return 'decline-request'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

export const RemoveFriendButton = (props: DynamicButtonSubProps) => {
    const { deleteJson } = useFetch()

    function removeFriend() {
        let params = {
            'personId': props.personId,
            'friendId': props.friendId,
        }
        deleteJson(PATH_FRIEND_REMOVE, params)
            .then(() => {
                props.onClick()
            })
    }

    return <BaseButton
        className={getStyling(props.parsedStatus) + " btn-danger"}
        value={getValue(props.parsedStatus)}
        onClick={removeFriend}
    />
}