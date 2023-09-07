import React, {ReactNode} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom";
import {TestPageLoader} from "../index";
import {ROUTE_INNER} from "../util/RouteConstants";

type TestProps = {
    className?: string;
    children?: ReactNode;
};
export const Test = (props: TestProps) => {
    const navigate = useNavigate();

    return (
        <div>
            Test page.
            <input type={"button"} value={"To inner page."} onClick={() => navigate(ROUTE_INNER)}/>
        </div>
    );
};