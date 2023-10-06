import React, {ReactNode} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_EDIT} from "../util/RouteConstants";

type EditPageProps = {
    className? : string;
    children? : ReactNode
};
export const EditPage = (props: EditPageProps) => {
    const navigate = useNavigate();

    return (
        <div className={"d-flex flex-column w-50 mt-5 mx-auto border border-2 border-secondary rounded-3"}> {/*suur konteiner*/}
            <div className={"d-flex border border-2 rounded-3"}> {/*ülemine konteiner fotode ja bio jaoks*/}
                <div className={"d-flex flex-column w-100 justify-content-between border rounded-3"}> {/*profile foto ja bio konteiner*/}
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*profile foto*/}
                        <div className={"d-flex flex-column  mx-auto justify-content-between border rounded-3"}>
                            <div className={"border border-2 rounded-3"}>
                                ## Photo ##
                            </div>
                            <div className={"border border-2 rounded-3"}>
                                Edit photo button
                            </div>
                        </div>
                    </div>
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*bio*/}
                        <div className={"d-flex flex-column  mx-auto justify-content-between border rounded-3"}>
                            <div className={"border border-2 rounded-3"}>
                                ## BIO text here ##
                            </div>
                            <div className={"border border-2 rounded-3"}>
                                Edit BIO button
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"d-flex flex-column w-100 justify-content-between border rounded-3"}> {/*background foto konteiner*/}
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*background foto*/}
                        <div className={"d-flex flex-column  mx-auto justify-content-between border rounded-3"}>
                            <div className={"border border-2 rounded-3"}>
                                ## BackGround Photo ##
                                <svg>
                                    <circle radius={50} cx={50} cy={50} fill="grey" stroke="black" strokeWidth={"3"}>ef</circle>
                                </svg>
                            </div>
                            <div className={"border border-2 rounded-3"}>
                                Edit photo button
                            </div>
                        </div>
                    </div>
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*empty for now*/}
                        Empty spot
                    </div>
                </div>
            </div>

            <div className={"d-flex w-100  border border-2 rounded-3"}> {/*alumine konteiner infoväljade jaoks*/}
                Container for editing data fields
            </div>

        </div>
    )
}
