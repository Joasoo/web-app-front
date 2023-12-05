import { useEffect, useState } from 'react'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { FriendListModel } from '../../model/friend-list.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_FRIEND_REQUESTS_RECEIVED } from '../../util/RequestConstants'
import './friend-requests.scss'
import { RequestsPopUp } from './RequestsPopUp'

export type FriendRequestsProps = {
    iconSize?: string
}

const _default = {
    iconSize: '2.25em',
}

export const FriendRequests = (props: FriendRequestsProps) => {
    const [pendingRequests, setPendingRequests] = useState<FriendListModel[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const pendingCountString = pendingRequests.length > 9 ? '9+' : pendingRequests.length
    const token = StorageUtil.get<string>('SESSION', 'token')
    const personId = StorageUtil.get<number>('SESSION', 'personId')
    const { getJson } = useFetch()
    const { handleError } = useErrorHandler()
    const [timer, setTimer] = useState<any>(() => {
        return setInterval(() => getReceivedRequests(true), 10_000)
    })

    const getReceivedRequests = (noLoad?: boolean) => {
        if (!noLoad) {
            setLoading(true)
        }
        getJson<FriendListModel[]>(PATH_FRIEND_REQUESTS_RECEIVED + `/${personId}`, undefined, token)
            .then((res) => {
                setPendingRequests(res)
                setLoading(false)
            })
            .catch((err) => {
                handleError(err)
                clearInterval(timer)
                setLoading(false)
            })
    }

    useEffect(() => {
        getReceivedRequests()

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className={'position-relative'}>
            <i
                className={'bi-person-circle cursor-pointer'}
                style={{ fontSize: props.iconSize ?? _default['iconSize'] }}
                onClick={() => setOpen(!open)}
            />
            {pendingRequests.length > 0 ? <div className={'pending-counter'}>{pendingCountString}</div> : ''}
            {open && (
                <RequestsPopUp
                    loading={loading}
                    requests={pendingRequests}
                    onClick={getReceivedRequests}
                    setOpen={setOpen}
                />
            )}
        </div>
    )
}
