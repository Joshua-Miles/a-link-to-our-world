import AsyncStorage from "@react-native-async-storage/async-storage";
import { IndeterminateValue, indeterminateValue } from "@triframe/utils-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialState: T): [ T | IndeterminateValue, Dispatch<SetStateAction<T | IndeterminateValue>> ] {
    const [ state, setState ] = useState<T | IndeterminateValue>(indeterminateValue);
    
    async function loadData() {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                setState(initialState);
            } else {
                const result = JSON.parse(value);
                setState(result)
            }
        } catch {
            setState(initialState);
        }
    }

    async function saveData(data: T | IndeterminateValue) {
        try {
            const value = JSON.stringify(data);
            await AsyncStorage.setItem(key, value);
        } catch {}
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData(state);
    }, [ state ])

    return [ state, setState ];
}
