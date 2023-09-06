import React, {ReactNode} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom";
import {TestPageLoader} from "../index";
import {useFetch} from "../hooks/useFetch";

type TestProps = {
    className?: string;
    children?: ReactNode;
};
export const Test = (props: TestProps) => {
    const loader = useLoaderData() as TestPageLoader;
    const navigate = useNavigate();
    const {postJson} = useFetch();
    console.log(loader.name);

    return (
        <div>
            {loader.name}
            <input type={"button"} value={"To inner page."} onClick={() => navigate("/lol")}/>
        </div>
    );
};