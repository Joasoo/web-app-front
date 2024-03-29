import './button.scss'

type BaseButtonProps = {
    className: string
    value: string
    onClick: () => void
}

export const BaseButton = (props: BaseButtonProps) => {
    return <input className={'btn ' + props.className} value={props.value} type={'button'} onClick={props.onClick} />
}
