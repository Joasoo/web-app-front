import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { AddPostModel } from '../../model/add-post.model'
import { PATH_POST_ADD } from '../../util/RequestConstants'

type NewPostSectionProps = {
    profileId: number | undefined
    onCreate?: () => void
}

export const CreatePostSection = (props: NewPostSectionProps) => {
    const [newPostText, setNewPostText] = useState<string>('')
    const { postJson } = useFetch()
    const maxPostSize = 1000

    function makePost() {
        if (newPostText && props.profileId) {
            console.log('Make a post for profile id: ' + props.profileId)
            setNewPostText('')
            let newModel = new AddPostModel(props.profileId, newPostText)
            postJson(PATH_POST_ADD, newModel)
                .then(() => {
                    props.onCreate?.()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <h4>Create a new post</h4>
            <div className={'d-flex w-100'}>
                <textarea
                    className={'new-post d-flex w-75 my-3 rounded-2 bg-secondary-subtle align-items-start'}
                    value={newPostText}
                    onChange={(e) => (e.target.value.length <= maxPostSize ? setNewPostText(e.target.value) : null)}
                    placeholder={'Write your post here...'}
                />
                <div className={'align-self-center mx-3 color-text-1'}>
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
        </>
    )
}
