/**
 * Posts Service - 文章相关 API
 *
 * 当前使用 mock 数据，Strapi 就绪后切换到真实 API
 * 切换方式：设置 NEXT_PUBLIC_USE_MOCK=false 环境变量
 */

import type { Post, PostSummary, PaginatedPosts } from '@vidorra/types'
import { apiClient } from './api-client'
import { mockPosts, getPostBySlug as getMockPostBySlug } from '@/lib/mock-posts'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false'

/**
 * 获取分页文章列表
 */
export async function fetchPosts(
    page: number = 1,
    pageSize: number = 10,
    options?: { category?: string; tag?: string }
): Promise<PaginatedPosts> {
    if (USE_MOCK) {
        return fetchMockPosts(page, pageSize, options)
    }

    const params = new URLSearchParams({
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
        'sort[0]': 'date:desc',
        'populate': '*',
    })

    if (options?.category) {
        params.append('filters[category][name][$eq]', options.category)
    }

    if (options?.tag) {
        params.append('filters[tags][name][$in]', options.tag)
    }

    const response = await apiClient.get<PostSummary[]>(
        `/posts?${params.toString()}`,
        { next: { revalidate: 60 } }
    )

    return {
        posts: response.data,
        total: response.meta?.pagination?.total ?? 0,
        page: response.meta?.pagination?.page ?? page,
        pageSize: response.meta?.pagination?.pageSize ?? pageSize,
        totalPages: response.meta?.pagination?.pageCount ?? 1,
    }
}

/**
 * 根据 slug 获取文章详情
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
    if (USE_MOCK) {
        return getMockPostBySlug(slug) ?? null
    }

    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate': '*',
    })

    const response = await apiClient.get<Post[]>(
        `/posts?${params.toString()}`,
        { next: { revalidate: 60 } }
    )

    return response.data?.[0] ?? null
}

/**
 * 获取所有分类
 */
export async function fetchCategories(): Promise<string[]> {
    if (USE_MOCK) {
        const categories = [...new Set(mockPosts.map((p) => p.category).filter(Boolean))]
        return categories as string[]
    }

    const response = await apiClient.get<Array<{ name: string }>>(
        '/categories?sort[0]=name:asc'
    )

    return response.data.map((c) => c.name)
}

/**
 * 获取所有标签
 */
export async function fetchTags(): Promise<string[]> {
    if (USE_MOCK) {
        const tags = [...new Set(mockPosts.flatMap((p) => p.tags ?? []))]
        return tags
    }

    const response = await apiClient.get<Array<{ name: string }>>(
        '/tags?sort[0]=name:asc'
    )

    return response.data.map((t) => t.name)
}

/**
 * 获取推荐文章
 */
export async function fetchRecommendedPosts(limit: number = 5): Promise<PostSummary[]> {
    if (USE_MOCK) {
        return mockPosts.slice(0, limit)
    }

    const params = new URLSearchParams({
        'filters[recommend][$eq]': 'true',
        'pagination[pageSize]': String(limit),
        'sort[0]': 'date:desc',
        'populate': '*',
    })

    const response = await apiClient.get<PostSummary[]>(
        `/posts?${params.toString()}`
    )

    return response.data
}

/**
 * 获取置顶文章（用于首页轮播）
 */
export async function fetchStickyPosts(): Promise<PostSummary[]> {
    if (USE_MOCK) {
        return mockPosts.filter((p) => p.cover).slice(0, 3)
    }

    const params = new URLSearchParams({
        'filters[sticky][$eq]': 'true',
        'sort[0]': 'date:desc',
        'populate': '*',
    })

    const response = await apiClient.get<PostSummary[]>(
        `/posts?${params.toString()}`
    )

    return response.data
}

// ────────────── Mock 实现 ──────────────

function fetchMockPosts(
    page: number,
    pageSize: number,
    options?: { category?: string; tag?: string }
): PaginatedPosts {
    let filtered = [...mockPosts]

    if (options?.category) {
        filtered = filtered.filter((p) => p.category === options.category)
    }

    if (options?.tag) {
        filtered = filtered.filter((p) => p.tags?.includes(options.tag!))
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const posts = filtered.slice(start, end)

    return {
        posts,
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize),
    }
}
