

type PostProps = {
    content: string;
    id: string;
    createdAt?: string;
}

export const Post = (props: PostProps) => {

    return (
        <div className={"d-flex w-75 my-3 align-items-start justify-content-start"} id={props.id}>
            {props.content}
        </div>
    )
}