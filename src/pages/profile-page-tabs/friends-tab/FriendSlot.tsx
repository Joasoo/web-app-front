import { useLoaderData, useNavigate } from 'react-router-dom'
import { ProfilePageLoader } from '../../../index'
import { FriendListModel } from '../../../model/friend-list.model'
import { ROUTE_PROFILE } from '../../../util/RouteConstants'
import { DynamicFriendButton } from '../../personal-profile-page/dynamic-button/DynamicFriendButton'
import './friend-slot.scss'

export type FriendSlotProps = {
    data: FriendListModel
    isOwner: boolean
}

export const FriendSlot = ({ data, ...props }: FriendSlotProps) => {
    const navigate = useNavigate()
    const { profileId } = useLoaderData() as ProfilePageLoader

    return (
        <div className={'friend-slot p-3 rounded-4 d-flex flex-row align-items-center'}>
            {/*todo Placeholder for profile pic*/}
            <div
                style={{ width: '3.5em', height: '3.5em', backgroundColor: 'lightslategray', borderRadius: '100%' }}
                className={'me-5'}
            />
            <div className={'d-flex flex-row flex-grow-1 align-items-center justify-content-between'}>
                <h3
                    className={'friend-name'}
                    onClick={() => {
                        navigate(ROUTE_PROFILE + `/${data.id}`)
                    }}
                >
                    {data.name.firstName} {data.name.lastName}
                </h3>
                {props.isOwner ? (
                    <DynamicFriendButton
                        statusCode={data.status}
                        personId={profileId}
                        friendId={data.id}
                        onClick={() => {}}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
