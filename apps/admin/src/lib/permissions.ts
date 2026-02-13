export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard:view',
  USERS_VIEW: 'users:view',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export type Role = 'ADMIN' | 'EDITOR' | 'READER'
