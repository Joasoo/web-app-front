import { useNavigate } from 'react-router-dom'
import { FriendListModel } from '../../../model/friend-list.model'
import { FriendshipStatus } from '../../../util/enum/FriendshipStatus'
import { ROUTE_PROFILE } from '../../../util/RouteConstants'
import './friend-slot.scss'

export type FriendSlotProps = {
    data: FriendListModel
}

export const FriendSlot = ({ data, ...props }: FriendSlotProps) => {
    const navigate = useNavigate()

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
                {data.status.code === FriendshipStatus.FR_STATUS_A ? <div>Remove friend button</div> : ''}
                {data.status.code === FriendshipStatus.FR_STATUS_S ? <div>Cancel friend request</div> : ''}
            </div>
        </div>
    )
}
