import React, {ReactNode, useState} from 'react';
import {ROUTE_REGISTER} from "../util/RouteConstants";
import {Link} from "react-router-dom";
import {Input, SubtextType} from "../components/input/Input";
import {useFetch} from "../hooks/useFetch";
import {LoginModel} from "../model/login.model";
import {LOGIN_PATH} from "../util/RequestConstants";

type LoginPageProps = {
    className?: string;
    children?: ReactNode;
};

type InputOptionKey = "canNotBeEmptyEmail" | "canNotBeEmptyPassword";
const inputOption: { [key in InputOptionKey]: SubtextType } = {
    "canNotBeEmptyEmail": {
        value: "E-mail can not be empty",
        type: "danger"
    },
    "canNotBeEmptyPassword": {
        value: "Password can not be empty",
        type: "danger"
    }
}

export const LoginPage = (props: LoginPageProps) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [emailSubtext, setEmailSubtext] = useState<SubtextType>();
    const [passwordSubtext, setPasswordSubtext] = useState<SubtextType>();
    const {postJson} = useFetch();

    function handleValidation(): boolean {
        let validated = true;
        if (email === undefined || email.length === 0) {
            setEmailSubtext(inputOption["canNotBeEmptyEmail"])
            validated = false;
        }
        if (password === undefined || password.length === 0) {
            setPasswordSubtext(inputOption["canNotBeEmptyPassword"])
            validated = false;
        }

        return validated;
    }

    function handleLogin() {
        if (!handleValidation()) return;
        postJson<LoginModel, void>(LOGIN_PATH, {
            email: email as string,
            password: password as string
        }).then((res) => {
            console.log(res);
            /*todo do navigate to profile if successful.*/
        })
    }

    return (
        <div className={"d-flex flex-column stretch-max align-items-center"}>
            <h1 className={"m-5"}>Webpage name</h1>
            <div className={"d-flexbox px-3 py-4 border border-2 border-secondary rounded"}>
                <h2 className={"text-center"}>Login</h2>
                <hr className={"mx-4 mt-3 mb-4"}/>
                <div className={"d-flex flex-column align-items-center mb-3"}>
                    <Input
                        className={"mb-3"}
                        type={"email"}
                        onChange={(value) => {
                            setEmail(value);
                            if (emailSubtext) setEmailSubtext(undefined);
                        }}
                        value={email}
                        text={"E-mail"}
                        textAlign={"center"}
                        subtext={emailSubtext}
                    />
                    <Input
                        className={"mb-4"}
                        value={password}
                        onChange={(value) => {
                            setPassword(value)
                            if (passwordSubtext) setPasswordSubtext(undefined);
                        }}
                        text={"Password"}
                        textAlign={"center"}
                        type={"password"}
                        subtext={passwordSubtext}
                    />
                    <input
                        className={"px-4 btn btn-primary"}
                        type={"button"}
                        value={"Log in"}
                        onClick={handleLogin}
                    />
                </div>
                <small className={"d-block text-center"}>
                    Don't have an account yet? <Link to={ROUTE_REGISTER}>Create an account</Link>
                </small>
            </div>
        </div>
    )
}