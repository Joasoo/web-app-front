import React, {ReactNode} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_REGISTER} from "../util/RouteConstants";

type LoginPageProps = {
    className?: string;
    children?: ReactNode;
};
export const LoginPage = (props: LoginPageProps) => {
    const navigate = useNavigate()

    return (
        <div>
            <h1 className={"text-center my-5 pb-3"}>Webpage name</h1>
            <form className={"d-flexbox w-25 mx-auto p-3 border border-2 border-secondary rounded"}>
                <input className={"d-block w-75 mx-auto my-3 rounded text-center"}
                       type={"email"}
                       placeholder={"Enter your email"}/>
                <input className={"d-block w-75 mx-auto my-3 rounded text-center"}
                       type={"password"}
                       placeholder={"Enter your password"}/>
                <input className={"d-block mx-auto py-1 px-3 mb-3 btn btn-primary"}
                       type={"button"}
                       value={"Log in"}/>
                <small className={"d-block text-center"}>
                    Don't have an account yet? <Link to={ROUTE_REGISTER}>Create an account</Link>
                </small>
            </form>
        </div>
    )
}