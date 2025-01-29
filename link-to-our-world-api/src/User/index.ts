import { login } from "./login"
import { logout } from "./logout"
import { signUp } from "./signUp"
import { getLoggedInUser } from "./getLoggedInUser"
import { Users } from "./User"
import { UserRoles } from "./UserRoles"
export { upsertAdmin } from './upsertAdmin'
export { Users } from './User';
export { UserRoles } from './UserRoles';

export const PublicUserInterface = {
    login, logout, signUp, getLoggedInUser, UserType: Users.type, UserRoles: UserRoles
}
