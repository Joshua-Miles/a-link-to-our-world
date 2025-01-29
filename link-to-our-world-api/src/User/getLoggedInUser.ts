import { Client } from "@triframe/proprietor";
import { GetOptions, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { Users } from "./User";

type Options<S> = GetOptions<typeof Users, S>

export const getLoggedInUser = observer(async <S>({ observe }: ObserverContext, client: Client<Session>, options: Options<S>) => {
    const { loggedInUserId } = await observe(client.getSession());

    if (loggedInUserId === null) return null;

    return await observe( Users.withId(loggedInUserId).get(options))
})
