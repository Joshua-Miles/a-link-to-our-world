import { makeFailure } from "@triframe/scribe";
import { validateLoginOrSignupOptions } from "./validateLoginOrSignupOptions";

export function validateCreateUserOptions(options: { firstName: string, lastName: string, email: string, password?: string }) {
    const error = validateLoginOrSignupOptions(options)
    if (error) return error;

    if (!options.firstName) return makeFailure('firstNameIsEmpty', {})
    if (!options.firstName) return makeFailure('lastNameIsEmpty', {})
    return false;
}
