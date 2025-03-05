import { from } from '@triframe/scribe'
import { Users } from './User';

export async function isEmailInUse(email: string) {
    const existingUserWithEmail = await Users.withEmail(email).get({
        select: from(Users.type)
            .id()
    })

    if (existingUserWithEmail !== null) return true;
    else return false;
}
