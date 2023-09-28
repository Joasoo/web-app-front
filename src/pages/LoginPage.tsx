import React, {ReactNode} from 'react';
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    className?: string;
    children?: ReactNode;
};
export const LoginPage = (props: LoginPageProps) => {
    const navigate = useNavigate()

    return (
        <div className={"container"}>
            <div className={"card mt-10 ml-5"}>
                <div className={"card-body"}>
                    midagimidagi
                </div>
            </div>

        </div>
    )
}