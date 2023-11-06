import React from 'react';
import './header.scss';

export default function Header(props: any) {
    return (
        <div >
            <p>{props.children}</p>
        </div>
    )
}
