import "./loader.scss";
import {Icon} from "../icon/Icon";
import LoaderIcon from "../../img/temploader.svg";


export type LoaderProps = {
    className?: string;
    size?: "sm" | "md" | "lg"; /* Not implemented */
    overlay?: boolean;
}

export const Loader = (props: LoaderProps) => {
    return (
        <div className={(props.overlay ? "overlay " : "no-overlay ") + (props.className ?? "")}>
            <Icon src={LoaderIcon} size={props.size} className={props.overlay ? "img-overlay" : ""}/>
        </div>
    );
}