import { apiClient } from '@/lib/api-client'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  name?: string
}

export interface User {
  id: string
  email: string
  username: string
  name: string | null
  avatar: string | null
  bio: string | null
  role: 'USER' | 'ADMIN' | 'EDITOR'
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
  role: 'USER' | 'ADMIN' | 'EDITOR'
}

export interface LoginResponse {
  access_token: string
  user: User
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', data)
    return response.data
  },

  async getProfile(): Promise<AuthProfile> {
    const response = await apiClient.get<AuthProfile>('/auth/profile')
    return response.data
  },
}
