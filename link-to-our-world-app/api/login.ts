import { AmbassadorClient } from "@triframe/ambassador";

export function login(this: AmbassadorClient | void, options: {
    email: string;
    password: string;
}): Promise<undefined | {
    isFailure: true;
    code: "emailIsInvalid";
} | {
    isFailure: true;
    code: "passwordTooShort";
} | {
    isFailure: true;
    code: "invalidCredentials";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("login", options);
}