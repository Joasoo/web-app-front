import { useNavigate } from 'react-router-dom'
import { ROUTE_PRIVACY_POLICY, ROUTE_TOS } from '../../util/RouteConstants'
import './footer.scss'

export default function Footer(props: any) {
    const navigate = useNavigate()
    return (
        <footer className={'custom-footer custom-card'}>
            <div
                className={'underline'}
                onClick={() => {
                    navigate(ROUTE_PRIVACY_POLICY)
                }}
            >
                Privacy policy
            </div>
            <div
                className={'underline'}
                onClick={() => {
                    navigate(ROUTE_TOS)
                }}
            >
                Terms of Service
            </div>
            <div>{/*For padding*/}</div>
            <div className={'d-flex gap-2 justify-content-center'}>
                <i className={'bi-c-circle'} />
                Copyright Fakebook Inc. 2023
            </div>
        </footer>
    )
}
