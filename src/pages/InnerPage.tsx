import React, {ReactNode} from 'react';
import {useNavigate} from "react-router-dom";

type InnerPageProps = {
    className?: string;
    children?: ReactNode;
};
export const InnerPage = (props: InnerPageProps) => {
    const navigate = useNavigate();
    console.log("render inner page.");
    return <div>
        Change into the inner page.
        <input type={"button"} onClick={() => navigate(-1)} value={"Back to test."}/>
    </div>;
};