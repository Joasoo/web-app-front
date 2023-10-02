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
        <div className={"d-flex flex-column stretch-max align-items-center"}>
            <h1 className={"m-5"}>Webpage name</h1>
            <form className={"d-flexbox w-25 p-3 border border-2 border-secondary rounded"}>
                <h2 className={"text-center"}>Login</h2>
                <hr className={"mx-4 mt-3 mb-4"}/>
                <div className={"d-flex flex-column align-items-center mb-3"}>
                    <Input
                        className={"mb-3"}
                        type={"email"}
                        onChange={setEmail}
                        value={email}
                        text={"E-mail"}
                        textAlign={"center"}
                        subtext={email === "test@gmail.com"
                            ? {
                                value: "This e-mail is already in use.",
                                type: "danger"
                            } : undefined}
                    />
                    <Input
                        className={"mb-4"}
                        value={password}
                        onChange={setPassword}
                        text={"Password"}
                        textAlign={"center"}
                        type={"password"}
                    />
                    <input className={"w-50 btn btn-primary"}
                           type={"button"}
                           value={"Log in"}/>
                </div>
                <small className={"d-block text-center"}>
                    Don't have an account yet? <Link to={ROUTE_REGISTER}>Create an account</Link>
                </small>
            </form>
        </div>
    )
}