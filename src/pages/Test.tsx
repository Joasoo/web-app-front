import React, {ReactNode} from 'react';
import {useLoaderData} from "react-router-dom";

type TestProps = {
    className?: string;
    children?: ReactNode;
};
export const Test = (props: TestProps) => {
    const loader = useLoaderData() as {name: string};
    return <div>{loader.name ? `Hello, ${loader.name}!` : "Howdy!"}</div>;
};