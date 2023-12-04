import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { PostModel } from '../../model/post.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { Loader } from '../../components/loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PATH_POST_FEED } from '../../util/RequestConstants'
import { Post } from '../profile-page/Post'
import { formatDateString } from '../../util/StringUtil'
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

    useEffect(() => {
        setLoading(true)
        getNextPosts()
        setLoading(false)
    }, [])

    function getNextPosts() {
        const initialLength = postList.length
        getJson<PostModel[]>(PATH_POST_FEED + `/${sessionId}`, { pageNumber, limit }, token)
            .then((res) => {
                var updatedPosts = postList.concat(res)
                setPostList(updatedPosts)
                setMore(initialLength < updatedPosts.length)
                setPageNumber(pageNumber + 1)
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={'outer-box'}>
            <h2 className={"align-self-center"}>Feed</h2>
            <hr/>
            <InfiniteScroll
                next={getNextPosts}
                hasMore={more}
                loader={<Loader />}
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