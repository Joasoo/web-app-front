import { useState } from 'react'
import './error-overlay.scss'

export type ErrorComponentProps = {
    label?: string
    onClose?: () => void
}

export const ErrorComponent = (props: ErrorComponentProps) => {
    const [showClose, setShowClose] = useState<boolean>(false)

    return (
        <div
            className={'err-component bg-accent-2 color-text-1 py-3 text-center rounded-3 cursor-pointer'}
            onMouseEnter={() => setShowClose(true)}
            onMouseLeave={() => setShowClose(false)}
        >
            {props.label ?? 'NIL'}
            {showClose ? (
                <i
                    className={'bi-x err-close fs-5'}
                    onClick={() => {
                        props.onClose?.()
                    }}
                />
            ) : (
                ''
            )}
        </div>
    )
}
