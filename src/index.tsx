import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import { LoginPage } from './pages/LoginPage'
import reportWebVitals from './reportWebVitals'
import { ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_PROFILE_EDIT, ROUTE_REGISTER, ROUTE_ROOT } from './util/RouteConstants'

import 'bootstrap/dist/css/bootstrap.css'
import { EditPage } from './pages/edit-profile-page/EditPage'
import { PersonalProfilePage } from './pages/personal-profile-page/PersonalProfilePage'
import { RegistrationPage } from './pages/RegistrationPage'
import { RootPage } from './pages/RootPage'
import Layout from "./components/layout/Layout";

export type ProfilePageLoader = {
    profileId: number
}

const router = createBrowserRouter([
    {
        element: <RootPage />,
        path: ROUTE_ROOT,
    },
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
        path: ROUTE_PROFILE + '/:profileId',
        loader: ({ params }): ProfilePageLoader => {
            const num = Number(params.profileId)
            if (isNaN(num)) throw new Error()
            return { profileId: num }
        },
        errorElement: <LoginPage /> /*todo make 404 page/ error boundary*/,
    },
    {
        element: <EditPage />,
        path: ROUTE_PROFILE_EDIT,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Layout>
        <RouterProvider router={router} />
    </Layout>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
