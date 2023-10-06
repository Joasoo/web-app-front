import React, {ReactNode} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./EditPage.scss"
import {ROUTE_EDIT} from "../util/RouteConstants";

type EditPageProps = {
    className? : string;
    children? : ReactNode
};
export const EditPage = (props: EditPageProps) => {
    const navigate = useNavigate();

    return (
        <div className={"edit-box flex-column mx-auto border border-2 border-secondary rounded-3"}> {/*suur konteiner*/}
            {/*ülemine konteiner fotode ja bio jaoks*/}
            <div className={"container w-75"}>
                <div className={"row my-3"}>
                    <div className={"col d-flex flex-column"}>
                        <div className={"picture-box mx-auto rounded-circle bg bg-secondary-subtle"}/>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit Profile Photo"}/>
                    </div>

                    <div className={"col d-flex flex-column"}>
                        <div className={"bg-picture-box bg bg-secondary-subtle rounded-3"}/>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit Background Photo"}/>
                    </div>

                </div>
                <div className={"row my-3"}>
                    <div className={"col d-flex flex-column"}>
                        <div className={"text-box"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <input className={"btn btn-primary mx-auto w-50"} type={"button"} value={"Edit BIO"}/>
                    </div>
                    <div className={"col d-flex flex-column"}>
                        <div>

                        </div>

                    </div>

                </div>
            </div>

            <div className={"container w-75"}> {/*alumine konteiner infoväljade jaoks*/}
                <div className={"row my-1"}>
                    <div className={"col-2"}></div>
                    <div className={"col-5"}></div>
                    <div className={"col-2"}>
                        Privacy level
                    </div>
                    <div className={"col-2"}></div>
                </div>
                <hr/>
                <div className={"row my-1"}>tekst line 1</div>
                <div className={"row my-1"}>tekst line 1</div>
                Container for editing data fields
            </div>

        </div>
    )
}
