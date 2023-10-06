import React, {ReactNode, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./PersonalProfilePage.scss"
import "../App.scss"
import {useFetch} from "../hooks/useFetch";
import {REQUEST_PROFILE} from "../util/RequestConstants";
import {Input} from "../components/input/Input";


type ProfilePageProps = {
    className?: string;
    children?: ReactNode;
};
export const PersonalProfilePage = (props: ProfilePageProps) => {
    const navigate = useNavigate();
    const {getJson, postJson} = useFetch()
    const [firstName, setFirstName] = useState<string | undefined>()
    const [lastName, setLastName] = useState<string | undefined>()
    const [residence, setResidence] = useState<string | undefined>()
    const [hometown, setHometown] = useState<string | undefined>()
    const [workplace, setWorkplace] = useState<string | undefined>()
    const [relationshipStatus, setRelationshipStatus] = useState<string | undefined>()
    const [dateOfBirth, setDateOfBirth] = useState<string | undefined>()

    const [postText, setPostText] = useState<string | undefined>()

    /*    useEffect(() => {
                const profileId = new URLSearchParams(window.location.search).get("id");
                if (profileId) {
                    const requestParams = {"id": profileId}
                    getJson<ProfileDataModel>(REQUEST_PROFILE, requestParams)
                        .then((res) => {
                            setFirstName(res.firstName);
                            setLastName(res.lastName);
                            setResidence(res.residence);
                            setHometown(res.hometown);
                            setWorkplace(res.workplace);
                            setRelationshipStatus(res.relationshipStatus);
                            setDateOfBirth(res.dateOfBirth);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        )*/


    return (
        <div>
            <div className={"profile-box flex-column border border-2 border-secondary rounded"}>
                <div className={"profile-background bg bg-secondary-subtle border rounded"}/>
                <div className={"flex-center"}>
                    <div className={"profile-picture rounded-circle bg bg-secondary"}/>
                </div>

                <div className={"d-flex justify-content-end"}>
                    <input className={"btn btn-primary align-self-end"}
                           type={"button"}
                           value={"Edit Profile"}/>
                </div>

                {
                    <div className={"d-flex justify-content-center"}>
                        <h2>Markus</h2>
                    </div>

                }

                <div className={"container text-center"}>
                    <div className={"row my-5"}>
                        <div className={"col-5"}>
                            <div className={"border border-2 rounded"}>
                                Information
                                <hr/>
                                Yes
                            </div>
                        </div>
                        <div className={"col"}/>
                        <div className={"col-5"}>
                            <div className={"border border-2 rounded"}>
                                Bio
                                <hr/>
                                Yes
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex-center my-3"}>
                    <Input
                        value={postText}
                        onChange={setPostText}
                        text={"Write your post here"}
                    />
                </div>


            </div>
        </div>
    )
}
