export type DropdownProps<T = any> = {
    options: T[]
    value: T
    setValue: (value: T) => void

    withEmptyOption?: boolean
    formatLabel?: (value: T) => string
    className?: string
}

const emptyOptionValue = 'EMPTY'
export const DropdownSelect = (props: DropdownProps) => {
    return (
        <select
            className={'form-element-bg rounded-2 ' + (props.className ?? '')}
            onChange={(e) => {
                const index = e.target.options[e.target.selectedIndex].value
                if (index === emptyOptionValue) {
                    props.setValue(null)
                    return
                }
                props.setValue(props.options[Number(index)])
            }}
        >
            {props.withEmptyOption ? <option value={emptyOptionValue} /> : ''}
            {props.options.map((option, index) => {
                return (
                    <option key={index} value={index}>
                        {props.formatLabel?.(option) ?? option}
                    </option>
                )
            })}
        </select>
    )
}
