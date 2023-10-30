import { useFetch } from '../../../hooks/useFetch'
import { FriendRequestModel } from '../../../model/friend-request-model'
import { PATH_FRIEND_ADD } from '../../../util/RequestConstants'
import { BaseButton } from './BaseButton'
import { DynamicButtonSubProps } from './DynamicFriendButton'
import { ParsedFriendship } from '../../../util/ParseFriendshipStatus'


function getValue(friendshipStatus: string) {
    switch (friendshipStatus) {
        case ParsedFriendship.REQUEST_PENDING_FROM_FRIEND: {
            return 'Accept Friend Request'
        }
        case ParsedFriendship.NO_FRIEND_RELATION: {
            return 'Add Friend'
        }
        default: {
            return 'Unexpected Error'
        }
    }
}

function getStyling(friendshipStatus: string) {
    switch (friendshipStatus) {
        case ParsedFriendship.REQUEST_PENDING_FROM_FRIEND: {
            return 'accept-request'
        }
        case ParsedFriendship.NO_FRIEND_RELATION: {
            return 'add-friend'
        }
        default: {
            return ''
        }
    }
}

export const AddFriendButton = (props: DynamicButtonSubProps) => {
    const { postJson } = useFetch()

    function addFriend() {
        const friendRequest = new FriendRequestModel(props.personId, props.friendId)
        console.log("Person id: " + props.personId)
        console.log("Friend id: " + props.friendId)
        postJson(PATH_FRIEND_ADD, friendRequest)
            .then(() => {
                props.onClick()
            })
    }

    return <BaseButton
        className={getStyling(props.parsedStatus) + " btn-secondary"}
        value={getValue(props.parsedStatus)}
        onClick={addFriend}
    />
}
