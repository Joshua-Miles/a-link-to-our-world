import { makeFailure } from "@triframe/scribe";
import { validateLoginOrSignupOptions } from "./validateLoginOrSignupOptions";

export function validateCreateUserOptions(options: { name: string, email: string, password?: string }) {
    const error = validateLoginOrSignupOptions(options)
    if (error) return error;
    if (!options.name) return makeFailure('name', {})
    return false;
}
