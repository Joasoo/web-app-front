import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox } from '../components/checkbox/Checkbox'
import { DropdownSelect } from '../components/dropdown/DropdownSelect'
import { FormRow } from '../components/FormRow'
import { Input, SubtextType } from '../components/input/Input'
import { Loader } from '../components/loader/Loader'
import { useFetch } from '../hooks/useFetch'
import { RegistrationModel } from '../model/registration.model'
import { StatusCodeModel } from '../model/status-code.model'
import {
    PATH_AUTH_REGISTER,
    PATH_PROFILE_RELATIONSHIP_STATUS,
} from '../util/RequestConstants'
import {
    ROUTE_LOGIN,
    ROUTE_PRIVACY_POLICY,
    ROUTE_TOS,
} from '../util/RouteConstants'
import { toISOString } from '../util/StringUtil'

type RegistrationPageProps = {
    className?: string
    children?: ReactNode
}

const errorSubtext: { [key: string]: SubtextType } = {
    noEmpty: {
        value: 'This field cannot be empty',
        type: 'danger',
    },
    mustMatch: {
        value: 'Passwords must match',
        type: 'danger',
    },
}

export const RegistrationPage = (props: RegistrationPageProps) => {
    const navigate = useNavigate()
    const { postJson, getJson } = useFetch()
    const [loading, setLoading] = useState<boolean>(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [relOptions, setRelOptions] = useState<StatusCodeModel[]>()
    const [relationship, setRelationship] = useState<StatusCodeModel>()
    const [workplace, setWorkplace] = useState('')
    const [residence, setResidence] = useState('')
    const [hometown, setHometown] = useState('')
    const [termsCheck, setTermsCheck] = useState<boolean>(false)

    const [firstNameSub, setFirstNameSub] = useState<SubtextType>()
    const [lastNameSub, setLastNameSub] = useState<SubtextType>()
    const [emailSub, setEmailSub] = useState<SubtextType>()
    const [dobSub, setDobSub] = useState<SubtextType>()
    const [pwdSub, setPwdSub] = useState<SubtextType>()
    const [confPwdSub, setConfPwdSub] = useState<SubtextType>()
    const [showTermsErr, setShowTermsErr] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getJson<StatusCodeModel[]>(PATH_PROFILE_RELATIONSHIP_STATUS)
            .then((res) => {
                setRelOptions(res)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    function handleValidation(): boolean {
        let valid = true
        if (!firstName) {
            setFirstNameSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (!lastName) {
            setLastNameSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (!password) {
            setPwdSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (!repeatPassword) {
            setConfPwdSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (password && repeatPassword && password !== repeatPassword) {
            setPwdSub(errorSubtext['mustMatch'])
            setConfPwdSub(errorSubtext['mustMatch'])
            valid = false
        }
        if (!email) {
            setEmailSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (!dateOfBirth) {
            setDobSub(errorSubtext['noEmpty'])
            valid = false
        }
        if (!termsCheck) {
            setShowTermsErr(!showTermsErr)
            valid = false
        }

        return valid
    }

    function handleRegistration() {
        setLoading(true)
        console.log(toISOString(dateOfBirth))
        if (handleValidation()) {
            /*todo Perform request.*/
            postJson<RegistrationModel, void>(PATH_AUTH_REGISTER, getModel())
                .then((res) => {
                    navigate(ROUTE_LOGIN)
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log(getModel())
        }
        setLoading(false)
    }

    function getModel(): RegistrationModel {
        return {
            firstName,
            lastName,
            email,
            dateOfBirth: toISOString(dateOfBirth),
            password,
            relationshipStatus: relationship,
            workplace,
            residence,
            hometown,
        }
    }

    const formClasses = 'col justify-content-between'
    const required = <b className={'text-danger me-1'}>*</b>
    return (
        <div>
            <div
                className={
                    'flex-center flex-column w-50 mx-auto mt-5 p-3 border border-2 border-secondary rounded'
                }
            >
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h2 className={'text-center'}>Register</h2>
                        <hr className={'mx-4 my-3'} />
                        <div className={'container'}>
                            <div className={'row my-4'}>
                                <FormRow className={formClasses}>
                                    <span>First name: {required}</span>
                                    <Input
                                        value={firstName}
                                        onChange={(v) => {
                                            if (firstNameSub)
                                                setFirstNameSub(undefined)
                                            setFirstName(v)
                                        }}
                                        subtext={firstNameSub}
                                    />
                                </FormRow>
                                <FormRow className={formClasses}>
                                    <span>Last name: {required}</span>
                                    <Input
                                        value={lastName}
                                        onChange={(v) => {
                                            if (lastNameSub)
                                                setLastNameSub(undefined)
                                            setLastName(v)
                                        }}
                                        subtext={lastNameSub}
                                    />
                                </FormRow>
                            </div>

                            <div className={'row my-4'}>
                                <FormRow className={formClasses}>
                                    <span>E-mail: {required}</span>
                                    <Input
                                        type={'email'}
                                        value={email}
                                        onChange={(v) => {
                                            if (emailSub) setEmailSub(undefined)
                                            setEmail(v)
                                        }}
                                        subtext={emailSub}
                                    />
                                </FormRow>
                                <FormRow className={formClasses}>
                                    <span>Date of birth: {required}</span>
                                    <Input
                                        type={'date'}
                                        value={dateOfBirth}
                                        onChange={(v) => {
                                            if (dobSub) setDobSub(undefined)
                                            setDateOfBirth(v)
                                        }}
                                        subtext={dobSub}
                                    />
                                </FormRow>
                            </div>

                            <div className={'row my-4'}>
                                <FormRow className={formClasses}>
                                    <span>Password: {required}</span>
                                    <Input
                                        type={'password'}
                                        value={password}
                                        onChange={(v) => {
                                            if (pwdSub) setPwdSub(undefined)
                                            setPassword(v)
                                        }}
                                        subtext={pwdSub}
                                    />
                                </FormRow>
                                <FormRow className={formClasses}>
                                    <span>Confirm password: {required}</span>
                                    <Input
                                        type={'password'}
                                        value={repeatPassword}
                                        onChange={(v) => {
                                            if (confPwdSub)
                                                setConfPwdSub(undefined)
                                            setRepeatPassword(v)
                                        }}
                                        subtext={confPwdSub}
                                    />
                                </FormRow>
                            </div>

                            <hr className={'mx-3 my-3'} />

                            <div className={'row my-4'}>
                                <FormRow className={formClasses}>
                                    <label>Relationship status:</label>
                                    <DropdownSelect
                                        withEmptyOption
                                        options={relOptions ?? []}
                                        value={relationship}
                                        setValue={(value) => {
                                            setRelationship(value)
                                            console.log(value)
                                        }}
                                        formatLabel={(value) => value.value}
                                    />
                                </FormRow>
                                <FormRow className={formClasses}>
                                    <span>Workplace:</span>
                                    <Input
                                        value={workplace}
                                        onChange={setWorkplace}
                                    />
                                </FormRow>
                            </div>

                            <div className={'row my-4'}>
                                <FormRow className={formClasses}>
                                    <span>Residence:</span>
                                    <Input
                                        value={residence}
                                        onChange={setResidence}
                                    />
                                </FormRow>
                                <FormRow className={formClasses}>
                                    <span>Hometown:</span>
                                    <Input
                                        value={hometown}
                                        onChange={(v) => setHometown(v)}
                                    />
                                </FormRow>
                            </div>

                            <div className={'flex-center align-items-center'}>
                                {required}
                                <Checkbox
                                    value={termsCheck}
                                    onClick={() => {
                                        if (showTermsErr)
                                            setShowTermsErr(!showTermsErr)
                                        setTermsCheck(!termsCheck)
                                    }}
                                />
                                &nbsp;
                                <label>
                                    I have read and agreed to the&nbsp;
                                    <Link to={ROUTE_TOS}>
                                        Terms of Service
                                    </Link>{' '}
                                    and&nbsp;
                                    <Link to={ROUTE_PRIVACY_POLICY}>
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                            </div>

                            {showTermsErr && (
                                <div
                                    className={
                                        'text-center text-danger fw-semibold'
                                    }
                                >
                                    You must agree to our Terms of Service and
                                    Privacy Policy.
                                </div>
                            )}

                            <div>
                                <input
                                    className={
                                        'py-1 px-3 mt-3 mb-2 me-4 btn btn-primary'
                                    }
                                    type={'button'}
                                    value={'Back'}
                                    onClick={() => navigate(ROUTE_LOGIN)}
                                />
                                <input
                                    className={
                                        'py-1 px-3 mt-3 mb-2 btn btn-primary'
                                    }
                                    type={'button'}
                                    value={'Create account'}
                                    onClick={handleRegistration}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
