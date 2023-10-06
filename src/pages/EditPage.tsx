import React, {ReactNode} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_EDIT} from "../util/RouteConstants";

type EditPageProps = {
    className? : string;
    children? : ReactNode
}