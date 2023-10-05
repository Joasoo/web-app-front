import {ReactNode} from "react";

export type FormRowProps = {
    className?: string;
    children?: ReactNode
}

export const FormRow = (props: FormRowProps) => {

    return (
        <div className={"d-flex flex-column flex-md-row align-items-start align-items-md-center no-wrap  mb-sm-3 mb-md-0 " + (props.className ?? "")}>
            {props.children}
        </div>
    );
}