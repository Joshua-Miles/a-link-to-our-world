import { makeFailure } from "@triframe/scribe";

export function validateLoginOrSignupOptions(options: { email: string, password?: string }) {
    if (!options.email.includes('@')) return makeFailure('emailIsInvalid', {});
    if (options.password !== undefined && options.password.length < 12) return makeFailure('passwordTooShort', {})
    return false;
}
