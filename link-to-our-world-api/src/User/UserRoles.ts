
export const UserRoles = {
    admin: 100,
    user: 1
} as const

export type UserRole = (typeof UserRoles)[keyof (typeof UserRoles)]
