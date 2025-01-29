import { useState, useEffect } from 'react';
import { IndeterminateValue, indeterminateValue } from '@triframe/utils-react'
import { Failure, makeFailure } from '@triframe/ambassador';
import * as Location from 'expo-location';

export type UseLocationResult =
    | IndeterminateValue
    | Location.LocationObject
    | Failure<'permissionDenied'>

export function useLocation(): UseLocationResult {
    const [result, setResult] = useState<UseLocationResult>(indeterminateValue);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setResult(makeFailure('permissionDenied', {}));
                return;
            }

            await Location.watchPositionAsync({}, location => {
                setResult(location);
            });
        }

        getCurrentLocation();
    }, []);
    return result;
}
