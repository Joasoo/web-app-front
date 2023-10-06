import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Test} from "./pages/Test";
import {InnerPage} from "./pages/InnerPage";
import {LoginPage} from "./pages/LoginPage"
import {ROUTE_EDIT, ROUTE_INNER, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_ROOT} from "./util/RouteConstants";

import {RegistrationPage} from "./pages/RegistrationPage";
import 'bootstrap/dist/css/bootstrap.css';
import {EditPage} from "./pages/EditPage";

export type TestPageLoader = {
    name: string
}

const router = createBrowserRouter([
    {
        element: <Test/>,
        path: ROUTE_ROOT,
    },
    {
        element: <InnerPage/>,
        path: ROUTE_INNER
    },
    {
        element: <LoginPage/>,
        path: ROUTE_LOGIN
    },
    {
        element: <RegistrationPage/>,
        path: ROUTE_REGISTER
    },
    {
        element: <EditPage/>,
        path: ROUTE_EDIT
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <RouterProvider router={router}/>
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
