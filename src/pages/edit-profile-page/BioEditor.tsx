import { InputButton } from '../../components/button/InputButton'
import './edit-profile-page.scss'

export type BioProps = {
    value: string
    setValue: (value: any) => void
    defaultValue: string | undefined
}

export const BioEditor = (props: BioProps) => {
    const maxBioSize = 500

    return (
        <div className={'bio-container'}>
            <div className={'d-flex p-0'}>
                <textarea
                    className={'bio w-100 my-3 rounded-2 bg-secondary-subtle align-items-start'}
                    value={props.value ?? ''}
                    onChange={(e) => (e.target.value.length <= maxBioSize ? props.setValue(e.target.value) : null)}
                    placeholder={'Write your bio here...'}
                />
                <div className={'align-self-center mx-3 color-text-1'}>
                    {props.value ? props.value.length : 0}/{maxBioSize}
                </div>
            </div>
            <InputButton
                className={'px-3 py-1 fit-content-h fit-content ms-auto'}
                label={'Reset'}
                onClick={() => props.setValue(props.defaultValue ?? '')}
            />
        </div>
    )
}
