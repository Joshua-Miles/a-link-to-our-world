import { AmbassadorClient } from "@triframe/ambassador";

export function downloadMemoryImage(this: AmbassadorClient | void, uuid: string): Promise<string> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunctionHTTP("downloadMemoryImage", { uuid });
}