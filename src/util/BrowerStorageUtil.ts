export enum StorageType {
    LOCAL = 'LOCAL',
    SESSION = 'SESSION',
}

/** Put a key-value pair into storage.
 * Will overwrite the existing key-value pair if it exists. */
export function put<T>(storage: StorageType, key: string, value: T): void {
    switch (storage) {
        case StorageType.LOCAL: {
            localStorage.setItem(key, serializeObject<T>(value))
            break
        }
        case StorageType.SESSION: {
            sessionStorage.setItem(key, serializeObject<T>(value))
            break
        }
    }
}

/** Put a key-value pair into storage.
 *  Will only do so if the key-value pair does not already exist. */
export function putIfAbsent<T>(
    storage: StorageType,
    key: string,
    value: T
): void {
    switch (storage) {
        case StorageType.LOCAL: {
            if (localStorage.getItem(key) == null) {
                localStorage.setItem(key, serializeObject<T>(value))
            }
            break
        }
        case StorageType.SESSION: {
            if (sessionStorage.getItem(key) == null) {
                sessionStorage.setItem(key, serializeObject<T>(value))
            }
        }
    }
}

/**
 * Get a value from storage with the given key.
 */
export function get<T>(storage: StorageType, key: string): T | undefined {
    switch (storage) {
        case StorageType.LOCAL: {
            const value = localStorage.getItem(key)
            if (value == null) return undefined
            return deserializeObject<T>(value)
        }
        case StorageType.SESSION: {
            const value = sessionStorage.getItem(key)
            if (value == null) return undefined
            return deserializeObject<T>(value)
        }
    }
}

/**
 * Return a value from storage with the given key or _default, if no value exists.
 */
export function getOrDefault<TReturn, TDefault>(
    storage: StorageType,
    key: string,
    _default: TDefault
): TReturn | TDefault {
    switch (storage) {
        case StorageType.LOCAL: {
            const value = localStorage.getItem(key)
            if (value == null) return _default
            return deserializeObject<TReturn>(value)
        }
        case StorageType.SESSION: {
            const value = sessionStorage.getItem(key)
            if (value == null) return _default
            return deserializeObject<TReturn>(value)
        }
    }
}

function serializeObject<T>(obj: T): string {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    return JSON.stringify(obj)
}

function deserializeObject<T>(value: string): T {
    if (!value) value = ''
    return JSON.parse(value)
}
