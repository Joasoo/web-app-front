import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage"
import {ROUTE_PROFILE_EDIT, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER} from "./util/RouteConstants";

import {RegistrationPage} from "./pages/RegistrationPage";
import 'bootstrap/dist/css/bootstrap.css';
import {PersonalProfilePage} from "./pages/personal-profile-page/PersonalProfilePage";
import {EditPage} from "./pages/edit-profile-page/EditPage";

const router = createBrowserRouter([
    {
        element: <LoginPage/>,
        path: ROUTE_LOGIN
    },
    {
        element: <RegistrationPage/>,
        path: ROUTE_REGISTER
    },
    {
        element: <PersonalProfilePage/>,
        path: ROUTE_PROFILE
    },
    {
        element: <EditPage/>,
        path: ROUTE_PROFILE_EDIT
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
