type RequestParams = { [key: string]: string }
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function useFetch() {
    function requestParamsString(params: RequestParams): string {
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
        body?: TRequest
    ): Promise<TResponse> => {
        if (requestParams) {
            path += requestParamsString(requestParams)
        }

        return new Promise<TResponse>((resolve, reject) => {
            fetch(path, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }).then((res) => {
                res.json().then((val) => {
                    res.ok ? resolve(val) : reject(val)
                })
            })
        })
    }

    const getJson = <TResponse>(
        path: string,
        requestParams?: RequestParams
    ): Promise<TResponse> => {
        console.log('rerender getjson')
        return makeFetch(path, 'GET', requestParams)
    }

    const postJson = <TRequest, TResponse>(
        path: string,
        body?: TRequest
    ): Promise<TResponse> => {
        return makeFetch(path, 'POST', undefined, body)
    }

    const deleteJson = <TResponse>(
        path: string,
        requestParams?: RequestParams
    ): Promise<TResponse> => {
        return makeFetch(path, 'DELETE', requestParams)
    }

    return { getJson, postJson, deleteJson }
}
