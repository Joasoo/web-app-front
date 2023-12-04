import { useContext } from 'react'
import { ErrorContext } from '../components/error/ErrorOverlay'

export const useErrorHandler = () => {
    return { handleError: useContext(ErrorContext) }
}
