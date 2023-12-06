import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputButton } from '../../components/button/InputButton'
import { FullNameDispatchContext } from '../../components/layout/Layout'
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
import { Bio } from './Bio'
import './edit-profile-page.scss'
import { EditPageRow } from './EditPageRow'

export const EditProfilePage = () => {
    const { getJson, postJson } = useFetch()
    const { handleError } = useErrorHandler()
    const setFullName = useContext(FullNameDispatchContext)

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [residence, setResidence] = useState<string>('')
    const [hometown, setHometown] = useState<string>('')
    const [workplace, setWorkplace] = useState<string>('')
    const [relationshipStatus, setRelationshipStatus] = useState<StatusCodeModel>()
    const [dateOfBirth, setDateOfBirth] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [relStatusOptions, setRelStatusOptions] = useState<StatusCodeModel[]>([])
    let [editData, setEditData] = useState<EditDataModel>()
    const navigate = useNavigate()
    const profileId = StorageUtil.get<string>('SESSION', 'personId')
    const token = StorageUtil.get<string>('SESSION', 'token')

    useEffect(() => {
        getOriginalData()
    }, [])

    function getOriginalData() {
        setLoading(true)
        if (profileId) {
            const mainDataPromise = getJson<EditDataModel>(PATH_PROFILE_EDIT + `/${profileId}`, undefined, token)
            const relOptionsPromise = getJson<StatusCodeModel[]>(PATH_PROFILE_RELATIONSHIP_STATUS, undefined, token)
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
                setBio(res[1].bio)
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
                bio
            )
            postJson(PATH_PROFILE_EDIT_SAVE, newEditDataModel, token)
                .then(() => {
                    setFullName({
                        firstName: newEditDataModel.firstName,
                        lastName: newEditDataModel.lastName,
                    })
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
            </div>
            <div className={'w-90 w-md-100 mx-auto'}>
                <hr />
                <EditPageRow
                    label={'First Name:'}
                    value={firstName}
                    setValue={setFirstName}
                    defaultValue={editData?.firstName}
                    labelRequired
                />
                <EditPageRow
                    label={'Last Name:'}
                    value={lastName}
                    setValue={setLastName}
                    defaultValue={editData?.lastName}
                    labelRequired
                />
                <EditPageRow
                    label={'Date of Birth:'}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    defaultValue={editData?.dateOfBirth}
                    labelRequired
                />
                <EditPageRow
                    label={'E-mail:'}
                    value={email}
                    setValue={setEmail}
                    defaultValue={editData?.email}
                    labelRequired
                />
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
                <Bio value={bio} setValue={setBio} defaultValue={editData?.bio} />
            </div>
            <div className={'d-flex flex-row gap-3 justify-content-end m-3'}>
                <InputButton label={'Save'} onClick={saveChanges} type={'success'} className={'px-4'} />
                <InputButton
                    label={'Back'}
                    onClick={() => navigate(ROUTE_PROFILE + '/' + profileId)}
                    className={'px-4'}
                />
            </div>
        </div>
    )
}
