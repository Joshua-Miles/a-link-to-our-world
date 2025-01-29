import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getLoggedInUser<S>(this: AmbassadorClient | void, options: {
    select: {
        ᑕ_model: {};
        ᑕ_superset?: undefined | {
            id: number & {
                __serial__?: undefined | true;
            };
            firstName: string;
            lastName: string;
            role: 1 | 100;
            email: string;
            passwordDigest: string;
        };
        ᑕ_subset: S;
    };
}): Observable<null | S> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getLoggedInUser", options);
}