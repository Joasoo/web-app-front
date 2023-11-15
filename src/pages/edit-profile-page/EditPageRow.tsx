import { ReactNode } from 'react'
import { InputButton } from '../../components/button/InputButton'
import { DropdownSelect } from '../../components/dropdown/DropdownSelect'
import { FormRow } from '../../components/FormRow'
import { Input } from '../../components/input/Input'
import '../../util.scss'

export type EditPageRowProps = {
    label: ReactNode
    value: any
    setValue: (value: any) => void
    defaultValue: any
    type?: 'input' | 'dropdown'
    options?: any[]
}

export const EditPageRow = (props: EditPageRowProps) => {
    const type = props.type ?? 'input'
    return (
        <FormRow className={'row justify-content-center my-2 gap-2 gap-md-4'}>
            <div className={'text-start fw-bold col-3'}>{props.label}</div>
            {type === 'input' ? <Input className={'col-md-4 p-0'} value={props.value} onChange={props.setValue} /> : ''}
            {type === 'dropdown' ? (
                <DropdownSelect
                    className={'col-md-4'}
                    withEmptyOption
                    options={props.options ?? []}
                    value={props.value}
                    setValue={props.setValue}
                    formatLabel={(value) => value.value}
                />
            ) : (
                ''
            )}
            <div className={'col-md-2 d-flex justify-content-end'}>
                <InputButton
                    className={'px-3 py-1'}
                    label={'Reset'}
                    onClick={() => props.setValue(props.defaultValue ?? '')}
                />
            </div>
        </FormRow>
    )
}
