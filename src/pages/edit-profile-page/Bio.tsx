import { FormRow } from '../../components/FormRow'
import './edit-profile-page.scss'
import { InputButton } from '../../components/button/InputButton'

export type BioProps = {
    value: string
    setValue: (value: any) => void
    defaultValue: String | undefined
}

export const Bio = (props: BioProps) => {
    const maxBioSize = 500


    return (
        <FormRow className={'row justify-content-center my-2 gap-2 gap-md-4'}>
            <div className={'d-flex col-md-8 p-0'}>
                <textarea
                    className={'bio d-flex w-100 my-3 rounded-2 bg-secondary-subtle align-items-start'}
                    value={props.value ?? ''}
                    onChange={(e) => (e.target.value.length <= maxBioSize ? props.setValue(e.target.value) : null)}
                    placeholder={'Write your bio here...'}
                />
                <div className={'align-self-center mx-3 color-text-1'}>
                    {props.value ? props.value.length : 0}/{maxBioSize}
                </div>
            </div>
            <div className={'col-md-1 d-flex justify-content-end'}>
                <InputButton
                    className={'px-3 py-1'}
                    label={'Reset'}
                    onClick={() => props.setValue(props.defaultValue ?? '')}
                />
            </div>
        </FormRow>
    )
}