import { AuthorModel } from '../../model/post.model'
import './Post.scss'

type PostProps = {
    id: string
    content: string
    author: AuthorModel
    createdAt: string
    onClickEdit?: (value: string) => void
    onClickDelete?: (value: string) => void
    className?: string
}

export const Post = (props: PostProps) => {
    return (
        <div className={'d-flex w-100'}>
            <div
                className={
                    'post my-3 border border-2 border-secondary rounded ' + (props.className ? props.className : '')
                }
            >
                <div className={'d-flex justify-content-between'}>
                    <small className={'text-secondary'}>
                        By: {props.author['firstName'] + ' ' + props.author['lastName']}
                    </small>
                    {props.createdAt ? <small className={'text-secondary'}>{props.createdAt}</small> : ''}
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

                {props.onClickDelete ? (
                    <input
                        className={'mx-3 my-1 btn btn-danger'}
                        type={'button'}
                        value={'Delete'}
                        onClick={() => props.onClickDelete?.(props.id)}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
