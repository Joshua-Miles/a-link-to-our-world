import { AmbassadorClient } from "@triframe/ambassador";

export function dealDamage(this: AmbassadorClient | void, damage: number): Promise<undefined | {
    isFailure: true;
    code: "notAuthorized";
} | {
    isFailure: true;
    code: "cannotDealNegativeDamage";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("dealDamage", damage);
}