import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import { LoginPage } from './pages/LoginPage'
import reportWebVitals from './reportWebVitals'
import {
    ROUTE_FEED,
    ROUTE_LOGIN,
    ROUTE_PROFILE,
    ROUTE_PROFILE_EDIT,
    ROUTE_REGISTER,
    ROUTE_ROOT,
} from './util/RouteConstants'

import 'bootstrap/dist/css/bootstrap.css'
import { ErrorOverlay } from './components/error/ErrorOverlay'
import Layout from './components/layout/Layout'
import { EditProfilePage } from './pages/edit-profile-page/EditProfilePage'
import { FeedPage } from './pages/feed-page/FeedPage'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import { RegistrationPage } from './pages/registration-page/RegistrationPage'
import { RootPage } from './pages/RootPage'
import { isActualNumber } from './util/StringUtil'

export type ProfilePageLoader = {
    profileId: number
}

const router = createBrowserRouter([
    {
        element: (
            <Layout>
                <RootPage />
            </Layout>
        ),
        path: ROUTE_ROOT,
    },
    {
        element: (
            <Layout>
                <LoginPage />
            </Layout>
        ),
        path: ROUTE_LOGIN,
    },
    {
        element: (
            <Layout withFooter>
                <RegistrationPage />
            </Layout>
        ),
        path: ROUTE_REGISTER,
    },
    {
        element: (
            <Layout withFooter withHeader>
                <ProfilePage />
            </Layout>
        ),
        path: ROUTE_PROFILE + '/:profileId',
        loader: ({ params }): ProfilePageLoader => {
            if (params.profileId && isActualNumber(params.profileId)) {
                return { profileId: Number.parseInt(params.profileId) }
            } else {
                throw new Error()
            }
        },
    },
    {
        element: (
            <Layout withFooter>
                <EditProfilePage />
            </Layout>
        ),
        path: ROUTE_PROFILE_EDIT,
    },
    {
        element: <FeedPage />,
        path: ROUTE_FEED,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ErrorOverlay>
        <RouterProvider router={router} />
    </ErrorOverlay>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
