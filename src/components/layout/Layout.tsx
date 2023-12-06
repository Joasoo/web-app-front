import { createContext, ReactNode, useState } from 'react'
import { FullNameModel } from '../../model/full-name.model'
import Footer from './Footer'
import Header from './Header'
import './layout.scss'

export type LayoutProps = {
    withHeader?: boolean
    withFooter?: boolean
    children?: ReactNode
}

type ValueType = FullNameModel
export const FullNameValueContext = createContext<ValueType>({
    firstName: '',
    lastName: '',
})

export const FullNameDispatchContext = createContext<(value: ValueType) => void>((value) => {})

function Layout(props: LayoutProps) {
    const [fullName, setFullName] = useState<FullNameModel>(() => {
        return {
            firstName: '-',
            lastName: '-',
        }
    })
    return (
        <FullNameValueContext.Provider value={fullName}>
            <FullNameDispatchContext.Provider value={setFullName}>
                <div className={'w-100 h-100 ' + (props.withFooter ? 'layout-footer ' : '')}>
                    {props.withHeader && <Header />}
                    {props.children}
                    {props.withFooter && <Footer />}
                </div>
            </FullNameDispatchContext.Provider>
        </FullNameValueContext.Provider>
    )
}

export default Layout
