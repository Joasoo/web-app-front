import { ReactNode } from 'react'
import { InputButton } from '../../components/button/InputButton'
import { DropdownSelect } from '../../components/dropdown/DropdownSelect'
import { Input } from '../../components/input/Input'
import '../../util.scss'
import './edit-profile-page.scss'

export type EditPageRowProps = {
    label: ReactNode
    value: any
    setValue: (value: any) => void
    defaultValue: any
    type?: 'input' | 'dropdown' | 'date'
    options?: any[]
    labelRequired?: boolean
}

export const EditPageRow = (props: EditPageRowProps) => {
    const type = props.type ?? 'input'
    return (
        <div className={'row-container my-2'}>
            <div className={'text-start fw-bold ' + (props.labelRequired ? 'text-required' : '')}>{props.label}</div>
            {type === 'input' ? <Input className={' p-0'} value={props.value} onChange={props.setValue} /> : ''}
            {type === 'dropdown' ? (
                <DropdownSelect
                    className={''}
                    withEmptyOption
                    options={props.options ?? []}
                    value={props.value}
                    setValue={props.setValue}
                    formatLabel={(value) => value.value}
                />
            ) : (
                ''
            )}
            {type === 'date' ? (
                <Input className={'p-0'} type={'date'} value={props.value} onChange={props.setValue} />
            ) : (
                ''
            )}
            <div className={'d-flex justify-content-end'}>
                <InputButton
                    className={'px-3 py-1'}
                    label={'Reset'}
                    onClick={() => props.setValue(props.defaultValue ?? '')}
                />
            </div>
        </div>
    )
}
