import { SearchBar } from '../search/SearchBar'
import './header.scss'

export default function Header(props: any) {
    return (
        <header className={'custom-header custom-card position-sticky top-0 justify-content-evenly'}>
            <div className={'h-100 fit-content d-flex align-items-center px-4 gap-3'}>
                <div
                    style={{ width: '3.5em', height: '3.5em', backgroundColor: 'lightslategray', borderRadius: '100%' }}
                />
                <div className={'clickable'}>PERSON NAME</div>
            </div>
            <SearchBar />
            <div className={'h-100 fit-content d-flex align-items-center px-4 gap-5'}>
                <i className={'bi-person-circle'} style={{ fontSize: '2em' }} />
                <div className={'clickable'}>Log Out</div>
            </div>
        </header>
    )
}
