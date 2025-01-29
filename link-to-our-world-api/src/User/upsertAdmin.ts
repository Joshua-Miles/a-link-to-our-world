import { from } from "@triframe/scribe";
import { hash } from "bcrypt";
import { Users } from "./User";
import { UserRoles } from "./UserRoles";


export async function upsertAdmin() {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_SECRET = process.env.ADMIN_SECRET;
    if (!ADMIN_EMAIL || !ADMIN_SECRET) return;

    const existingAdmin = await Users.withEmail(ADMIN_EMAIL).get({ select: from(Users.type).id() })
    if (existingAdmin) return;

    const passwordDigest = await hash(ADMIN_SECRET, 10);

    await Users.append({
        firstName: 'System',
        lastName: 'Admin',
        email: ADMIN_EMAIL,
        role: UserRoles.admin,
        passwordDigest
    })
}