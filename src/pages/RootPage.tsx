import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/loader/Loader'
import { ROUTE_LOGIN } from '../util/RouteConstants'

export const RootPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(ROUTE_LOGIN)
    }, [])

    return <Loader overlay />
}
