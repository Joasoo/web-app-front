import "../../App.scss";
import "./input.scss";
import {HTMLInputTypeAttribute, ReactElement} from "react";
import {Loader} from "../loader/Loader";

const subtextSize=  "0.9em";

type ConfigType = {
    [key in SubtextType["type"]]: {
        icon?: ReactElement,
        subtextClass?: string,
        borderClass?: string,
    }
}

const inputConfig: ConfigType = {
    "danger": {
        icon: <i className="col bi-dash-circle fit-content text-danger px-1" style={{fontSize: subtextSize}}/>,
        subtextClass: "text-danger",
        borderClass: "border-danger"
    },
    "warning": {
        icon: <i className="col bi-exclamation-circle fit-content text-warning px-1" style={{fontSize: subtextSize}}/>,
        subtextClass: "text-warning",
        borderClass: "border-warning"
    },
    "success": {
        icon: <i className="col bi-check-circle fit-content text-success px-1" style={{fontSize: subtextSize}}/>,
        subtextClass: "text-success",
        borderClass: "border-success"
    },
    "loading": {
        icon: <Loader className="fit-content" size={"1.4em"}/>,
        borderClass: "border-black border-2"
    },
    "info": {
        icon: <i className="col bi-exclamation-circle fit-content text-info px-1" style={{fontSize: subtextSize}}/>,
        subtextClass: "text-info",
        borderClass: "border-info"
    }
}


export type SubtextType = {
    value: string;
    type: "danger" | "warning" | "success" | "loading" | "info"
}

export type InputProps = {
    value: string | undefined;
    onChange: (value: string) => void;
    text?: string;
    textAlign?: "start" | "center" | "end"
    type?: HTMLInputTypeAttribute;
    subtext?: SubtextType;
    className?: string;
}
export const Input = (props: InputProps) => {
    return (
        <div className={`d-flex flex-column ${props.className ?? ""}`}>
            <div className={"mx-auto"}>
                <input className={`custom-input rounded-2 form-element-bg col text-${props.textAlign ?? "start"} 
                ${(props.subtext ? inputConfig[props.subtext?.type].borderClass : "")}`}
                       placeholder={props.text}
                       value={props.value}
                       onChange={(e) => {
                           props.onChange(e.target.value);
                       }}
                       type={props.type}
                />
            </div>
            {
                props.subtext ?
                    <div className={"d-flex flex-row align-items-center"}>
                        <span>{inputConfig[props.subtext.type].icon}</span>
                        <span
                            className={`${inputConfig[props.subtext.type].subtextClass ?? ""} fw-semibold custom-subtext`}
                            style={{fontSize: subtextSize}}
                        >
                            {props.subtext?.value}
                        </span>
                    </div>
                    : ""
            }
        </div>
    );
}