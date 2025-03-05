import { Client } from '@triframe/proprietor';
import { from, makeFailure } from '@triframe/scribe'
import { hash } from 'bcrypt'
import { Session } from '../Session';
import { login } from './login';
import { Users } from './User';
import { validateCreateUserOptions } from './validateCreateUserOptions';

type SignUpOptions = {
    name: string;
    email: string
    password: string
}

export async function signUp(client: Client<Session>, options: SignUpOptions) {
    const error = validateCreateUserOptions(options);
    if (error) return error;

    const { email, password, name } = options;

    const existingUserWithEmail = await Users.withEmail(options.email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null) return makeFailure('emailIsInUse', {})

    const passwordDigest = await hash(password, 10);

    const user = await Users.append({ email, passwordDigest, name });

    await login(client, options);

    return user.id;
}
