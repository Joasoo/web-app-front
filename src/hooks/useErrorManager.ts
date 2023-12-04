import { useCallback, useReducer } from 'react'
import { ErrorModel } from '../model/error.model'

type ErrorActionType = 'add' | 'remove'
export type ErrorAction = {
    type: ErrorActionType
    value: ErrorModel | number
}

function errorReducer(state: ErrorModel[], action: ErrorAction) {
    switch (action.type) {
        case 'add': {
            if (typeof action.value !== 'object') {
                throw new Error("value for action type 'add' needs to be an ErrorModel.")
            }
            return [action.value, ...state]
        }
        case 'remove': {
            if (typeof action.value !== 'number') {
                throw new Error("value for action type 'remove' needs to be an index.")
            }
            return state.filter((item, index) => {
                return index !== action.value
            })
        }

        default: {
            throw new Error('Invalid action type.')
        }
    }
}

export function useErrorManager() {
    const [errors, dispatch] = useReducer(errorReducer, [])

    const handleError = useCallback((err: ErrorModel) => {
        dispatch({
            type: 'add',
            value: err,
        })
    }, [])
    const removeError = useCallback((index: number) => {
        dispatch({
            type: 'remove',
            value: index,
        })
    }, [])

    return { errors, handleError, removeError }
}
