export type StorageType = 'LOCAL' | 'SESSION'

export class StorageUtil {
    /** Put a key-value pair into storage.
     * Will overwrite the existing key-value pair if it exists. */
    static put<T>(storage: StorageType, key: string, value: T): void {
        switch (storage) {
            case 'LOCAL': {
                localStorage.setItem(key, StorageUtil.serializeObject<T>(value))
                break
            }
            case 'SESSION': {
                sessionStorage.setItem(key, StorageUtil.serializeObject<T>(value))
                break
            }
        }
    }

    /** Put a key-value pair into storage.
     *  Will only do so if the key-value pair does not already exist. */
    static putIfAbsent<T>(storage: StorageType, key: string, value: T): void {
        switch (storage) {
            case 'LOCAL': {
                if (localStorage.getItem(key) == null) {
                    localStorage.setItem(key, StorageUtil.serializeObject<T>(value))
                }
                break
            }
            case 'SESSION': {
                if (sessionStorage.getItem(key) == null) {
                    sessionStorage.setItem(key, StorageUtil.serializeObject<T>(value))
                }
            }
        }
    }

    /**
     * Get a value from storage with the given key.
     */
    static get<T>(storage: StorageType, key: string): T | undefined {
        switch (storage) {
            case 'LOCAL': {
                const value = localStorage.getItem(key)
                if (value == null) return undefined
                return StorageUtil.deserializeObject<T>(value)
            }
            case 'SESSION': {
                const value = sessionStorage.getItem(key)
                if (value == null) return undefined
                return StorageUtil.deserializeObject<T>(value)
            }
        }
    }

    /**
     * Return a value from storage with the given key or _default, if no value exists.
     */
    static getOrDefault<TReturn, TDefault>(storage: StorageType, key: string, _default: TDefault): TReturn | TDefault {
        switch (storage) {
            case 'LOCAL': {
                const value = localStorage.getItem(key)
                if (value == null) return _default
                return StorageUtil.deserializeObject<TReturn>(value)
            }
            case 'SESSION': {
                const value = sessionStorage.getItem(key)
                if (value == null) return _default
                return StorageUtil.deserializeObject<TReturn>(value)
            }
        }
    }

    private static serializeObject<T>(obj: T): string {
        if (!obj) return ''
        if (typeof obj === 'object') return JSON.stringify(obj)
        return String(obj)
    }

    private static deserializeObject<T>(value: string): T {
        if (!value) value = ''
        if (typeof value === 'object') return JSON.parse(value) as T
        return value as T
    }
}
