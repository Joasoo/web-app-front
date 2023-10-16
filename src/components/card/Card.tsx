import { ReactNode } from 'react'
import './card.scss'

export type CardProps = {
    className?: string
    children?: ReactNode
}

export const Card = (props: CardProps) => {
    return <div className={'custom-card p-3 rounded-4 ' + (props.className ?? '')}>{props.children ?? ''}</div>
}
