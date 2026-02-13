export const ROLES = {
  READER: 'READER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard:view',
  USERS_VIEW: 'users:view',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.ADMIN]: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE,
  ],
  [ROLES.EDITOR]: [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.USERS_VIEW],
  [ROLES.READER]: [PERMISSIONS.DASHBOARD_VIEW],
}

export function getPermissionsForRole(role: Role | null | undefined): Permission[] {
  if (!role) return []
  return ROLE_PERMISSIONS[role] ?? []
}

export function getPermissionsForRoles(
  roles: Array<Role | null | undefined>
): Permission[] {
  const union = new Set<Permission>()
  for (const role of roles) {
    for (const permission of getPermissionsForRole(role)) {
      union.add(permission)
    }
  }
  return Array.from(union)
}
