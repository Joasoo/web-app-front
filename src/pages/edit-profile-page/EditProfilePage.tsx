import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputButton } from '../../components/button/InputButton'
import { Loader } from '../../components/loader/Loader'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { EditDataModel } from '../../model/edit-data.model'
import { StatusCodeModel } from '../../model/status-code.model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import {
    PATH_PROFILE_EDIT,
    PATH_PROFILE_EDIT_SAVE,
    PATH_PROFILE_RELATIONSHIP_STATUS,
} from '../../util/RequestConstants'
import { ROUTE_PROFILE } from '../../util/RouteConstants'
import './edit-profile-page.scss'
import { EditPageRow } from './EditPageRow'

export const EditProfilePage = () => {
    const { getJson, postJson } = useFetch()
    const { handleError } = useErrorHandler()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [residence, setResidence] = useState<string>('')
    const [hometown, setHometown] = useState<string>('')
    const [workplace, setWorkplace] = useState<string>('')
    const [relationshipStatus, setRelationshipStatus] = useState<StatusCodeModel>()
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [profileBio, setProfileBio] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [relStatusOptions, setRelStatusOptions] = useState<StatusCodeModel[]>([])
    let [editData, setEditData] = useState<EditDataModel>()
    const navigate = useNavigate()
    const profileId = StorageUtil.get<string>('SESSION', 'personId')

    useEffect(() => {
        getOriginalData()
    }, [])

    function getOriginalData() {
        setLoading(true)
        if (profileId) {
            const mainDataPromise = getJson<EditDataModel>(PATH_PROFILE_EDIT + `/${profileId}`)
            const relOptionsPromise = getJson<StatusCodeModel[]>(PATH_PROFILE_RELATIONSHIP_STATUS)
            Promise.all([relOptionsPromise, mainDataPromise]).then((res) => {
                setEditData(res[1])
                setFirstName(res[1].firstName)
                setLastName(res[1].lastName)
                setEmail(res[1].email)
                setResidence(res[1].residence)
                setHometown(res[1].hometown)
                setWorkplace(res[1].workplace)
                setRelationshipStatus(res[1].relationshipStatus)
                setDateOfBirth(res[1].dateOfBirth)
                setProfileBio(res[1].profileBio)
                setRelStatusOptions(res[0])
                setLoading(false)
            })
        } else {
            throw new Error('profileId is missing.')
        }
    }

    function saveChanges() {
        setLoading(true)
        if (profileId) {
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
                    navigate(ROUTE_PROFILE + `/${profileId}`)
                })
                .catch((err) => {
                    getOriginalData()
                    setLoading(false)
                    handleError(err)
                })
        }
    }

    if (loading) {
        return <Loader overlay />
    }

    const buttonClassLarge = 'mx-auto px-4'
    return (
        <div className={'edit-box flex-column mx-auto border border-2 border-secondary rounded-3'}>
            {/*suur konteiner*/}
            {/*ülemine konteiner fotode ja bio jaoks*/}
            <div className={'container w-75 align-items-center'}>
                <div className={'row row-cols-1 row-cols-md-2 my-3'}>
                    <div className={'col d-flex flex-column'}>
                        <div className={'picture-box mx-auto rounded-circle bg bg-secondary-subtle'} />
                        <InputButton type={'info'} className={buttonClassLarge} label={'Edit Profile Photo'} />
                    </div>
                    <div className={'col d-flex flex-column'}>
                        <div className={'bg-picture-box bg bg-secondary-subtle rounded-3'} />
                        <InputButton type={'info'} className={buttonClassLarge} label={'Edit Profile Banner'} />
                    </div>
                </div>
                <div className={'row my-3 mx-auto'}>
                    <div className={'col-12 col-md-6 d-flex flex-column'}>
                        <div className={'text-box'}>{editData?.profileBio ? <p>{editData?.profileBio}</p> : ''}</div>
                        <InputButton type={'info'} className={buttonClassLarge} label={'Edit Profile Bio'} />
                    </div>
                </div>
            </div>
            <div className={'w-90 w-md-100 mx-auto'}>
                <hr />
                <EditPageRow
                    label={'First Name:'}
                    value={firstName}
                    setValue={setFirstName}
                    defaultValue={editData?.firstName}
                />
                <EditPageRow
                    label={'Last Name:'}
                    value={lastName}
                    setValue={setLastName}
                    defaultValue={editData?.lastName}
                />
                <EditPageRow
                    label={'Date of Birth:'}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    defaultValue={editData?.dateOfBirth}
                />
                <EditPageRow label={'E-mail:'} value={email} setValue={setEmail} defaultValue={editData?.email} />
                <EditPageRow
                    label={'Residence:'}
                    value={residence}
                    setValue={setResidence}
                    defaultValue={editData?.residence}
                />
                <EditPageRow
                    label={'Hometown:'}
                    value={hometown}
                    setValue={setHometown}
                    defaultValue={editData?.hometown}
                />
                <EditPageRow
                    label={'Workplace:'}
                    value={workplace}
                    setValue={setWorkplace}
                    defaultValue={editData?.workplace}
                />
                <EditPageRow
                    label={'Relationship status:'}
                    type={'dropdown'}
                    options={relStatusOptions}
                    value={relationshipStatus}
                    setValue={setRelationshipStatus}
                    defaultValue={editData?.relationshipStatus}
                />
            </div>
            <div className={'d-flex flex-row gap-3 justify-content-end w-75 m-3'}>
                <input
                    className={'btn bg-color-success color-text-1 px-4'}
                    value={'Save'}
                    type={'button'}
                    onClick={saveChanges}
                />
                <input
                    className={'btn bg-accent-2 color-text-1 px-3'}
                    value={'Back'}
                    type={'button'}
                    onClick={() => navigate(ROUTE_PROFILE + '/' + profileId)}
                />
            </div>
        </div>
    )
}
