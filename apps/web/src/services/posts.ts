/**
 * Posts Service - article related API
 *
 * Default mode uses mock data.
 * Set NEXT_PUBLIC_USE_MOCK=false to use backend API.
 */

import type { Post, PostSummary, PaginatedPosts } from '@vidorra/types'
import { apiClient } from './api-client'
import { mockPosts, getPostBySlug as getMockPostBySlug } from '@/lib/mock-posts'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false'

export async function fetchPosts(
  page: number = 1,
  pageSize: number = 10,
  options?: { category?: string; tag?: string }
): Promise<PaginatedPosts> {
  if (USE_MOCK) {
    return fetchMockPosts(page, pageSize, options)
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(pageSize),
  })

  if (options?.category) params.append('category', options.category)
  if (options?.tag) params.append('tag', options.tag)

  const response = await apiClient.get<PostSummary[]>(`/posts?${params.toString()}`, {
    next: { revalidate: 60 },
  })

  return {
    posts: response.data ?? [],
    total: response.meta?.pagination?.total ?? 0,
    page: response.meta?.pagination?.page ?? page,
    pageSize: response.meta?.pagination?.pageSize ?? pageSize,
    totalPages: response.meta?.pagination?.pageCount ?? 1,
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (USE_MOCK) {
    return getMockPostBySlug(slug) ?? null
  }

  const response = await apiClient.get<Post>(`/posts/slug/${slug}`, {
    next: { revalidate: 60 },
  })

  return response.data ?? null
}

export async function fetchCategories(): Promise<string[]> {
  if (USE_MOCK) {
    const categories = [...new Set(mockPosts.map((p) => p.category).filter(Boolean))]
    return categories as string[]
  }

  const response = await apiClient.get<Array<{ name: string }>>('/categories')
  return response.data.map((c) => c.name)
}

export async function fetchTags(): Promise<string[]> {
  if (USE_MOCK) {
    return [...new Set(mockPosts.flatMap((p) => p.tags ?? []))]
  }

  const response = await apiClient.get<Array<{ name: string }>>('/tags')
  return response.data.map((t) => t.name)
}

export async function fetchRecommendedPosts(limit: number = 5): Promise<PostSummary[]> {
  if (USE_MOCK) {
    return mockPosts.slice(0, limit)
  }

  const response = await apiClient.get<PostSummary[]>(`/posts/recommended?limit=${limit}`)
  return response.data
}

export async function fetchStickyPosts(): Promise<PostSummary[]> {
  if (USE_MOCK) {
    return mockPosts.filter((p) => p.cover).slice(0, 3)
  }

  const response = await apiClient.get<PostSummary[]>('/posts/sticky?limit=3')
  return response.data
}

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
