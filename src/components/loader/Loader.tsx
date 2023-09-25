import LoaderIcon from "../../img/temploader.svg";
import "./loader.scss";

export type LoaderProps = {
    className?: string;
    size?: "sm" | "md" | "lg"; /* Not implemented */
    overlay?: boolean;
}

const loaderSizes = {
    "sm": {
        "width": "6em",
        "height": "6em",
    },
    "md": {
        "width": "8em",
        "height": "8em",
    },
    "lg": {
        "width": "12em",
        "height": "12em",
    }
}

export const Loader = (props: LoaderProps) => {
    const loaderOptions = props.size ? loaderSizes[props.size] : loaderSizes["md"];
    return (
        <div className={(props.overlay ? "overlay " : "no-overlay ") + (props.className ?? "")}>
            <img className={props.overlay ? "img-overlay" : ""} src={LoaderIcon} style={loaderOptions}/>
        </div>
    );
}