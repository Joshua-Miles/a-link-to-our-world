import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function listMemories(this: AmbassadorClient | void): Observable<{
    imageUrl: URL;
    id: number & {
        __serial__?: undefined | true;
    };
    slug: "planting-grinroot" | "planting-scribeleaf" | "planting-tumblebreeze" | "planting-fayflutter";
    imageUUID: string;
}[]> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listMemories");
}