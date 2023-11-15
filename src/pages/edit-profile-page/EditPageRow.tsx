import { ReactNode } from 'react'
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
                <input
                    className={'reset-btn btn bg-accent-2 color-text-1'}
                    type={'button'}
                    value={'Reset'}
                    onClick={() => props.setValue(props.defaultValue ?? '')}
                />
            </div>
        </FormRow>
    )
}
