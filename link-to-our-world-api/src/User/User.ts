import { persist, Serial } from "@triframe/scribe";
import { UserRole, UserRoles } from "./UserRoles";

export type User = {
    id: Serial;
    role: UserRole;
    name: string;
    email: string;
    passwordDigest: string;
}

export const Users = persist<User>()
    .defaults({ role: UserRoles.user })
    .primaryKey('id')
    .uniqueIndexBy('email');
