import './footer.scss';
import React from 'react';

export default function Footer(props: any) {
    return (
        <div>
            <p>{props.children}</p>
        </div>
    )
}