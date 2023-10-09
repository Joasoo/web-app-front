import { ErrorModel } from '../model/error.model'

type RequestParams = { [key: string]: string }
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function useFetch() {
    function requestParamsString(params: RequestParams): string {
        if (!params) return ''
        let reqParamString = '?'
        for (const paramsKey in params) {
            const value = params[paramsKey]
            reqParamString += `${paramsKey}=${value}&`
        }
        return reqParamString.substring(0, reqParamString.length - 1)
    }

    const makeFetch = <TRequest, TResponse>(
        path: string,
        method: RequestMethod,
        requestParams?: RequestParams,
        body?: TRequest,
        token?: string
    ): Promise<TResponse> => {
        if (requestParams) {
            path += requestParamsString(requestParams)
        }

        return new Promise<TResponse>((resolve, reject) => {
            const auth: any = {}
            if (token) auth['Authorization'] = `Bearer ${token}`
            fetch(path, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...auth,
                },
                body: JSON.stringify(body),
            }).then((res) => {
                res.json().then((val: TResponse | ErrorModel) => {
                    res.ok
                        ? resolve(val as TResponse)
                        : reject(val as ErrorModel)
                })
            })
        })
    }

    const getJson = <TResponse>(
        path: string,
        requestParams?: RequestParams,
        token?: string
    ): Promise<TResponse> => {
        return makeFetch(path, 'GET', requestParams, undefined, token)
    }

    const postJson = <TRequest, TResponse>(
        path: string,
        body?: TRequest,
        token?: string
    ): Promise<TResponse> => {
        return makeFetch(path, 'POST', undefined, body, token)
    }

    const deleteJson = <TResponse>(
        path: string,
        requestParams?: RequestParams,
        token?: string
    ): Promise<TResponse> => {
        return makeFetch(path, 'DELETE', requestParams, undefined, token)
    }

    return { getJson, postJson, deleteJson }
}
