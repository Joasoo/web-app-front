import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { FullNameModel } from '../../model/full-name.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_PROFILE_NAME } from '../../util/RequestConstants'
import { ROUTE_FEED, ROUTE_LOGIN, ROUTE_PROFILE } from '../../util/RouteConstants'
import { formatFullName } from '../../util/StringUtil'
import { FriendRequests } from '../friend-requests/FriendRequests'
import { Loader } from '../loader/Loader'
import { SearchBar } from '../search/SearchBar'
import './header.scss'

export default function Header(props: any) {
    const navigate = useNavigate()
    const [name, setName] = useState<FullNameModel>()
    const [loading, setLoading] = useState<boolean>(false)
    const { handleError } = useErrorHandler()
    const personId = StorageUtil.get<number>('SESSION', 'personId')
    const token = StorageUtil.get<string>('SESSION', 'token')
    const { getJson } = useFetch()

    useEffect(() => {
        setLoading(true)
        getJson<FullNameModel>(PATH_PROFILE_NAME + `/${personId}`, undefined, token)
            .then((res) => {
                setName(res)
                setLoading(false)
            })
            .catch((err) => {
                handleError(err)
                setLoading(false)
            })
    }, [])

    const logOut = () => {
        StorageUtil.clear('SESSION')
        navigate(ROUTE_LOGIN)
    }

    return (
        <header className={'custom-header custom-card position-sticky top-0 justify-content-evenly'}>
            <div className={'h-100 fit-content d-flex align-items-center px-4 gap-3'}>
                <div
                    style={{ width: '3.5em', height: '3.5em', backgroundColor: 'lightslategray', borderRadius: '100%' }}
                />
                <div onClick={() => navigate(ROUTE_PROFILE + `/${personId}`)} className={'clickable'}>
                    {loading ? <Loader size={'2.5em'} /> : formatFullName(name)}
                </div>
            </div>
            <div className={'d-flex flex-row align-items-center gap-2'}>
                <SearchBar />
                <div
                    className={'clickable'}
                    onClick={() => {
                        navigate(ROUTE_FEED)
                    }}
                >
                    Feed
                </div>
            </div>
            <div className={'h-100 fit-content d-flex align-items-center px-4 gap-5'}>
                <FriendRequests />
                <div className={'clickable'} onClick={logOut}>
                    Log Out
                </div>
            </div>
        </header>
    )
}
