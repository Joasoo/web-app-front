import { FormRow } from '../../components/FormRow'
import { Input } from '../../components/input/Input'

export type EditPageRowProps = {
    label: string
    value: any
    setValue: (value: any) => void
    defaultValue: any
}

export const EditPageRow = (props: EditPageRowProps) => {
    return (
        <FormRow className={'row justify-content-center my-2'}>
            <div className={'text-start fw-bold col-3'}>{props.label}</div>
            <Input className={'col-5'} value={props.value} onChange={props.setValue} />
            <input
                className={'reset-btn btn btn-secondary col-2'}
                type={'button'}
                value={'Reset'}
                onClick={() => props.setValue(props.defaultValue ?? '')}
            />
        </FormRow>
    )
}
