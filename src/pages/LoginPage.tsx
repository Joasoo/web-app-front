import { ReactNode, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/card/Card'
import { Input, SubtextType } from '../components/input/Input'
import { Loader } from '../components/loader/Loader'
import { useFetch } from '../hooks/useFetch'
import { ErrorModel } from '../model/error.model'
import { LoginModel } from '../model/login.model'
import { TokenModel } from '../model/token.model'
import { StorageUtil } from '../util/BrowerStorageUtil'
import { PATH_AUTH_LOGIN } from '../util/RequestConstants'
import { ROUTE_PROFILE, ROUTE_REGISTER } from '../util/RouteConstants'

type LoginPageProps = {
    className?: string
    children?: ReactNode
}

type InputOptionKey = 'canNotBeEmptyEmail' | 'canNotBeEmptyPassword'
const inputOption: { [key in InputOptionKey]: SubtextType } = {
    canNotBeEmptyEmail: {
        value: 'E-mail can not be empty',
        type: 'danger',
    },
    canNotBeEmptyPassword: {
        value: 'Password can not be empty',
        type: 'danger',
    },
}

export const LoginPage = (props: LoginPageProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<ErrorModel>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [emailSubtext, setEmailSubtext] = useState<SubtextType>()
    const [passwordSubtext, setPasswordSubtext] = useState<SubtextType>()
    const { postJson } = useFetch()

    function handleValidation(): boolean {
        let validated = true
        if (email === undefined || email.length === 0) {
            setEmailSubtext(inputOption['canNotBeEmptyEmail'])
            validated = false
        }
        if (password === undefined || password.length === 0) {
            setPasswordSubtext(inputOption['canNotBeEmptyPassword'])
            validated = false
        }

        return validated
    }

    function handleLogin() {
        setLoading(true)
        setErr(undefined)
        if (handleValidation()) {
            postJson<LoginModel, TokenModel>(PATH_AUTH_LOGIN, {
                email: email as string,
                password: password as string,
            })
                .then((res) => {
                    console.log(res)
                    StorageUtil.put('SESSION', 'token', res.token)
                    StorageUtil.put('SESSION', 'personId', res.id)
                    navigate(ROUTE_PROFILE)
                })
                .catch((err) => {
                    setErr(err)
                })
        }
        setLoading(false)
    }

    if (loading) return <Loader overlay />
    return (
        <Card>
            <h1 className={'m-5'}>Webpage name</h1>
            <div className={'d-flexbox px-3 py-4'}>
                <h2 className={'text-center'}>Login</h2>
                <hr className={'mx-4 mt-3 mb-1'} />
                <div className={'d-flex flex-column align-items-center mb-3'}>
                    <span className={'fw-semibold text-danger mx-auto mb-2'}>{err?.cause}</span>
                    <Input
                        className={'mb-3'}
                        type={'email'}
                        onChange={(value) => {
                            setEmail(value)
                            if (emailSubtext) setEmailSubtext(undefined)
                        }}
                        value={email}
                        text={'E-mail'}
                        textAlign={'center'}
                        subtext={emailSubtext}
                    />
                    <Input
                        className={'mb-4'}
                        value={password}
                        onChange={(value) => {
                            setPassword(value)
                            if (passwordSubtext) setPasswordSubtext(undefined)
                        }}
                        text={'Password'}
                        textAlign={'center'}
                        type={'password'}
                        subtext={passwordSubtext}
                    />
                    <input className={'px-4 btn btn-primary'} type={'button'} value={'Log in'} onClick={handleLogin} />
                </div>
                <small className={'d-block text-center'}>
                    Don't have an account yet? <Link to={ROUTE_REGISTER}>Create an account</Link>
                </small>
            </div>
        </Card>
    )
}
