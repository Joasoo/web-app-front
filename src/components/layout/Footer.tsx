import './footer.scss';
import React from 'react';
import {Link, BrowserRouter} from "react-router-dom";
import {ROUTE_PRIVACY_POLICY, ROUTE_TOS} from "../../util/RouteConstants";


export default function Footer(props: any) {
    return (
        <BrowserRouter>
                <div className={'footer-flex-parent custom-card p-3'}>
                    <div className={'footer-flex-item'}>
                        lambine text&nbsp;
                        <Link to={ROUTE_PRIVACY_POLICY}>Privacy policy</Link>
                        &nbsp;veel veits
                    </div>
                    <div className={'footer-flex-item'}>
                        <Link to={ROUTE_TOS}>Terms of Service</Link>
                    </div>
                    <div className={'footer-flex-item'}>
                        Kolmas tulp for lulz
                    </div>
                </div>
        </BrowserRouter>
    )
}
