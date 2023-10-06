import React, {ReactNode, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./EditPage.scss"
import {ROUTE_EDIT} from "../util/RouteConstants";
import {useFetch} from "../hooks/useFetch";

type EditPageProps = {
    className? : string;
    children? : ReactNode
};

export const EditPage = (props: EditPageProps) => {
    const navigate = useNavigate();
    const {getJson, postJson} = useFetch()

    const [firstName, setFirstName] = useState<string | undefined>()
    const [lastName, setLastName] = useState<string | undefined>()
    const [email, setEmail] = useState<string | undefined>()
    const [residence, setResidence] = useState<string | undefined>()
    const [hometown, setHometown] = useState<string | undefined>()
    const [workplace, setWorkplace] = useState<string | undefined>()
    const [relationshipStatus, setRelationshipStatus] = useState<string | undefined>()
    const [dateOfBirth, setDateOfBirth] = useState<string | undefined>()
    const [profileBio, setProfileBio] = useState<string | undefined>()

    const originalFirstName = ''
    const originalLastName = ''
    const originalEmail = ''
    const originalResidence = ''
    const originalHometown = ''
    const originalWorkplace = ''
    const originalRelationshipStatus = ''
    const originalDateOfBirth = ''
    const originalBio = ''
    const profileId = new URLSearchParams(window.location.search).get("id");

    return (
        <div className={"edit-box flex-column mx-auto border border-2 border-secondary rounded-3"}> {/*suur konteiner*/}
            {/*ülemine konteiner fotode ja bio jaoks*/}
            <div className={"container w-75"}>
                <div className={"row my-3"}>
                    <div className={"col d-flex flex-column"}>
                        <div className={"picture-box mx-auto rounded-circle bg bg-secondary-subtle"}/>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit Profile Photo"}/>
                    </div>

                    <div className={"col d-flex flex-column"}>
                        <div className={"bg-picture-box bg bg-secondary-subtle rounded-3"}/>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit Background Photo"}/>
                    </div>

                </div>
                <div className={"row my-3"}>
                    <div className={"col d-flex flex-column"}>
                        <div className={"text-box"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit Profile Bio"} onClick={() => {}}/>
                    </div>
                    <div className={"col d-flex flex-column"}>
                        <div>

                        </div>

                    </div>

                </div>
            </div>

            <div className={"container w-75"}> {/*alumine konteiner infoväljade jaoks*/}
                <div className={"row"}>
                    <div className={"col-2"}></div>
                    <div className={"col-5"}></div>
                    <div className={"col-2"}>
                        <p className={"text-center fw-bold"}>Privacy level</p>
                    </div>
                    <div className={"col-2"}></div>
                    <hr/>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>First Name:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={firstName}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setFirstName(originalFirstName)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Last Name:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={lastName}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setLastName(originalLastName)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Date Of Birth:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={dateOfBirth}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setDateOfBirth(originalDateOfBirth)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>E-Mail:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={email}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setEmail(originalEmail)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Residence:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={residence}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setResidence(originalResidence)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Hometown:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={hometown}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setHometown(originalHometown)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Workplace:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={workplace}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setWorkplace(originalWorkplace)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <p className={"text-start fw-bold"}>Marital Status:</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} className={"w-100 rounded text-center"} placeholder={relationshipStatus}/>
                    </div>
                    <div className={"col-2 w-25"}>
                        <select className={"list-box form-select-sm w-75 text-center rounded border-2 border-secondary"}>
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={"col-2"}>
                        <input className={"reset-btn btn btn-secondary"} value={"Reset"} onClick={() => setRelationshipStatus(originalRelationshipStatus)}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
