import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { PostModel } from '../../model/post.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { Loader } from '../../components/loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PATH_POST_FEED } from '../../util/RequestConstants'
import { Post } from '../profile-page/Post'
import { formatDateString } from '../../util/StringUtil'


export const FeedPage = () => {
    const [postList, setPostList] = useState<PostModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { getJson } = useFetch()
    const sessionId = StorageUtil.get<number>('SESSION', 'personId') as number
    const token = StorageUtil.get<string>('SESSION', 'token')
    const limit = 10
    let page: number = 0
    let more: boolean = true

    useEffect(() => {
        setLoading(true)
        getNextPosts()
        setLoading(false)
    }, [])

    function getNextPosts() {
        if (more) {
            var initialLength = postList.length
            getJson<PostModel[]>(PATH_POST_FEED + `/${sessionId}`, { page, limit }, token)
                .then((res) => {
                    // TODO: wtf is going on here
                    console.log('Has more: ' + more)
                    more = initialLength < postList.length
                    console.log('New Has more: ' + more)
                    console.log('Page: ' + page)
                    page++
                    console.log('New page: ' + page)
                    setPostList(postList.concat(res))
                })
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={'d-flex flex-column align-items-center mt-4 mx-5 px-2'}>
            <h2>Feed</h2>

            <InfiniteScroll
                next={getNextPosts}
                hasMore={more}
                loader={<Loader />}
                dataLength={postList.length}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>There are no more posts!</b>
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