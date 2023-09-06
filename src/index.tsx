import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Test} from "./pages/Test";
import {InnerPage} from "./pages/InnerPage";

export type TestPageLoader = {
    name: string
}

const router = createBrowserRouter([
    {
        element: <Test/>,
        path: "/",
        loader: (): TestPageLoader => {
            return {name: "Test "};
        }
    },
    {
        element: <InnerPage/>,
        path: "/lol"
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
