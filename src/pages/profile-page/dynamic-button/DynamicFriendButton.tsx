import { StatusCodeModel } from '../../../model/status-code.model'
import { FriendshipStatus } from '../../../util/enum/FriendshipStatus'
import { AddFriendButton } from './AddFriendButton'
import { RemoveFriendButton } from './RemoveFriendButton'

export type DynamicButtonProps = {
    statusCode: StatusCodeModel | undefined
    personId: number
    friendId: number
    onClick: () => void
    className?: string
}

export type DynamicSubButtonProps = {
    friendshipStatusCode: keyof typeof FriendshipStatus | undefined
    personId: number
    friendId: number
    onClick: () => void
    className?: string
}

export const DynamicFriendButton = (props: DynamicButtonProps) => {
    const status = props.statusCode ? props.statusCode.code : undefined

    return (
        <>
            {status === FriendshipStatus.FR_STATUS_A || status === FriendshipStatus.FR_STATUS_S ? (
                <RemoveFriendButton
                    personId={props.personId}
                    friendId={props.friendId}
                    friendshipStatusCode={status}
                    onClick={props.onClick}
                    className={props.className}
                />
            ) : (
                ''
            )}

            {status === FriendshipStatus.FR_STATUS_R ? (
                <>
                    <AddFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        friendshipStatusCode={status}
                        onClick={props.onClick}
                        className={props.className}
                    />
                    <RemoveFriendButton
                        personId={props.personId}
                        friendId={props.friendId}
                        friendshipStatusCode={status}
                        onClick={props.onClick}
                        className={props.className}
                    />
                </>
            ) : (
                ''
            )}

            {status === undefined ? (
                <AddFriendButton
                    personId={props.personId}
                    friendId={props.friendId}
                    friendshipStatusCode={status}
                    onClick={props.onClick}
                    className={props.className}
                />
            ) : (
                ''
            )}
        </>
    )
}
