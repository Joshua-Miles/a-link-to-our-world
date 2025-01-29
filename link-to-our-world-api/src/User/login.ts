import { Client } from '@triframe/proprietor'
import { from, makeFailure } from '@triframe/scribe'
import { compare } from 'bcrypt';
import { Session } from '../Session';
import { Users } from './User';
import { validateLoginOrSignupOptions } from './validateLoginOrSignupOptions';

type LoginOptions = {
    email: string
    password: string
}

export async function login(client: Client<Session>, options: LoginOptions) {
    const error = validateLoginOrSignupOptions(options);
    if (error) return error;

    const user = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
            .passwordDigest()
    })

    if (user === null) return makeFailure('invalidCredentials', {})

    const isCorrectPassword = await compare(options.password, user.passwordDigest);

    if (!isCorrectPassword) return makeFailure('invalidCredentials', {})

    await client.setSession({ loggedInUserId: user.id })
}
