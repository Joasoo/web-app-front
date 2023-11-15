import './dropdown.scss'

export type DropdownProps<T = any> = {
    options: T[]
    value: T
    setValue: (value: T) => void

    withEmptyOption?: boolean
    formatLabel?: (value: T) => string
    className?: string
}

type OptionValue = {
    serialized: boolean
    value: string
}

function toOptionValue(value: any): OptionValue {
    return typeof value === 'object'
        ? {
              serialized: true,
              value: JSON.stringify(value),
          }
        : { serialized: false, value: value }
}

const emptyOptionValue = null
export const DropdownSelect = (props: DropdownProps) => {
    if (typeof props.value === 'object' && !props.formatLabel) {
        throw new Error("'formatLabel' prop must be specified if the given value is an object.")
    }

    return (
        <div className={'custom-dropdown rounded-5 text-danger ' + (props.className ?? '')}>
            <select
                onChange={(e) => {
                    const value = e.target.options[e.target.selectedIndex].value
                    const parsed = JSON.parse(value) as OptionValue
                    let deserializedValue = parsed.serialized ? JSON.parse(parsed.value) : parsed.value
                    props.setValue(deserializedValue)
                }}
                value={JSON.stringify(toOptionValue(props.value))}
                className={'color-text-2'}
            >
                {props.withEmptyOption ? <option value={JSON.stringify(toOptionValue(emptyOptionValue))} /> : ''}
                {props.options.map((option, index) => {
                    return (
                        <option
                            key={index}
                            className={'dropdown-item cursor-pointer'}
                            value={JSON.stringify(toOptionValue(option))}
                        >
                            {props.formatLabel?.(option) ?? option}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
