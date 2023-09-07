import {useCallback} from "react";

type RequestParams = { [key: string]: string }

export function useFetch() {
    console.log("Fetch render.");

    function requestParamsString(params: RequestParams): string {
        let reqParamString = "?";
        for (const paramsKey in params) {
            const value = params[paramsKey];
            reqParamString += `${paramsKey}=${value}&`;
        }
        return reqParamString.substring(0, reqParamString.length - 1);
    }

    const getJson = useCallback(<TResponse>(path: string, requestParams?: RequestParams): Promise<TResponse> => {
        if (requestParams) {
            path += requestParamsString(requestParams);
        }

        return fetch(path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json() as Promise<TResponse>;
        });

    }, []);

    const postJson = useCallback(<TRequest, TResponse>(path: string, body?: TRequest): Promise<TResponse> => {
        return fetch(path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            return res.json() as Promise<TResponse>;
        });
    }, []);

    const deleteJson = useCallback(<TResponse>(path: string, requestParams?: RequestParams): Promise<TResponse> => {
        if (requestParams) {
            path += requestParamsString(requestParams);
        }

        return fetch(path, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json() as Promise<TResponse>;
        });
    }, []);

    return {getJson, postJson, deleteJson};
}