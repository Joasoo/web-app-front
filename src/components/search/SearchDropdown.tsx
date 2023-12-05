import { useNavigate } from 'react-router-dom'
import { PersonFullNameModel } from '../../model/person-full-name-model'
import { ROUTE_PROFILE } from '../../util/RouteConstants'
import { formatFullName } from '../../util/StringUtil'
import { Loader } from '../loader/Loader'

export type SearchDropdownProps = {
    results: PersonFullNameModel[]
    loading: boolean
    setOpen?: (value: boolean) => void
}

export const SearchDropdown = (props: SearchDropdownProps) => {
    const navigate = useNavigate()
    return (
        <div className={'pop-up-search d-flex flex-column justify-content-center gap-2'}>
            {props.loading ? (
                <div className={'mx-auto'}>
                    <Loader size={'3.5em'} />
                </div>
            ) : (
                <>
                    {props.results.length === 0 ? <div className={'py-2'}>No results found.</div> : ''}
                    {props.results.map((res, index) => {
                        return (
                            <div key={index} className={'d-flex flex-row align-items-center gap-2'}>
                                <div
                                    style={{
                                        width: '2.5em',
                                        height: '2.5em',
                                        backgroundColor: 'lightslategray',
                                        borderRadius: '100%',
                                    }}
                                />
                                <div
                                    className={'underline'}
                                    onClick={() => {
                                        props.setOpen?.(false)
                                        navigate(ROUTE_PROFILE + `/${res.id}`)
                                    }}
                                >
                                    {formatFullName(res)}
                                </div>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}
