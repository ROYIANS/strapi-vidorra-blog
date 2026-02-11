'use client'

import { useEffect, useRef } from 'react'

interface PostContentProps {
    content: string
    className?: string
}

/**
 * PostContent - 文章内容组件
 * 使用 heti 中文排版引擎
 */
export function PostContent({ content, className = '' }: PostContentProps) {
    const contentRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // 初始化 Prism.js 代码高亮（如果需要）
        if (typeof window !== 'undefined' && contentRef.current) {
            // 可以在这里添加代码高亮逻辑
            // 例如：Prism.highlightAllUnder(contentRef.current)
        }
    }, [content])

    return (
        <article
            ref={contentRef}
            className={`post-content heti heti--serif mt-24 px-24 max-md:px-4 ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
