import { useFetch } from '../../../hooks/useFetch'
import { PATH_FRIEND_REMOVE } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicButtonSubProps } from './DynamicFriendButton'
import './Button.scss'
import {
    ALREADY_FRIENDS,
    REQUEST_PENDING_FROM_FRIEND,
    REQUEST_PENDING_FROM_PERSON,
} from '../../../util/ParseFriendshipStatus'

// TODO AAAAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
const textValues = {
    ALREADY_FRIENDS: 'Remove Friend',
    REQUEST_PENDING_FROM_PERSON: 'Cancel Friend Request',
    REQUEST_PENDING_FROM_FRIEND: 'Decline Friend Request'
}

const buttonStyling = {
    ALREADY_FRIENDS: 'remove-friend',
    REQUEST_PENDING_FROM_PERSON: 'cancel-request',
    REQUEST_PENDING_FROM_FRIEND: 'decline-request'
}

export const RemoveFriendButton = (props: DynamicButtonSubProps) => {
    const { deleteJson } = useFetch()

    function removeFriend() {
        let params = {
            'personId': props.friendshipStatus.person.id,
            'friendId': props.friendshipStatus.friend.id,
        }
        deleteJson(PATH_FRIEND_REMOVE, params)
            .then(() => {
                props.onClick
            })
    }
    // TODO AAAAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    return <BaseButton
        className={buttonStyling[props.parsedStatus]}
        value={textValues[props.parsedStatus]}
        onClick={removeFriend}
    />
}