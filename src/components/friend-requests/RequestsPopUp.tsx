import { Dispatch, SetStateAction, useEffect } from 'react'
import { FriendListModel } from '../../model/friend-list.model'
import { DynamicFriendButton } from '../../pages/profile-page/dynamic-button/DynamicFriendButton'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { formatFullName } from '../../util/StringUtil'
import { Loader } from '../loader/Loader'
import './friend-requests.scss'
import { Link } from 'react-router-dom'
import { ROUTE_PROFILE } from '../../util/RouteConstants'

export type RequestsPopUpProps = {
    loading: boolean
    requests: FriendListModel[]
    onClick: () => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const RequestsPopUp = (props: RequestsPopUpProps) => {
    const personId = StorageUtil.get<number>('SESSION', 'personId') as number

    useEffect(() => {
        props.onClick()
    }, [])

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
                                        <Link to={ROUTE_PROFILE + `\/${req.id}`}
                                              className={'friend-name text-decoration-none'}
                                              onClick={() => props.setOpen(false)}>
                                            {formatFullName(req.name)}
                                        </Link>
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
