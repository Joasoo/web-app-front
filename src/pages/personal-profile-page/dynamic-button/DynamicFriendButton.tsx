import { FriendshipModel } from '../../../model/friendship-model'
import { ParsedFriendship, parseFriendshipStatus } from '../../../util/ParseFriendshipStatus'
import { AddFriendButton } from './AddFriendButton'
import { RemoveFriendButton } from './RemoveFriendButton'

export type DynamicButtonProps = {
    friendshipStatus: FriendshipModel,
    personId: string,
    friendId: string,
    onClick: () => void
}

export type DynamicButtonSubProps = {
    parsedStatus: string,
    personId: string,
    friendId: string,
    onClick: () => void
}

export const DynamicFriendButton = (props: DynamicButtonProps) => {
    const status = parseFriendshipStatus(props.friendshipStatus)

    return (
        <>
            {
                status == ParsedFriendship.ALREADY_FRIENDS || status == ParsedFriendship.REQUEST_PENDING_FROM_PERSON ?
                    <RemoveFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        parsedStatus={status}
                        onClick={props.onClick}
                    /> : ''
            }

            {
                status == ParsedFriendship.REQUEST_PENDING_FROM_FRIEND ?
                    <div className={'d-flex flex-column'}>
                        <AddFriendButton
                            personId={props.personId}
                            friendId={props.friendId}
                            parsedStatus={status}
                            onClick={props.onClick}
                        />
                        <RemoveFriendButton
                            personId={props.personId}
                            friendId={props.friendId}
                            parsedStatus={status}
                            onClick={props.onClick}
                        />
                    </div> : ''
            }

            {
                status == ParsedFriendship.NO_FRIEND_RELATION ?
                    <AddFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        parsedStatus={status}
                        onClick={props.onClick}
                    /> : ''
            }
        </>
    )
}
