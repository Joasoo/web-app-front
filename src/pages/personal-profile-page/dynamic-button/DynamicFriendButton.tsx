import { AddFriendButton } from './AddFriendButton'
import { RemoveFriendButton } from './RemoveFriendButton'
import { FriendshipStatus } from '../../../util/enum/FriendshipStatus'
import { StatusCodeModel } from '../../../model/status-code.model'

export type DynamicButtonProps = {
    statusCode: StatusCodeModel,
    personId: string,
    friendId: string,
    onClick: () => void
}

export type DynamicSubButtonProps = {
    friendshipStatusCode: keyof typeof FriendshipStatus | undefined,
    personId: string,
    friendId: string,
    onClick: () => void
}


export const DynamicFriendButton = (props: DynamicButtonProps) => {
    const status = props.statusCode ? props.statusCode.code : undefined;

    return (
        <>
            {
                status === FriendshipStatus.FR_STATUS_A || status === FriendshipStatus.FR_STATUS_S ?
                    <RemoveFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        friendshipStatusCode={status}
                        onClick={props.onClick}
                    /> : ''
            }

            {
                status === FriendshipStatus.FR_STATUS_R ?
                    <>
                        <AddFriendButton
                            personId={props.personId}
                            friendId={props.friendId}
                            friendshipStatusCode={status}
                            onClick={props.onClick}
                        />
                        <RemoveFriendButton
                            personId={props.personId}
                            friendId={props.friendId}
                            friendshipStatusCode={status}
                            onClick={props.onClick}
                        />
                    </> : ''
            }

            {
                status === undefined ?
                    <AddFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        friendshipStatusCode={status}
                        onClick={props.onClick}
                    /> : ''
            }
        </>
    )
}
