import "../../App.scss";
import "./input.scss";
import {HTMLInputTypeAttribute, ReactElement} from "react";
import {Loader} from "../loader/Loader";

export type SubtextType = {
    value: string;
    type: "danger" | "warning" | "success" | "loading" | "info"
}

export type InputProps = {
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    subtext?: SubtextType
    className?: string;
}

const fontSize = {fontSize: "1em"};

type ConfigType = {
    [key in SubtextType["type"]]: {
        icon?: ReactElement,
        subtextColorClass?: string
    }
}

const inputConfig: ConfigType = {
    "danger": {
        icon: <i className="col bi-dash-circle fit-content text-danger" style={fontSize}/>,
        subtextColorClass: "text-danger"
    },
    "warning": {
        icon: <i className="col bi-exclamation-circle fit-content text-warning" style={fontSize}/>,
        subtextColorClass: "text-warning"
    },
    "success": {
        icon: <i className="col bi-check-circle fit-content text-success" style={fontSize}/>,
        subtextColorClass: "text-success"
    },
    "loading": {
        icon: <Loader className="col fit-content" size={"1em"}/>
    },
    "info": {
        icon: <i className="col bi-exclamation-circle fit-content text-info" style={fontSize}/>,
        subtextColorClass: "text-info"
    }
}

export const Input = (props: InputProps) => {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <input className={(props.className ?? "") +
                    " custom-input rounded-2 form-element-bg col" +
                    (props.subtext ? ` border-${props.subtext.type}` : "")}
                       placeholder={props.placeholder}
                       value={props.value}
                       onChange={(e) => {
                           props.onChange(e.target.value);
                       }}
                       type={props.type}
                />
            </div>
            {
                props.subtext ?
                    <div className={"row align-items-center flex-nowrap"}>
                        {inputConfig[props.subtext.type].icon}
                        <div
                            className={`${inputConfig[props.subtext.type].subtextColorClass ?? ""} col-11 m-0 p-0 fw-semibold`}>
                            {props.subtext?.value}
                        </div>
                    </div>
                    : ""
            }
        </div>
    );
}