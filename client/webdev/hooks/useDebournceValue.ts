
// debounce meaning delaying the value updated

import { useEffect, useState } from "react"

//we use a generic value which is type T 
export const useDebounceValue = <T>(value: T, delay?: number) => {
    const [devbounceValue, setDevbounceValue] = useState<T>(value)

    useEffect(() => {
        const timer =setTimeout(() => setDevbounceValue(value), delay || 300)

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay])

    return devbounceValue
}