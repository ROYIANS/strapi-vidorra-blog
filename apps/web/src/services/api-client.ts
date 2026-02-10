/**
 * API Client - 统一的 API 请求层
 * 当 Strapi 后端就绪后，只需修改环境变量即可切换数据源
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''

interface ApiRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: unknown
    headers?: Record<string, string>
    cache?: RequestCache
    next?: NextFetchRequestConfig
}

interface StrapiResponse<T> {
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

/**
 * 基础 API 请求函数
 */
async function apiRequest<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<StrapiResponse<T>> {
    const { method = 'GET', body, headers = {}, cache, next } = options

    const url = `${STRAPI_URL}/api${endpoint}`

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (API_TOKEN) {
        defaultHeaders['Authorization'] = `Bearer ${API_TOKEN}`
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
            throw new ApiError(
                `API request failed: ${response.status} ${response.statusText}`,
                response.status
            )
        }

        const json = await response.json()
        return json as StrapiResponse<T>
    } catch (error) {
        if (error instanceof ApiError) throw error
        throw new ApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown'}`,
            0
        )
    }
}

/**
 * 自定义 API 错误类
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

/**
 * API 客户端
 */
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

export type { StrapiResponse }
