import type { Post, PostSummary } from '@vidorra/types'

// 模拟文章数据
export const mockPosts: PostSummary[] = [
    // 1. 大图模式 + 推荐（displayMode='large' + cover）
    {
        id: '1',
        slug: 'getting-started-with-nextjs',
        title: 'Next.js 14 完全指南：从入门到精通',
        description: '深入浅出介绍 Next.js 14 的核心特性，包括 App Router、服务端组件、流式渲染等现代化特性。本文将带你全面了解这个强大的 React 框架，从基础概念到高级应用，帮助你快速掌握现代化的 Web 开发技术栈。',
        excerpt: '本文将带你全面了解 Next.js 14 的核心特性，从基础概念到高级应用，帮助你快速掌握这个强大的 React 框架。',
        cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-10T10:00:00Z',
        updated: '2024-02-11T14:30:00Z',
        published: true,
        recommend: true,
        displayMode: 'large',
        category: '前端开发',
        tags: ['Next.js', 'React', '教程'],
        readTime: 8,
        wordCount: 3200,
    },
    // 2. 小图模式 + 有封面 + 有描述 + 推荐（displayMode='normal' 或不设置）
    {
        id: '2',
        slug: 'theme-system-design',
        title: '如何设计一个优雅的主题系统',
        description: '探讨如何使用 CSS 变量和 React Context 构建灵活的主题系统，支持深浅色模式切换。',
        excerpt: '主题系统是现代 Web 应用的重要组成部分。本文分享如何使用 CSS 变量、React Context 和 LocalStorage 构建一个既灵活又易用的主题系统。',
        cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-09T09:00:00Z',
        updated: '2024-02-10T11:20:00Z',
        published: true,
        recommend: true,
        displayMode: 'normal', // 明确指定普通模式，即使有 cover + description
        category: '设计模式',
        tags: ['主题', 'React', 'CSS'],
        readTime: 6,
        wordCount: 2400,
    },
    // 3. 小图模式 + 无封面
    {
        id: '3',
        slug: 'javascript-tips',
        title: 'JavaScript 开发技巧精选',
        description: '收集了 20 个实用的 JavaScript 开发技巧。',
        excerpt: '日常开发中积累的 JavaScript 实用技巧，涵盖数组、对象、函数等多个方面。',
        author: 'ROYIANS',
        date: '2024-02-08T15:30:00Z',
        updated: '2024-02-08T16:45:00Z',
        published: true,
        category: '技术分享',
        tags: ['JavaScript', '技巧'],
        readTime: 5,
        wordCount: 2000,
    },
    // 4. 大图模式（长描述，超过80字）
    {
        id: '4',
        slug: 'web-performance-optimization',
        title: 'Web 性能优化全面指南',
        description: '性能优化是 Web 开发中的重要课题。本文从多个维度深入探讨 Web 性能优化的方法和实践，包括资源加载优化、代码分割、图片优化、缓存策略、CDN 使用等方面。通过实际案例分析，帮助你掌握性能优化的核心技巧，让你的 Web 应用运行更快、用户体验更好。我们将从理论到实践，从基础到进阶，全方位讲解性能优化的方方面面。',
        excerpt: '全面讲解 Web 性能优化的各种技术和实践方法。',
        cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-07T14:00:00Z',
        updated: '2024-02-07T18:30:00Z',
        published: true,
        displayMode: 'large', // 大图模式
        category: '性能优化',
        tags: ['性能', 'Web', '优化'],
        readTime: 12,
        wordCount: 4500,
    },
    // 5. 小图模式 + 有封面 + 有描述（证明可以同时有 cover 和 description）
    {
        id: '5',
        slug: 'react-hooks-guide',
        title: 'React Hooks 深度解析',
        description: 'useState、useEffect、useContext 等常用 Hooks 的使用技巧和最佳实践，帮助你更好地使用 React Hooks。',
        excerpt: '深入理解 React Hooks 的工作原理和最佳实践。',
        cover: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-06T11:00:00Z',
        updated: '2024-02-06T13:20:00Z',
        published: true,
        displayMode: 'normal', // 普通模式，即使有 cover + description
        category: '前端开发',
        tags: ['React', 'Hooks'],
        readTime: 7,
        wordCount: 2800,
    },
    // 6. 小图模式 + 无封面 + 有描述
    {
        id: '6',
        slug: 'typescript-advanced',
        title: 'TypeScript 高级类型技巧',
        description: '深入学习 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等高级特性。',
        excerpt: '从泛型到条件类型，掌握 TypeScript 的高级特性。',
        author: 'ROYIANS',
        date: '2024-02-05T10:30:00Z',
        updated: '2024-02-05T12:00:00Z',
        published: true,
        category: '技术分享',
        tags: ['TypeScript', '类型系统'],
        readTime: 9,
        wordCount: 3500,
    },
    // 7. 大图模式 + 推荐
    {
        id: '7',
        slug: 'design-patterns-in-react',
        title: 'React 中的设计模式实践',
        description: '探索在 React 应用中常用的设计模式，包括组合模式、高阶组件、Render Props、Compound Components 等。通过实际代码示例，学习如何使用这些模式来构建可维护、可扩展的 React 应用。',
        excerpt: '学习如何在 React 中应用各种设计模式，提升代码质量。',
        cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-04T09:00:00Z',
        updated: '2024-02-04T16:00:00Z',
        published: true,
        recommend: true,
        displayMode: 'large', // 大图模式
        category: '设计模式',
        tags: ['React', '设计模式', '架构'],
        readTime: 10,
        wordCount: 4000,
    },
    // 8. 小图模式 + 有封面 + 有描述
    {
        id: '8',
        slug: 'css-grid-layout',
        title: 'CSS Grid 布局完全指南',
        description: '从基础到高级，全面掌握 CSS Grid 布局技术，学习如何构建复杂的网页布局。',
        excerpt: 'CSS Grid 是现代网页布局的强大工具，本文详细介绍其用法。',
        cover: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-03T14:20:00Z',
        updated: '2024-02-03T15:40:00Z',
        published: true,
        displayMode: 'normal', // 普通模式
        category: '前端开发',
        tags: ['CSS', 'Grid', '布局'],
        readTime: 6,
        wordCount: 2300,
    },
    // 9. 小图模式 + 无封面
    {
        id: '9',
        slug: 'nodejs-best-practices',
        title: 'Node.js 最佳实践',
        description: '总结 Node.js 开发中的最佳实践和常见陷阱。',
        excerpt: '构建高质量 Node.js 应用的实用建议。',
        author: 'ROYIANS',
        date: '2024-02-02T10:00:00Z',
        updated: '2024-02-02T11:30:00Z',
        published: true,
        category: '后端开发',
        tags: ['Node.js', '最佳实践'],
        readTime: 8,
        wordCount: 3100,
    },
    // 10. 小图模式 + 有封面
    {
        id: '10',
        slug: 'docker-for-developers',
        title: 'Docker 容器化实战',
        description: '学习如何使用 Docker 进行应用容器化部署。',
        excerpt: 'Docker 基础知识和实战技巧，让部署变得简单。',
        cover: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
        author: 'ROYIANS',
        date: '2024-02-01T13:00:00Z',
        updated: '2024-02-01T14:20:00Z',
        published: true,
        displayMode: 'normal', // 普通模式
        category: 'DevOps',
        tags: ['Docker', '容器', '部署'],
        readTime: 7,
        wordCount: 2700,
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
