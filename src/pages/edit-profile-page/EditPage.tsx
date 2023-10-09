import { ReactNode, useEffect, useState } from 'react'
import { Loader } from '../../components/loader/Loader'
import { useFetch } from '../../hooks/useFetch'
import { EditDataModel } from '../../model/edit-data.model'
import {
    PATH_PROFILE_EDIT,
    PATH_PROFILE_EDIT_SAVE,
} from '../../util/RequestConstants'
import './EditPage.scss'

type EditPageProps = {
    className?: string
    children?: ReactNode
}

export const EditPage = (props: EditPageProps) => {
    const { getJson, postJson } = useFetch()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [residence, setResidence] = useState<string>('')
    const [hometown, setHometown] = useState<string>('')
    const [workplace, setWorkplace] = useState<string>('')
    const [relationshipStatus, setRelationshipStatus] = useState<string>('')
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [profileBio, setProfileBio] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    let [editData, setEditData] = useState<EditDataModel>()
    const profileId = new URLSearchParams(window.location.search).get('id')

    useEffect(() => {
        getOriginalData()
    }, [])

    function getOriginalData() {
        setLoading(true)
        if (profileId) {
            getJson<EditDataModel>(PATH_PROFILE_EDIT + `/${profileId}`).then(
                (res) => {
                    setEditData(res)
                    setFirstName(res.firstName)
                    setLastName(res.lastName)
                    setEmail(res.email)
                    setResidence(res.residence)
                    setHometown(res.hometown)
                    setWorkplace(res.workplace)
                    setRelationshipStatus(res.relationShipStatus)
                    setDateOfBirth(res.dateOfBirth)
                    setProfileBio(res.profileBio)
                    setLoading(false)
                }
            )
        }
    }

    function saveChanges() {
        if (profileId) {
            console.log('person with id: ' + profileId + ' is editing info...')
            let newEditDataModel = new EditDataModel(
                profileId,
                firstName,
                lastName,
                dateOfBirth,
                email,
                residence,
                hometown,
                workplace,
                relationshipStatus,
                profileBio
            )
            postJson(PATH_PROFILE_EDIT_SAVE, newEditDataModel)
                .then(() => {
                    getOriginalData()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    if (loading) {
        return <Loader overlay />
    }

    return (
        <div
            className={
                'edit-box flex-column mx-auto border border-2 border-secondary rounded-3'
            }
        >
            {' '}
            {/*suur konteiner*/}
            {/*ülemine konteiner fotode ja bio jaoks*/}
            <div className={'container w-75'}>
                <div className={'row my-3'}>
                    <div className={'col d-flex flex-column'}>
                        <div
                            className={
                                'picture-box mx-auto rounded-circle bg bg-secondary-subtle'
                            }
                        />
                        <input
                            className={'btn btn-primary mx-auto w-50'}
                            type={'button'}
                            value={'Edit Profile Photo'}
                        />
                    </div>

                    <div className={'col d-flex flex-column'}>
                        <div
                            className={
                                'bg-picture-box bg bg-secondary-subtle rounded-3'
                            }
                        />
                        <input
                            className={'btn btn-primary mx-auto w-50'}
                            type={'button'}
                            value={'Edit Background Photo'}
                        />
                    </div>
                </div>
                <div className={'row my-3'}>
                    <div className={'col d-flex flex-column'}>
                        <div className={'text-box'}>
                            {editData?.profileBio ? (
                                <p>{editData?.profileBio}</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <input
                            className={'btn btn-primary mx-auto w-50'}
                            type={'button'}
                            value={'Edit Profile Bio'}
                            onClick={() => {}}
                        />
                    </div>
                    <div className={'col d-flex flex-column'}></div>
                </div>
            </div>
            <div className={'container w-75'}>
                {' '}
                {/*alumine konteiner infoväljade jaoks*/}
                <div className={'row'}>
                    <div className={'col-2'}></div>
                    <div className={'col-5'}></div>
                    <div className={'col-2'}>
                        <p className={'text-center fw-bold'}>Privacy level</p>
                    </div>
                    <div className={'col-2'}></div>
                    <hr />
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>First Name:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setFirstName(editData?.firstName ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Last Name:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setLastName(editData?.lastName ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Date Of Birth:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setDateOfBirth(editData?.dateOfBirth ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>E-Mail:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() => setEmail(editData?.email ?? '')}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Residence:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={residence}
                            onChange={(e) => setResidence(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setResidence(editData?.residence ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Hometown:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={hometown}
                            onChange={(e) => setHometown(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setHometown(editData?.hometown ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Workplace:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={workplace}
                            onChange={(e) => setWorkplace(e.target.value)}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() =>
                                setWorkplace(editData?.workplace ?? '')
                            }
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'}>
                        <p className={'text-start fw-bold'}>Marital Status:</p>
                    </div>
                    <div className={'col-5'}>
                        <input
                            type={'text'}
                            className={'w-100 rounded text-center'}
                            value={''}
                        />
                    </div>
                    <div className={'col-2 w-25'}>
                        <select
                            className={
                                'list-box form-select-sm w-75 text-center rounded border-2 border-secondary'
                            }
                        >
                            <option selected>Select</option>
                            <option value="1">Private</option>
                            <option value="2">Friends</option>
                            <option value="3">Public</option>
                        </select>
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={'reset-btn btn btn-secondary'}
                            value={'Reset'}
                            onClick={() => setRelationshipStatus('')}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-2'} />
                    <div className={'col-5'} />
                    <div className={'col-2'}>
                        <input
                            className={
                                'btn btn-primary w-75 bg-success border-success'
                            }
                            value={'Save'}
                            onClick={saveChanges}
                        />
                    </div>
                    <div className={'col-2'}>
                        <input
                            className={
                                'btn btn-primary w-75 bg-danger border-danger'
                            }
                            value={'Cancel'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
