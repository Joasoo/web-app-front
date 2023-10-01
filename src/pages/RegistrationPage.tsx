import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";

type RegistrationPageProps = {
    className?: string;
    children?: ReactNode;
};
export const RegistrationPage = (props: RegistrationPageProps) => {
    return (
        <div>
            <form className={"d-flexbox w-50 mx-auto mt-5 p-3 border border-2 border-secondary rounded"}>
                <h2 className={"text-center"}>Register</h2>
                <hr className={"mx-4 my-3"} />
                <div className={"container"}>
                    <div className={"row my-4"}>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>First name:</label>
                            <input type={"text"} className={"w-auto rounded text-center"}/>
                        </div>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>Last name:</label>
                            <input type={"text"} className={"w-auto rounded text-center"}/>
                        </div>
                    </div>

                    <div className={"row my-4"}>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>E-mail:</label>
                            <input type={"email"} className={"w-auto rounded text-center"}/>
                        </div>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>Date of birth:</label>
                            <input type={"text"} className={"w-auto rounded text-center"} placeholder={"DD.MM.YY"}/>
                        </div>
                    </div>

                    <div className={"row my-4"}>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>Password:</label>
                            <input type={"password"} className={"w-auto rounded text-center"}/>
                        </div>
                        <div className={"col d-flex justify-content-between"}>
                            <label><small>* </small>Confirm password:</label>
                            <input type={"password"} className={"w-auto rounded text-center"}/>
                        </div>
                    </div>

                    <hr className={"mx-3 my-3"} />

                    <div className={"row my-4"}>
                        <div className={"col d-flex justify-content-between"}>
                            <label>Relationship status:</label>
                            <select className={"w-auto text-center form-select form-select-sm"}>
                                <option selected></option>
                                <option>Single</option>
                                <option>In a relationship</option>
                                <option>Married</option>
                                <option>Complicated</option>
                            </select>
                        </div>
                        <div className={"col d-flex justify-content-between"}>
                            <label>Education: Todo - make multi-value input</label>
                        </div>
                    </div>

                    <div className={"row my-4"}>
                        <div className={"col d-flex justify-content-between"}>
                            <label>Residence:</label>
                            <input type={"text"} className={"w-auto rounded text-center"}/>
                        </div>
                        <div className={"col d-flex justify-content-between"}>
                            <label>Hometown:</label>
                            <input type={"text"} className={"w-auto rounded text-center"}/>
                        </div>
                    </div>

                    <div className={"row my-4"}>
                        <div className={"col-6 d-flex justify-content-between"}>
                            <label>Workplace:</label>
                            <input type={"text"} className={"w-auto rounded text-center"}/>
                        </div>
                    </div>

                    <div className={"d-flex justify-content-center"}>
                        <small>*</small>&nbsp;
                        <input type={"checkbox"}/>&nbsp;
                        <label>I have read and agreed to the&nbsp;
                        <Link to={"/terms-of-service"}>Terms of Service</Link> and&nbsp;
                        <Link to={"/privacy-policy"}>Privacy Policy</Link></label>
                    </div>

                    <input className={"d-block mx-auto py-1 px-3 mt-3 mb-2 btn btn-primary"}
                           type={"button"}
                           value={"Create account"}/>

                </div>
            </form>
    </div>)
}