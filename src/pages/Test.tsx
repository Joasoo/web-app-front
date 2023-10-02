import React, {ReactNode} from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTE_LOGIN} from "../util/RouteConstants";
import {Loader} from "../components/loader/Loader";


type TestProps = {
    className?: string;
    children?: ReactNode;
};
export const Test = (props: TestProps) => {
    const navigate = useNavigate();

    return (
        <div>
            Test page.
            <Loader size="5em" overlay/>
            <input type={"button"} value={"To inner page."} onClick={() => navigate(ROUTE_LOGIN)}/>
        </div>
    );
};