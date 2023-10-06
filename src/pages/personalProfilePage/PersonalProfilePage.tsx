import React, {ReactNode, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./PersonalProfilePage.scss"
import "../../App.scss"
import {useFetch} from "../../hooks/useFetch";
import {REQUEST_PROFILE_DATA, REQUEST_POST} from "../../util/RequestConstants";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {ProfileDataModel} from "../../model/profileData.model";


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
    const [profileBio, setProfileBio] = useState<string | undefined>()
    const [newPostText, setNewPostText] = useState<string | undefined>()
    const profileId = new URLSearchParams(window.location.search).get("id");
    const maxPostSize = 1000;

    const makePost = () => {
        if (profileId && newPostText) {
            console.log("Make a post for profile id: " + profileId)
            setNewPostText("")
            /*            postJson(
                            REQUEST_POST,
                            {
                                profileId: profileId,
                                content: newPostText
                            }
                        )
                            .catch((err) => {
                                console.log(err)
                            })*/
        }
    }

    useEffect(() => {
            if (profileId) {
                const requestParams = {"id": profileId}
                getJson<ProfileDataModel>(REQUEST_PROFILE_DATA, requestParams)
                    .then((res) => {
                        setFirstName(res.firstName);
                        setLastName(res.lastName);
                        setResidence(res.residence);
                        setHometown(res.hometown);
                        setWorkplace(res.workplace);
                        setDateOfBirth(res.dateOfBirth);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                /*                getJson<ProfileBioModel>(REQUEST_PROFILE_BIO, requestParams)
                                    .then((res) => {
                                        setProfileBio(res.bio)
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })*/
            }
        }
    )


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

                {(firstName && lastName) ?
                    <div className={"d-flex justify-content-center"}>
                        <h2>{firstName} {lastName}</h2>
                    </div>
                    : undefined

                }

                <div className={"container"}>
                    <div className={"row my-5"}>
                        <div className={"col-5"}>
                            <div className={"border border-2 rounded px-4 py-3 text-break"}>
                                <h4>Information</h4>
                                <hr/>
                                {
                                    residence ? <p>Residence: {residence}</p> : undefined
                                }
                                {
                                    hometown ? <p>Hometown: {hometown}</p> : undefined
                                }
                                {
                                    workplace ? <p>Workplace: {workplace}</p> : undefined
                                }
                                {
                                    relationshipStatus ? <p>Relationship status: {relationshipStatus}</p> : undefined
                                }
                                {
                                    dateOfBirth ? <p>Birthday: {dateOfBirth}</p> : undefined
                                }
                            </div>
                        </div>

                        <div className={"col"}/>
                        {/* For empty space between Information and Bio */}

                        <div className={"col-5"}>
                            <div className={"border border-2 rounded px-4 py-3 text-break"}>
                                <h4>Bio</h4>
                                <hr/>
                                {
                                    profileBio ?? undefined
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>Posts</Tab>
                        <Tab>Friends</Tab>
                        <Tab>Photos</Tab>
                    </TabList>

                    <TabPanel className={"align-items-start"}>
                        <h4>Create a new post</h4>
                        <div className={"d-flex w-100"}>
                            <textarea
                                className={"new-post d-flex w-75 my-3 rounded-2 bg-secondary-subtle align-items-start"}
                                value={newPostText}
                                onChange={e => e.target.value.length <= maxPostSize ?
                                    setNewPostText(e.target.value) : null}
                                placeholder={"Write your post here..."}
                            />
                            <text className={"align-self-center mx-3 text-secondary"}>
                                {newPostText?.length}/{maxPostSize}
                            </text>
                        </div>

                        <div className={"d-flex"}>
                            <input
                                className={"w-auto btn btn-primary align-self-start"}
                                type={"button"}
                                value={"Create post"}
                                onClick={makePost}
                            />
                            <input
                                className={"mx-3 btn btn-secondary"}
                                type={"button"}
                                value={"Clear"}
                                onClick={() => setNewPostText("")}
                            />
                        </div>

                        <h4 className={"mt-5"}>Posts</h4>
                    </TabPanel>

                    <TabPanel>
                        (!) Friends not implemented
                    </TabPanel>

                    <TabPanel>
                        (!) Photos not implemented
                    </TabPanel>
                </Tabs>

            </div>
        </div>
    )
}
