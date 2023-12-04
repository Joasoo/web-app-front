import { useState } from 'react'
import { Input } from '../input/Input'
import './search-bar.scss'

export type SearchBarProps = {}

export const SearchBar = (props: SearchBarProps) => {
    const [value, setValue] = useState<string>('')

    return (
        <div className={'d-flex flex-row align-items-center gap-2 mx-2'}>
            <Input className={'search-input'} value={value} onChange={setValue} />
            <i className={'bi-search separator'} />
        </div>
    )
}
