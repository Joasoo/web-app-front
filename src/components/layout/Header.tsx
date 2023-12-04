import { useNavigate } from 'react-router-dom'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { ROUTE_LOGIN, ROUTE_PROFILE } from '../../util/RouteConstants'
import { FriendRequests } from '../friend-requests/FriendRequests'
import { SearchBar } from '../search/SearchBar'
import './header.scss'

export default function Header(props: any) {
    const navigate = useNavigate()
    const personId = StorageUtil.get<number>('SESSION', 'personId')
    const name = StorageUtil.get<string>('SESSION', 'personName') ?? '-'

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
                    {name}
                </div>
            </div>
            <SearchBar />
            <div className={'h-100 fit-content d-flex align-items-center px-4 gap-5'}>
                <FriendRequests />
                <div className={'clickable'} onClick={logOut}>
                    Log Out
                </div>
            </div>
        </header>
    )
}
