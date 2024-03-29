import { useState } from 'react'
import { InputButton } from '../../components/button/InputButton'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { AddPostModel } from '../../model/add-post.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_POST_ADD } from '../../util/RequestConstants'

type NewPostSectionProps = {
    profileId: number | undefined
    onCreate?: () => void
}

export const CreatePostSection = (props: NewPostSectionProps) => {
    const [newPostText, setNewPostText] = useState<string>('')
    const { handleError } = useErrorHandler()
    const { postJson } = useFetch()
    const maxPostSize = 1000
    const token = StorageUtil.get<string>('SESSION', 'token')

    function makePost() {
        if (newPostText && props.profileId) {
            setNewPostText('')
            let newModel = new AddPostModel(String(props.profileId), newPostText)
            postJson(PATH_POST_ADD, newModel, token)
                .then(() => {
                    props.onCreate?.()
                })
                .catch((err) => {
                    handleError(err)
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

            <div className={'d-flex gap-3'}>
                <InputButton type={'info'} label={'Create post'} onClick={makePost} />
                <InputButton label={'Clear'} onClick={() => setNewPostText('')} />
            </div>
        </>
    )
}
