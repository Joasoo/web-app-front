import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../App.scss'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { AddPostModel } from '../../model/add-post.model'
import { PostModel } from '../../model/post.model'
import { ProfileDataModel } from '../../model/profile-data.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_POST_ADD, PATH_POST_DELETE, PATH_POST_PERSON, PATH_PROFILE } from '../../util/RequestConstants'
import { ROUTE_PROFILE_EDIT } from '../../util/RouteConstants'
import { formatDateString } from '../../util/StringUtil'
import './PersonalProfilePage.scss'
import { Post } from './Post'

type ProfilePageProps = {
    className?: string
    children?: ReactNode
}

export const PersonalProfilePage = (props: ProfilePageProps) => {
    const { getJson, postJson, deleteJson } = useFetch()
    const [profileData, setProfileData] = useState<ProfileDataModel>()
    const [newPostText, setNewPostText] = useState<string | undefined>()
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const foreignProfileId = new URLSearchParams(window.location.search).get(
        'id'
    ) /*todo distinguishing between personal and friend account not implemented properly. Can't make posts from personal account.*/
    const maxPostSize = 1000

    useEffect(() => {
        if (foreignProfileId) {
            /*todo logic for foreign/friends page*/
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${foreignProfileId}`)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${foreignProfileId}`)
            Promise.all([getProfileData, getPosts]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setLoading(false)
            })
        } else {
            /*todo Logic for personal page*/
            const id = StorageUtil.get<number>('SESSION', 'personId')
            const token = StorageUtil.get<string>('SESSION', 'token')
            console.log(token)
            const getProfileData = getJson<ProfileDataModel>(PATH_PROFILE + `/${id}`, undefined, token)
            const getPosts = getJson<PostModel[]>(PATH_POST_PERSON + `/${id}`, undefined, token)
            Promise.all([getProfileData, getPosts]).then((res) => {
                setProfileData(res[0])
                setPostList(res[1])
                setLoading(false)
            })
        }
    }, [])

    function refreshPosts() {
        if (foreignProfileId) {
            getJson<PostModel[]>(PATH_POST_PERSON + `/${foreignProfileId}`)
                .then((res) => {
                    setPostList(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function deletePost(id: string) {
        deleteJson(PATH_POST_DELETE + `/${foreignProfileId}`)
            .then(() => {
                refreshPosts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function makePost() {
        if (foreignProfileId && newPostText) {
            console.log('Make a post for profile id: ' + foreignProfileId)
            setNewPostText('')
            let newModel = new AddPostModel(foreignProfileId, newPostText)
            postJson(PATH_POST_ADD, newModel)
                .then(() => {
                    refreshPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    if (loading) {
        return <Loader overlay />
    }

    return (
        <div>
            <div className={'profile-box flex-column border border-2 border-secondary rounded'}>
                <div className={'profile-background bg bg-secondary-subtle border rounded'} />
                <div className={'flex-center'}>
                    <div className={'profile-picture rounded-circle bg bg-secondary'} />
                </div>

                <div className={'d-flex justify-content-end'}>
                    <input
                        className={'btn btn-primary align-self-end'}
                        type={'button'}
                        value={'Edit Profile'}
                        onClick={() => navigate(ROUTE_PROFILE_EDIT + '?id=' + foreignProfileId)}
                    />
                </div>

                <div className={'d-flex justify-content-center'}>
                    <h2>
                        {profileData?.firstName} {profileData?.lastName}
                    </h2>
                </div>

                <div className={'container'}>
                    <div className={'row my-5'}>
                        <div className={'col-5'}>
                            <div className={'border border-2 rounded px-4 py-3 text-break'}>
                                <h4>Information</h4>
                                <hr />
                                {profileData?.residence ? <p>Residence: {profileData?.residence}</p> : ''}
                                {profileData?.hometown ? <p>Hometown: {profileData?.hometown}</p> : ''}
                                {profileData?.workplace ? <p>Workplace: {profileData?.workplace}</p> : ''}
                                {profileData?.dateOfBirth ? <p>Birthday: {profileData.dateOfBirth}</p> : ''}
                            </div>
                        </div>

                        <div className={'col'} />
                        {/* For empty space between Information and Bio */}

                        <div className={'col-5'}>
                            <div className={'border border-2 rounded px-4 py-3 text-break'}>
                                <h4>Bio</h4>
                                <hr />
                                {profileData?.bio ?? undefined}
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

                    <TabPanel className={'align-items-start'}>
                        {/*todo move the inside of the tab panels into separate components? (<PostsPanel/>)?*/}
                        <h4>Create a new post</h4>
                        <div className={'d-flex w-100'}>
                            <textarea
                                className={'new-post d-flex w-75 my-3 rounded-2 bg-secondary-subtle align-items-start'}
                                value={newPostText}
                                onChange={(e) =>
                                    e.target.value.length <= maxPostSize ? setNewPostText(e.target.value) : null
                                }
                                placeholder={'Write your post here...'}
                            />
                            <div className={'align-self-center mx-3 text-secondary'}>
                                {newPostText ? newPostText.length : 0}/{maxPostSize}
                            </div>
                        </div>

                        <div className={'d-flex'}>
                            <input
                                className={'w-auto btn btn-primary align-self-start'}
                                type={'button'}
                                value={'Create post'}
                                onClick={makePost}
                            />
                            <input
                                className={'mx-3 btn btn-secondary'}
                                type={'button'}
                                value={'Clear'}
                                onClick={() => setNewPostText('')}
                            />
                        </div>

                        <h4 className={'mt-5'}>Posts</h4>
                        <>
                            {Array.isArray(postList)
                                ? postList?.map((post) => {
                                      return (
                                          <Post
                                              key={post.id}
                                              id={post.id}
                                              content={post.content}
                                              author={post.author}
                                              createdAt={formatDateString(post.createdAt)}
                                              onClickDelete={deletePost}
                                          />
                                      )
                                  })
                                : ''}
                        </>
                    </TabPanel>

                    <TabPanel>(!) Friends not implemented</TabPanel>

                    <TabPanel>(!) Photos not implemented</TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
