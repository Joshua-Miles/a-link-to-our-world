import { useCallback, useRef } from "react";

export function useLatestCallback<T extends (...args: any[]) => any>(callback: T): T {
    const latestRef = useRef<T>(callback)
    latestRef.current = callback;
    // @ts-ignore
    return useCallback<T>((...args: Parameters<T>) => {
        return latestRef.current(...args)
    }, [])
} 