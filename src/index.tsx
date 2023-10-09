import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import { LoginPage } from './pages/LoginPage'
import reportWebVitals from './reportWebVitals'
import {
    ROUTE_LOGIN,
    ROUTE_PROFILE,
    ROUTE_PROFILE_EDIT,
    ROUTE_REGISTER,
} from './util/RouteConstants'

import 'bootstrap/dist/css/bootstrap.css'
import { EditPage } from './pages/edit-profile-page/EditPage'
import { PersonalProfilePage } from './pages/personal-profile-page/PersonalProfilePage'
import { RegistrationPage } from './pages/RegistrationPage'

const router = createBrowserRouter([
    {
        element: <LoginPage />,
        path: ROUTE_LOGIN,
    },
    {
        element: <RegistrationPage />,
        path: ROUTE_REGISTER,
    },
    {
        element: <PersonalProfilePage />,
        path: ROUTE_PROFILE,
    },
    {
        element: <EditPage />,
        path: ROUTE_PROFILE_EDIT,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
