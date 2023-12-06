import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader } from '../../components/loader/Loader'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { PostModel } from '../../model/post.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_POST_FEED } from '../../util/RequestConstants'
import { formatDateString } from '../../util/StringUtil'
import { Post } from '../profile-page/Post'
import './feed-page.scss'

export const FeedPage = () => {
    const { getJson } = useFetch()
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [more, setMore] = useState(false)
    const sessionId = StorageUtil.get<number>('SESSION', 'personId') as number
    const token = StorageUtil.get<string>('SESSION', 'token')
    const limit = 10
    const { handleError } = useErrorHandler()

    useEffect(() => {
        setLoading(true)
        getNextPosts()
        setLoading(false)
    }, [])

    function getNextPosts() {
        getJson<PostModel[]>(PATH_POST_FEED + `/${sessionId}`, { pageNumber, limit }, token)
            .then((res) => {
                setPostList(postList.concat(res))
                setMore(res.length === limit)
                setPageNumber(pageNumber + 1)
            })
            .catch((err) => {
                handleError(err)
            })
    }

    if (loading) {
        return (
            <div className={'mx-auto'}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={'outer-box'}>
            <h2 className={'align-self-center'}>Feed</h2>
            <hr />
            <InfiniteScroll
                next={getNextPosts}
                hasMore={more}
                loader={
                    <div className={'mx-auto fit-content'}>
                        <Loader />
                    </div>
                }
                dataLength={postList.length}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>There are no more posts</b>
                    </p>
                }
            >
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
                                      isOwner={false}
                                  />
                              )
                          })
                        : ''}
                </>
            </InfiniteScroll>
        </div>
    )
}
