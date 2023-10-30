import './Button.scss'

type BaseButtonProps = {
    className: string,
    value: string,
    onClick: () => void,

}

export const BaseButton = (props: BaseButtonProps) => {
    return (
        <input
            className={'mx-2 p-2 btn ' + props.className}
            value={props.value}
            type={"button"}
            onClick={props.onClick}
        />
    )
}
