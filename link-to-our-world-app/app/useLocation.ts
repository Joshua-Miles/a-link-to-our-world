import { useState, useEffect } from 'react';
import { IndeterminateValue, indeterminateValue } from '@triframe/utils-react'
import { Failure, makeFailure } from '@triframe/ambassador';
import * as Location from 'expo-location';
import { Coordinate } from './shared';

export type UseLocationResult =
    | IndeterminateValue
    | Coordinate
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

            await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 0, distanceInterval: 1 }, location => {
                setResult({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            });
        }

        getCurrentLocation();
    }, []);
    return result;
}
