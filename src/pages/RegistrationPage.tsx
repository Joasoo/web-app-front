import React, {ReactNode, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_LOGIN} from "../util/RouteConstants";
import {FormRow} from "../components/FormRow";
import {Input} from "../components/input/Input";
import {RegistrationModel} from "../model/registration.model";
import {toDateString, toISOString} from "../util/StringUtil";
import {useFetch} from "../hooks/useFetch";
import {REGISTER_PATH} from "../util/RequestConstants";

type RegistrationPageProps = {
    className?: string;
    children?: ReactNode;
};
export const RegistrationPage = (props: RegistrationPageProps) => {
    const navigate = useNavigate();
    const {postJson} = useFetch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [relationship, setRelationship] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [residence, setResidence] = useState("");
    const [hometown, setHometown] = useState("");


    function handleValidation(): boolean {
        let valid = true;

        return valid;
    }

    function handleRegistration() {
        console.log(toDateString(dateOfBirth));

        if (handleValidation()) {
            /*todo Perform request.*/
            postJson<RegistrationModel, void>(REGISTER_PATH, getModel())
                .then(res => {return;})

            console.log(getModel());
        }
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
            hometown
        };
    }


    const formClasses = "col justify-content-between";
    const required = <b className={"text-danger me-1"}>*</b>;
    return (
        <div>
            <div className={"flex-center flex-column w-50 mx-auto mt-5 p-3 border border-2 border-secondary rounded"}>
                <h2 className={"text-center"}>Register</h2>
                <hr className={"mx-4 my-3"}/>
                <div className={"container"}>
                    <div className={"row my-4"}>
                        <FormRow className={formClasses}>
                            <span>First name: {required}</span>
                            <Input value={firstName} onChange={setFirstName}/>
                        </FormRow>
                        <FormRow className={formClasses}>
                            <span>Last name: {required}</span>
                            <Input value={lastName} onChange={setLastName}/>
                        </FormRow>
                    </div>

                    <div className={"row my-4"}>
                        <FormRow className={formClasses}>
                            <span>E-mail: {required}</span>
                            <Input type={"email"} value={email} onChange={setEmail}/>
                        </FormRow>
                        <FormRow className={formClasses}>
                            <span>Date of birth: {required}</span>
                            <Input value={dateOfBirth} onChange={setDateOfBirth}/>
                        </FormRow>
                    </div>

                    <div className={"row my-4"}>
                        <FormRow className={formClasses}>
                            <span>Password: {required}</span>
                            <Input type={"password"} value={password} onChange={setPassword}/>
                        </FormRow>
                        <FormRow className={formClasses}>
                            <span>Confirm password: {required}</span>
                            <Input type={"password"} value={repeatPassword} onChange={setRepeatPassword}/>
                        </FormRow>
                    </div>

                    <hr className={"mx-3 my-3"}/>

                    <div className={"row my-4"}>
                        <FormRow className={formClasses}>
                            <label>Relationship status:</label>
                            <select
                                className={"w-auto text-center form-select form-select-sm"}> {/*todo: change to custom comp.*/}
                                <option selected></option>
                                <option>Single</option>
                                <option>In a relationship</option>
                                <option>Married</option>
                                <option>Complicated</option>
                            </select>
                        </FormRow>
                        <FormRow className={formClasses}>
                            <span>Workplace:</span>
                            <Input value={workplace} onChange={setWorkplace}/>
                        </FormRow>
                    </div>

                    <div className={"row my-4"}>
                        <FormRow className={formClasses}>
                            <span>Residence:</span>
                            <Input value={residence} onChange={setResidence}/>
                        </FormRow>
                        <FormRow className={formClasses}>
                            <span>Hometown:</span>
                            <Input value={hometown} onChange={(v) => setHometown(v)}/>
                        </FormRow>
                    </div>

                    <div className={"d-flex justify-content-center"}>
                        {required}
                        <input type={"checkbox"}/>&nbsp;
                        <label>
                            I have read and agreed to the&nbsp;
                            <Link to={"/terms-of-service"}>Terms of Service</Link> and&nbsp;
                            <Link to={"/privacy-policy"}>Privacy Policy</Link>.
                        </label>
                    </div>

                    <input
                        className={"py-1 px-3 mt-3 mb-2 me-4 btn btn-primary"}
                        type={"button"}
                        value={"Back"}
                        onClick={() => navigate(ROUTE_LOGIN)}
                    />
                    <input
                        className={"py-1 px-3 mt-3 mb-2 btn btn-primary"}
                        type={"button"}
                        value={"Create account"}
                        onClick={handleRegistration}
                    />

                </div>
            </div>
        </div>)
}