import { Link } from 'react-router-dom'
import { InputButton } from '../../components/button/InputButton'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { PersonFullNameModel } from '../../model/person-full-name-model'
import { PATH_POST_DELETE } from '../../util/RequestConstants'
import { ROUTE_PROFILE } from '../../util/RouteConstants'
import './post.scss'

type PostProps = {
    id: string
    content: string
    author: PersonFullNameModel
    createdAt: string
    isOwner: boolean
    onClickEdit?: (value: string) => void
    onClickDelete?: () => void
    className?: string
}

export const Post = (props: PostProps) => {
    const { deleteJson } = useFetch()
    const { handleError } = useErrorHandler()

    function deletePost(id: string) {
        if (props.isOwner) {
            deleteJson(PATH_POST_DELETE + `/${id}`)
                .then(() => {
                    props.onClickDelete?.()
                })
                .catch((err) => {
                    handleError(err)
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
                <div className={'d-flex justify-content-between align-items-center'}>
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

            <div className={'d-flex flex-column gap-3 justify-content-center'}>
                {props.onClickEdit ? <InputButton className={'mx-2'} type={'info'} label={'Edit'} /> : ''}
                {props.isOwner ? (
                    <InputButton
                        className={'mx-2'}
                        type={'danger'}
                        label={'Delete'}
                        onClick={() => deletePost(props.id)}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
