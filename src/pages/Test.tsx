import React, {ReactNode} from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTE_INNER} from "../util/RouteConstants";
import {Loader} from "../components/loader/Loader";
import {Icon} from "../components/icon/Icon";
import WarningIcon from "../img/warning-icon.svg";


type TestProps = {
    className?: string;
    children?: ReactNode;
};
export const Test = (props: TestProps) => {
    const navigate = useNavigate();

    return (
        <div>
            Test page.
            <Loader size="md"/>
            <Icon src={WarningIcon}/>
            <input type={"button"} value={"To inner page."} onClick={() => navigate(ROUTE_INNER)}/>
        </div>
    );
};