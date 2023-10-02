import React, {ReactNode, useEffect, useState} from 'react';
import {ROUTE_REGISTER} from "../util/RouteConstants";
import {Link} from "react-router-dom";
import {Input} from "../components/input/Input";

type LoginPageProps = {
    className?: string;
    children?: ReactNode;
};
export const LoginPage = (props: LoginPageProps) => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    useEffect(() => {
        console.log(email);
    }, [email]);

    return (
        <div>
            <h1 className={"text-center my-5 pb-3"}>Webpage name</h1>
            <form className={"d-flexbox w-25 mx-auto p-3 border border-2 border-secondary rounded"}>
                <h2 className={"text-center"}>Login</h2>
                <hr className={"mx-4 mt-3 mb-4"}/>
                <Input className={"text-center"}
                       placeholder={"Enter your email"}
                       type={"email"}
                       onChange={setEmail}
                       value={email}
                       subtext={email === "test@gmail.com" ? {
                           value: "This e-mail is already in use.",
                           type: "info"
                       } : undefined}
                />
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