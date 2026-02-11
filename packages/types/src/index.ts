// 文章类型定义
export interface Post {
    id: string
    slug: string
    title: string
    description: string
    content: string
    cover?: string
    author: string
    date: string
    updated: string
    published: boolean
    category?: string
    tags?: string[]
    readTime?: number
    wordCount?: number
    recommend?: boolean
    displayMode?: 'large' | 'normal' // 展示模式：large=大图模式（需要cover），normal=普通小图模式
}

// 文章列表项（不包含完整内容）
export interface PostSummary extends Omit<Post, 'content'> {
    excerpt: string
}

// 分页数据
export interface PaginatedPosts {
    posts: PostSummary[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}
