import { AmbassadorClient } from "@triframe/ambassador";

import type { LocalFileReference } from "@triframe/ambassador";

export function saveMemory(this: AmbassadorClient | void, slug: "memory-1" | "memory-2", image: LocalFileReference): Promise<{
    id: number & {
        __serial__?: undefined | true;
    };
    playerId: number;
    slug: "memory-1" | "memory-2";
    imageUUID: string;
} | {
    isFailure: true;
    code: "notAuthorized";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunctionHTTP("saveMemory", { slug, image });
}