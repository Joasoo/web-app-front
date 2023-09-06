import {useCallback} from "react";

export function useFetch() {
    type RequestParams = { [key: string]: string }

    function requestParamsString(params: RequestParams): string {
        let reqParamString = "?";
        for (const paramsKey in params) {
            const value = params[paramsKey];
            reqParamString += `${paramsKey}=${value}&`;
        }
        return reqParamString.substring(0, reqParamString.length - 1);
    }
    
    const getJson = useCallback(<TResponse>(path: string, requestParams?: RequestParams): Promise<TResponse> => {
        return fetch(path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }) as Promise<TResponse>;
    }, []);

    const postJson = useCallback(<TRequest, TResponse>(path: string, body?: TRequest): Promise<TResponse> => {
        return fetch(path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }) as Promise<TResponse>;
    }, []);

    const deleteJson = useCallback(<TResponse>(path: string, requestParams?: RequestParams): Promise<TResponse> => {
        return fetch(path, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }) as Promise<TResponse>;
    }, []);

    return {getJson, postJson, deleteJson};
}