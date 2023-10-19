import { FriendshipModel } from '../../../model/friendship-model'
import {
    ALREADY_FRIENDS,
    ParseFriendshipStatus,
    REQUEST_PENDING_FROM_PERSON,
    REQUEST_PENDING_FROM_FRIEND,
    NO_FRIEND_RELATION,
} from '../../../util/ParseFriendshipStatus'
import { AddFriendButton } from './AddFriendButton'
import { RemoveFriendButton } from './RemoveFriendButton'

export type DynamicButtonProps = {
    friendshipStatus: FriendshipModel,
    onClick: () => void
}

export type DynamicButtonSubProps = {
    friendshipStatus: FriendshipModel,
    parsedStatus: string,
    onClick: () => void
}

export const DynamicFriendButton = (props: DynamicButtonProps) => {
    const status = ParseFriendshipStatus(props.friendshipStatus)

    return (
        <>
            {
                status == ALREADY_FRIENDS || status == REQUEST_PENDING_FROM_PERSON ?
                    <RemoveFriendButton
                        friendshipStatus={props.friendshipStatus}
                        parsedStatus={status}
                        onClick={props.onClick}
                    /> : ''
            }

            {
                status == REQUEST_PENDING_FROM_FRIEND ?
                    <div className={'d-flex flex-row px-3'}>
                        <AddFriendButton
                            friendshipStatus={props.friendshipStatus}
                            parsedStatus={status}
                            onClick={props.onClick}
                        />
                        <RemoveFriendButton
                            friendshipStatus={props.friendshipStatus}
                            parsedStatus={status}
                            onClick={props.onClick}
                        />
                    </div> : ''
            }

            {
                status == NO_FRIEND_RELATION ?
                    <AddFriendButton
                        friendshipStatus={props.friendshipStatus}
                        parsedStatus={status}
                        onClick={props.onClick}
                    /> : ''
            }
        </>
    )
}