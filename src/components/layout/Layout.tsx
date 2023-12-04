import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'
import './layout.scss'

export type LayoutProps = {
    withHeader?: boolean
    withFooter?: boolean
    children?: ReactNode
}

function Layout(props: LayoutProps) {
    return (
        <div className={'w-100 h-100 ' + (props.withFooter ? 'layout-footer ' : '')}>
            {props.withHeader && <Header />}
            {props.children}
            {props.withFooter && <Footer />}
        </div>
    )
}

export default Layout
