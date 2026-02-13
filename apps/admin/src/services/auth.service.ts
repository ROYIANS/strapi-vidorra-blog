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
  bio: string | null
  role: Role
  permissions: Permission[]
}

export interface UpdateProfileInput {
  name?: string
  avatar?: string
  bio?: string
}

export const authService = {
  async getProfile(): Promise<AuthProfile> {
    const response = await apiClient.get<AuthProfile>('/auth/profile')
    return response.data
  },

  async updateProfile(input: UpdateProfileInput): Promise<AuthProfile> {
    const response = await apiClient.patch<AuthProfile>('/auth/profile', input)
    return response.data
  },
}
