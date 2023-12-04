import { useEffect } from 'react'
import { FriendListModel } from '../../model/friend-list.model'
import { DynamicFriendButton } from '../../pages/profile-page/dynamic-button/DynamicFriendButton'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { formatFullName } from '../../util/StringUtil'
import { Loader } from '../loader/Loader'
import './friend-requests.scss'

export type RequestsPopUpProps = {
    loading: boolean
    requests: FriendListModel[]
    onClick: () => void
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
                    <>
                        {props.requests.length === 0 ? 'There are no pending requests.' : ''}
                        {props.requests.map((req) => {
                            return (
                                <div className={'d-flex flex-row gap-2'} key={req.id}>
                                    <div
                                        style={{
                                            width: '1.5em',
                                            height: '1.5em',
                                            backgroundColor: 'lightslategray',
                                            borderRadius: '100%',
                                        }}
                                    />
                                    {formatFullName(req.name)}
                                    <DynamicFriendButton
                                        statusCode={req.status}
                                        personId={personId}
                                        friendId={req.id}
                                        onClick={() => {
                                            props?.onClick()
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </div>
    )
}
