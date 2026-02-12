/**
 * API Client - unified API request layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const API_TOKEN = process.env.API_TOKEN || ''

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

interface ApiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, cache, next } = options
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${path}`

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (API_TOKEN) {
    defaultHeaders.Authorization = `Bearer ${API_TOKEN}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    })

    if (!response.ok) {
      throw new ApiError(`API request failed: ${response.status} ${response.statusText}`, response.status)
    }

    const json = await response.json()
    return json as ApiResponse<T>
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown'}`, 0)
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiClient = {
  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
    return apiRequest<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, body: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
    return apiRequest<T>(endpoint, { ...options, method: 'POST', body })
  },

  put<T>(endpoint: string, body: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
    return apiRequest<T>(endpoint, { ...options, method: 'PUT', body })
  },

  delete<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
    return apiRequest<T>(endpoint, { ...options, method: 'DELETE' })
  },
}

export type { ApiResponse }
