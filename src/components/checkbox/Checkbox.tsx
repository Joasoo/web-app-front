export type CheckboxProps = {
    value: boolean
    onClick: (value: boolean) => void
    className?: string
    disabled?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
    return (
        <input
            disabled={props.disabled}
            checked={props.value}
            className={
                (props.className ?? '') +
                (props.disabled ? ' cursor-disabled' : '')
            }
            type={'checkbox'}
            onClick={() => props.onClick(!props.value)}
        />
    )
}
