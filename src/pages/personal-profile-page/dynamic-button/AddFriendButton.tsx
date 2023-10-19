import { useFetch } from '../../../hooks/useFetch'
import { FriendRequestModel } from '../../../model/friend-request-model'
import { PATH_FRIEND_ADD } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicButtonSubProps } from './DynamicFriendButton'
import { REQUEST_PENDING_FROM_FRIEND, NO_FRIEND_RELATION } from '../../../util/ParseFriendshipStatus'

// TODO AAAAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
const textValues = {
    REQUEST_PENDING_FROM_FRIEND: 'Accept Friend Request',
    NO_FRIEND_RELATION: 'Add Friend',
}

const buttonStyling = {
    REQUEST_PENDING_FROM_FRIEND: 'accept-request',
    NO_FRIEND_RELATION: 'add-friend',
}

export const AddFriendButton = (props: DynamicButtonSubProps) => {
    const { postJson } = useFetch()

    function addFriend() {
        const friendRequest = new FriendRequestModel(props.friendshipStatus.person.id, props.friendshipStatus.friend.id)
        postJson(PATH_FRIEND_ADD, friendRequest)
            .then(() => {
                props.onClick
            })
    }

    // TODO AAAAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    return <BaseButton
        className={buttonStyling[props.parsedStatus]}
        value={textValues[props.parsedStatus]}
        onClick={addFriend}
    />
}