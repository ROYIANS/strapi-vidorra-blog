import { apiClient } from '@/lib/api-client'
import type { User } from './auth.service'

export interface CreateUserRequest {
  email: string
  username: string
  password: string
  name?: string
  role?: 'USER' | 'ADMIN' | 'EDITOR'
}

export interface UpdateUserRequest {
  email?: string
  username?: string
  name?: string
  role?: 'USER' | 'ADMIN' | 'EDITOR'
  isActive?: boolean
}

export interface UsersListResponse {
  data: User[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const usersService = {
  async getUsers(page = 1, limit = 10): Promise<UsersListResponse> {
    const response = await apiClient.get<UsersListResponse>('/users', {
      params: { page, limit },
    })
    return response.data
  },

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', data)
    return response.data
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data)
    return response.data
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}
