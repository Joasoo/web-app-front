export type DropdownProps<T = any> = {
    options: T[]
    value: T
    setValue: (value: T) => void
    formatLabel?: (value: T) => string
    className?: string
}

export const DropdownSelect = (props: DropdownProps) => {
    return (
        <select
            className={'form-element-bg rounded-2 ' + (props.className ?? '')}
            onChange={(e) => {
                const index = Number(
                    e.target.options[e.target.selectedIndex].value
                )
                props.setValue(props.options[index])
            }}
        >
            {props.options.map((option, index) => {
                return (
                    <option
                        className={'custom-option'}
                        key={index}
                        value={index}
                    >
                        {props.formatLabel?.(option) ?? option}
                    </option>
                )
            })}
        </select>
    )
}
