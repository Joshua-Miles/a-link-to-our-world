import { Client } from '@triframe/proprietor'
import { Session } from '../Session';

export async function logout(client: Client<Session>) {
    await client.setSession({ loggedInUserId: null })
}
