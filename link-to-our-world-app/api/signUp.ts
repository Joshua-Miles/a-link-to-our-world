import { AmbassadorClient } from "@triframe/ambassador";

export function signUp(this: AmbassadorClient | void, options: {
    name: string;
    email: string;
    password: string;
}): Promise<(number & {
    __serial__?: undefined | true;
}) | {
    isFailure: true;
    code: "emailIsInvalid";
} | {
    isFailure: true;
    code: "passwordTooShort";
} | {
    isFailure: true;
    code: "name";
} | {
    isFailure: true;
    code: "emailIsInUse";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("signUp", options);
}