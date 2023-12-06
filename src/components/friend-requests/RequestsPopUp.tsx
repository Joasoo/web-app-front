import { useNavigate } from 'react-router-dom'
import { FriendListModel } from '../../model/friend-list.model'
import { DynamicFriendButton } from '../../pages/profile-page/dynamic-button/DynamicFriendButton'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { ROUTE_PROFILE } from '../../util/RouteConstants'
import { formatFullName } from '../../util/StringUtil'
import { Loader } from '../loader/Loader'
import './friend-requests.scss'

export type RequestsPopUpProps = {
    loading: boolean
    requests: FriendListModel[]
    onClick: () => void
    setOpen: (value: boolean) => void
}

export const RequestsPopUp = (props: RequestsPopUpProps) => {
    const personId = StorageUtil.get<number>('SESSION', 'personId') as number
    const navigate = useNavigate()

    return (
        <div className={'pop-up'}>
            <h4>Friend Requests</h4>
            <hr className={'color-text-1'} />
            <div>
                {props.loading ? (
                    <Loader className={'mx-auto'} size={'5em'} />
                ) : (
                    <div className={'d-flex flex-column gap-3'}>
                        {props.requests.length === 0 ? 'There are no pending requests.' : ''}
                        {props.requests.map((req) => {
                            return (
                                <div className={'d-flex flex-row gap-2 justify-content-between w-100'} key={req.id}>
                                    <div className={'d-flex flex-row gap-2'}>
                                        <div
                                            style={{
                                                width: '1.5em',
                                                height: '1.5em',
                                                backgroundColor: 'lightslategray',
                                                borderRadius: '100%',
                                            }}
                                        />
                                        <div
                                            className={'friend-name'}
                                            onClick={() => {
                                                props.setOpen(false)
                                                navigate(ROUTE_PROFILE + `/${req.id}`)
                                            }}
                                        >
                                            {formatFullName(req.name)}
                                        </div>
                                    </div>
                                    <div className={'d-flex gap-2'}>
                                        <DynamicFriendButton
                                            statusCode={req.status}
                                            personId={personId}
                                            friendId={req.id}
                                            onClick={() => {
                                                props?.onClick()
                                            }}
                                            className={'btn-sm px-1 py-0'}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
