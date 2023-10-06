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
        <div className={"d-flex flex-column w-50 mt-5 mx-auto border border-2 border-secondary rounded-3 "}> {/*suur konteiner*/}
            <div className={"d-flex border border-2 rounded-2"}> {/*ülemine konteiner fotode ja bio jaoks*/}
                <div className={"d-flex flex-column w-100 justify-content-between border rounded-3"}> {/*profile foto ja bio konteiner*/}
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*profile foto*/}
                        Profile photo spot
                    </div>
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*bio*/}
                        Bio Text spot
                    </div>
                </div>
                <div className={"d-flex flex-column w-100 justify-content-between border rounded-3"}> {/*background foto konteiner*/}
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*background foto*/}
                        Background photo spot
                    </div>
                    <div className={"mx-auto w-50 justify-content-between border"}> {/*empty for now*/}
                        Empty spot
                    </div>
                </div>
            </div>

            <div className={"p-2 bd-highlight"}> {/*alumine konteiner infoväljade jaoks*/}
                Container Row 2
            </div>

        </div>
    )
}
