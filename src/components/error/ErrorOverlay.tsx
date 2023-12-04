import { createContext, ReactNode } from 'react'
import { useErrorManager } from '../../hooks/useErrorManager'
import { ErrorModel } from '../../model/error.model'
import './error-overlay.scss'
import { ErrorComponent } from './ErrorComponent'

export type ErrorOverlayProps = {
    children?: ReactNode
}

const GENERIC_RESPONSE = 'An error has occurred.'
export const ErrorContext = createContext<(err: ErrorModel) => void>(() => {})
export const ErrorOverlay = (props: ErrorOverlayProps) => {
    const { errors, removeError, handleError } = useErrorManager()

    return (
        <>
            <div className={'err-overlay d-flex flex-column align-items-center justify-content-center mt-2 gap-2'}>
                {errors.map((err, index) => {
                    return (
                        <ErrorComponent
                            onClose={() => removeError(index)}
                            key={index}
                            label={err.cause ?? GENERIC_RESPONSE}
                            timestamp={err.timestamp ?? ''}
                        />
                    )
                })}
            </div>
            <ErrorContext.Provider value={handleError}>{props.children}</ErrorContext.Provider>
        </>
    )
}
