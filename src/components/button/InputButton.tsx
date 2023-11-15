import './input-button.scss'

type ButtonType = 'danger' | 'info' | 'success' | 'default'
export type InputButtonProps = {
    label: string
    type?: ButtonType
    onClick?: () => void
    className?: string
}

export const InputButton = (props: InputButtonProps) => {
    let type = props.type ?? 'default'

    return (
        <input
            className={`border-0 p-2 px-3 rounded-2 color-text-1 button-${type} ` + (props.className ?? '')}
            onClick={props.onClick}
            type={'button'}
            value={props.label}
        />
    )
}
