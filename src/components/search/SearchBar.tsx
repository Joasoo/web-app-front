import { useEffect, useState } from 'react'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { PersonFullNameModel } from '../../model/person-full-name-model'
import { StorageUtil } from '../../util/BrowerStorageUtil'
import { PATH_AUTOCOMPLETE_SEARCH } from '../../util/RequestConstants'
import '../friend-requests/friend-requests.scss'
import { Input } from '../input/Input'
import './search-bar.scss'
import { SearchDropdown } from './SearchDropdown'

export type SearchBarProps = {}

const AUTOCOMPLETE_MIN_LENGTH = 3

export const SearchBar = (props: SearchBarProps) => {
    const [value, setValue] = useState<string>('')
    const [open, setOpen] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [results, setResults] = useState<PersonFullNameModel[]>([])
    const token = StorageUtil.get<string>('SESSION', 'token')
    const { getJson } = useFetch()
    const { handleError } = useErrorHandler()

    useEffect(() => {
        if (value.trim().length < AUTOCOMPLETE_MIN_LENGTH) {
            setOpen(false)
            return
        }
        setOpen(true)
        setLoading(true)
        getJson<PersonFullNameModel[]>(
            PATH_AUTOCOMPLETE_SEARCH,
            { query: `${encodeURIComponent(value.trim())}` },
            token
        )
            .then((res) => {
                setResults(res)
                setLoading(false)
            })
            .catch((err) => {
                handleError(err)
                setLoading(true)
            })
    }, [value])

    return (
        <>
            <div className={'position-relative'}>
                <div className={'d-flex flex-row align-items-center gap-2 mx-2'}>
                    <Input className={'search-input'} value={value} onChange={setValue} />
                    <i className={'bi-search separator'} />
                </div>
                {open ? <SearchDropdown setOpen={setOpen} results={results} loading={loading} /> : ''}
            </div>
        </>
    )
}
