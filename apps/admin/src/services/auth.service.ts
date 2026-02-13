import { apiClient } from '@/lib/api-client'
import type { Permission, Role } from '@/lib/permissions'

export interface User {
  id: string
  email: string
  username: string
  name: string | null
  avatar: string | null
  bio: string | null
  role: Role
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthProfile {
  id: string
  clerkId: string | null
  email: string
  username: string
  name: string | null
  avatar: string | null
  role: Role
  permissions: Permission[]
}

export const authService = {
  async getProfile(): Promise<AuthProfile> {
    const response = await apiClient.get<AuthProfile>('/auth/profile')
    return response.data
  },
}
