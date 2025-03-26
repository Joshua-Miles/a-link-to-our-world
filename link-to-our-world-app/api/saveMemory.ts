import { AmbassadorClient } from "@triframe/ambassador";

import type { LocalFileReference } from "@triframe/ambassador";

export function saveMemory(this: AmbassadorClient | void, slug: "planting-grinroot" | "planting-scribeleaf" | "planting-tumblebreeze" | "planting-fayflutter", image: LocalFileReference): Promise<{
    isFailure: true;
    code: "notAuthorized";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    playerId: number;
    slug: "planting-grinroot" | "planting-scribeleaf" | "planting-tumblebreeze" | "planting-fayflutter";
    imageUUID: string;
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunctionHTTP("saveMemory", { slug, image });
}