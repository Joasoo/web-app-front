import React, {ReactNode, useEffect, useState} from 'react';
import "./PersonalProfilePage.scss"
import "../../App.scss"
import {useFetch} from "../../hooks/useFetch";
import {PROFILE_DATA, PERSON_POST_LIST, ADD_POST} from "../../util/RequestConstants";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {ProfileDataModel} from "../../model/profile-data.model";
import {Post} from "./Post";
import {PostModel} from "../../model/post.model";
import {Loader} from "../../components/loader/Loader";
import {AddPostModel} from "../../model/add-post.model";
import {formatDateString} from "../../util/StringUtil";


type ProfilePageProps = {
    className?: string;
    children?: ReactNode;
};
export const PersonalProfilePage = (props: ProfilePageProps) => {
    const {getJson, postJson} = useFetch()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [newPostText, setNewPostText] = useState<string | undefined>()
    const [postList, setPostList] = useState<PostModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const profileId = new URLSearchParams(window.location.search).get("id");
    const maxPostSize = 1000;

    useEffect(() => {
            if (profileId) {
                const requestParams = {"id": profileId}
                const getProfileData = getJson<ProfileDataModel>(PROFILE_DATA, requestParams);
                const getPosts = getJson<PostModel[]>(PERSON_POST_LIST, requestParams);
                Promise.all([getProfileData, getPosts])
                    .then(res => {
                        setProfileData(res[0]);
                        setPostList(res[1]);
                        setLoading(false);
                    })
            }
        }
    , [])

    function refreshPosts() {
        if (profileId) {
            const requestParams = {"id": profileId}
            getJson<PostModel[]>(PERSON_POST_LIST, requestParams)
                .then((res) => {
                    setPostList(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function makePost() {
        if (profileId && newPostText) {
            console.log("Make a post for profile id: " + profileId)
            setNewPostText("")
            let newModel = new AddPostModel(profileId, newPostText)
            postJson(
                ADD_POST, newModel
            ).then(() => {
                refreshPosts()
            })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    if (loading) {
        return <Loader overlay/>
    }

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

                <div className={"d-flex justify-content-center"}>
                    <h2>{profileData?.firstName} {profileData?.lastName}</h2>
                </div>


                <div className={"container"}>
                    <div className={"row my-5"}>
                        <div className={"col-5"}>
                            <div className={"border border-2 rounded px-4 py-3 text-break"}>
                                <h4>Information</h4>
                                <hr/>
                                {
                                    profileData?.residence ? <p>Residence: {profileData?.residence}</p> : ""
                                }
                                {
                                    profileData?.hometown ? <p>Hometown: {profileData?.hometown}</p> : ""
                                }
                                {
                                    profileData?.workplace ? <p>Workplace: {profileData?.workplace}</p> : ""
                                }
                                {
                                    profileData?.dateOfBirth ? <p>Birthday: {profileData.dateOfBirth}</p> : ""
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
                                    profileData?.bio ?? undefined
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
                                {newPostText ? newPostText.length : 0}/{maxPostSize}
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
                        <>
                            {Array.isArray(postList) ? postList?.map((post) => {
                                    return <Post
                                        key={post.id}
                                        id={post.id}
                                        content={post.content}
                                        author={post.author}
                                        createdAt={formatDateString(post.createdAt)}
                                        isOwner={true}
                                    />;
                                }
                            ) : ""}
                        </>
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
