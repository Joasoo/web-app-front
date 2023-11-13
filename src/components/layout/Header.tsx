import React from 'react';
import './header.scss';
import {BrowserRouter} from "react-router-dom";


export default function Header(props: any) {
    return (
        <BrowserRouter>
            <div className={'header-flex-parent custom-card p-3'}>
                <div className={'header-flex-item'}>
                    Item 1
                </div>
                <div className={'header-flex-item'}>
                    Item 2
                </div>
            </div>
        </BrowserRouter>
    )
}
