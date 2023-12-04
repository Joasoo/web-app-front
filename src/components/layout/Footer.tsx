import { Link } from 'react-router-dom'
import { ROUTE_PRIVACY_POLICY, ROUTE_TOS } from '../../util/RouteConstants'
import './footer.scss'

export default function Footer(props: any) {
    return (
        <footer className={'custom-footer custom-card'}>
            <div className={'justify-content-center'}>
                <Link to={ROUTE_PRIVACY_POLICY}>Privacy policy</Link>
            </div>
            <div>
                <Link to={ROUTE_TOS}>Terms of Service</Link>
            </div>
            <div>{/*For padding*/}</div>
            <div className={'d-flex gap-2 justify-content-center'}>
                <i className={'bi-c-circle'} />
                Copyright Fakebook Inc. 2023
            </div>
        </footer>
    )
}
