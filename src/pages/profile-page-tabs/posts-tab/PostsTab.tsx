import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Loader } from '../../../components/loader/Loader'
import { useErrorHandler } from '../../../hooks/useErrorHandler'
import { useFetch } from '../../../hooks/useFetch'
import { ProfilePageLoader } from '../../../index'
import { PostModel } from '../../../model/post.model'
import { StorageUtil } from '../../../util/BrowerStorageUtil'
import { PATH_POST_PERSON } from '../../../util/RequestConstants'
import { formatDateString } from '../../../util/StringUtil'
import { CreatePostSection } from '../../profile-page/CreatePostSection'
import { Post } from '../../profile-page/Post'

export type PostsTabProps = {
    className?: string
    isOwner: boolean
}

export const PostsTab = (props: PostsTabProps) => {
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { getJson } = useFetch()
    const { profileId } = useLoaderData() as ProfilePageLoader
    const token = StorageUtil.get<string>('SESSION', 'token')
    const { handleError } = useErrorHandler()

    useEffect(() => {
        setLoading(true)
        getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`, undefined, token).then((res) => {
            setPostList(res)
            setLoading(false)
        })
    }, [])

    function refreshPosts() {
        getJson<PostModel[]>(PATH_POST_PERSON + `/${profileId}`)
            .then((res) => {
                setPostList(res)
            })
            .catch((err) => {
                handleError(err)
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={props.className}>
            {props.isOwner ? (
                <>
                    <CreatePostSection profileId={profileId} onCreate={refreshPosts} />

                    <h4 className={'mt-5'}>Posts</h4>
                </>
            ) : (
                ''
            )}

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
                                  isOwner={props.isOwner}
                                  onClickDelete={refreshPosts}
                              />
                          )
                      })
                    : ''}
            </>
        </div>
    )
}
