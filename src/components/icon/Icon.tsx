import "./icon.scss";

type IconSize = "sm" | "md" | "lg";

export type IconProps = {
    className?: string;
    src: string;
    size?: IconSize;
}

export const Icon = (props: IconProps) => {
    return (
        <div className={props.className ?? ""}>
            <img className={props.size ? `icon-${props.size}` : "icon-md"} src={props.src}/>
        </div>
    );
}


