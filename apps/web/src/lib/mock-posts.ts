import type { Post, PostSummary } from '@vidorra/types'

// 模拟文章数据
export const mockPosts: PostSummary[] = [
    {
        id: '1',
        slug: 'getting-started-with-nextjs',
        title: 'Next.js 14 完全指南：从入门到精通',
        description: '深入浅出介绍 Next.js 14 的核心特性，包括 App Router、服务端组件、流式渲染等现代化特性。',
        excerpt: '本文将带你全面了解 Next.js 14 的核心特性，从基础概念到高级应用，帮助你快速掌握这个强大的 React 框架。',
        cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-01-15T10:00:00Z',
        updated: '2024-01-16T14:30:00Z',
        published: true,
        category: '前端开发',
        tags: ['Next.js', 'React', '教程'],
        readTime: 8,
        wordCount: 3200,
    },
    {
        id: '2',
        slug: 'theme-system-design',
        title: '如何设计一个优雅的主题系统',
        description: '探讨如何使用 CSS 变量和 React Context 构建灵活的主题系统，支持深浅色模式切换。',
        excerpt: '主题系统是现代 Web 应用的重要组成部分。本文分享如何使用 CSS 变量、React Context 和 LocalStorage 构建一个既灵活又易用的主题系统。',
        cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-01-10T09:00:00Z',
        updated: '2024-01-12T11:20:00Z',
        published: true,
        category: '设计模式',
        tags: ['主题', 'React', 'CSS'],
        readTime: 6,
        wordCount: 2400,
    },
    {
        id: '3',
        slug: 'markdown-rendering-best-practices',
        title: 'Markdown 渲染的最佳实践',
        description: 'Markdown 在博客系统中扮演重要角色，本文介绍如何优雅地渲染 Markdown 内容。',
        excerpt: '从语法高亮到自定义组件，探索 Markdown 渲染的各种技巧和最佳实践，让你的博客内容更加丰富多彩。',
        cover: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-01-05T15:30:00Z',
        updated: '2024-01-08T16:45:00Z',
        published: true,
        category: '技术分享',
        tags: ['Markdown', 'Rendering', '博客'],
        readTime: 5,
        wordCount: 2000,
    },
]

// 模拟获取文章详情
export function getPostBySlug(slug: string): Post | undefined {
    const summary = mockPosts.find((post) => post.slug === slug)
    if (!summary) return undefined

    return {
        ...summary,
        content: `# ${summary.title}

${summary.description}

## 引言

这是一篇关于 ${summary.title} 的详细文章。本文将深入探讨相关的技术细节和实践经验。

## 核心概念

在开始之前，让我们先了解一些核心概念：

\`\`\`typescript
// 示例代码
interface Example {
  name: string
  value: number
}

const example: Example = {
  name: 'demo',
  value: 42
}
\`\`\`

## 实践案例

让我们通过一个实际案例来理解这些概念：

1. **第一步**：理解基本原理
2. **第二步**：动手实践
3. **第三步**：优化和改进

### 详细步骤

这里是更详细的说明...

## 总结

通过本文的学习，你应该已经掌握了 ${summary.title} 的核心知识。继续实践，不断提升！

---

*感谢阅读！如果觉得有帮助，欢迎分享给更多朋友。*
`,
    }
}

// 模拟分页获取文章列表
export function getPosts(page: number = 1, pageSize: number = 10) {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const posts = mockPosts.slice(start, end)

    return {
        posts,
        total: mockPosts.length,
        page,
        pageSize,
        totalPages: Math.ceil(mockPosts.length / pageSize),
    }
}
