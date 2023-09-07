import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";
import {TEST_PATH} from "../util/RequestConstants";
import {ROUTE_ROOT} from "../util/RouteConstants";

type InnerPageProps = {
    className?: string;
    children?: ReactNode;
};
export const InnerPage = (props: InnerPageProps) => {
    const navigate = useNavigate();
    const [data, setData] = useState<any>({status: "Loading.."});

    const {getJson} = useFetch();
    console.log("render inner page.");

    useEffect(() => {
        getJson<any>(TEST_PATH)
            .then(res => {
                setData(res);
                console.log(JSON.stringify(res));
            })
            .catch(err => {
                console.log(err);
            });
    }, [getJson]);

    return <div>
        {JSON.stringify(data)}
        <input type={"button"} onClick={() => navigate(ROUTE_ROOT)} value={"Back to test."}/>
    </div>;
};