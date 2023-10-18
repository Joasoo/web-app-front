import { AuthorModel } from '../../model/post.model'
import './Post.scss'
import { Link } from 'react-router-dom'
import { ROUTE_PROFILE } from '../../util/RouteConstants'
import { PATH_POST_DELETE } from '../../util/RequestConstants'
import { useFetch } from '../../hooks/useFetch'

type PostProps = {
    id: string
    content: string
    author: AuthorModel
    createdAt: string
    isOwner: boolean
    onClickEdit?: (value: string) => void
    onClickDelete?: () => void
    className?: string
}

export const Post = (props: PostProps) => {
    const { deleteJson } = useFetch()

    function deletePost(id: string) {
        if (props.isOwner) {
            deleteJson(PATH_POST_DELETE + `/${id}`)
                .then(() => {
                    props.onClickDelete?.()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className={'d-flex w-100'}>
            <div
                className={
                    'post my-3 border border-2 border-secondary rounded ' + (props.className ? props.className : '')
                }
            >
                <div className={'d-flex justify-content-between'}>
                    <div>
                        <small className={'text text-secondary'}>By:</small>
                        <Link to={ROUTE_PROFILE + '/' + props.author['id']} className={'text-secondary author'}>
                            <small>{props.author['firstName'] + ' ' + props.author['lastName']}</small>
                        </Link>
                    </div>
                    <small className={'text-secondary ml-1'}>{props.createdAt}</small>
                </div>
                <hr className={'w-100'} />
                <pre className={'content'} id={props.id}>
                    {props.content}
                </pre>
            </div>

            <div className={'d-flex flex-column justify-content-center'}>
                {props.onClickEdit ? (
                    <input className={'mx-3 my-1 btn btn-primary'} type={'button'} value={'Edit'} />
                ) : (
                    ''
                )}

                {props.isOwner ? (
                    <input
                        className={'mx-3 my-1 btn btn-danger'}
                        type={'button'}
                        value={'Delete'}
                        onClick={() => deletePost(props.id)}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
