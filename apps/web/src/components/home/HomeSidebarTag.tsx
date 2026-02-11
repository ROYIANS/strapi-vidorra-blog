'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/**
 * HomeSidebarTag - 标签云卡片
 */
export function HomeSidebarTag() {
    return (
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200
                      dark:border-zinc-800 bg-opacity-80 pb-5 mb-3 h-max relative">
            {/* 顶部渐变遮罩 */}
            <div className="h-14 absolute top-0 inset-x-0 z-[1] pointer-events-none
                          bg-gradient-to-t from-white dark:from-zinc-900 w-full" />

            {/* 内容区域 */}
            <div className="relative inset-0 z-[2]">
                {/* 标题 */}
                <div className="text-sm font-bold text-gray-600 dark:text-gray-400 px-4 pt-2">
                    标签云
                </div>

                {/* 分割线 */}
                <div className="border-t border-gray-200 dark:border-zinc-800 my-2" />

                {/* 标签云内容 */}
                <div className="px-4">
                    <TagCloud />
                </div>
            </div>
        </div>
    )
}

/**
 * TagCloud - 标签云组件
 * 简化版实现，使用随机大小和颜色展示标签
 */
function TagCloud() {
    const containerRef = useRef<HTMLDivElement>(null)

    // 模拟标签数据（后续从API获取）
    const tags = [
        { name: 'React', count: 15 },
        { name: 'Next.js', count: 12 },
        { name: 'TypeScript', count: 20 },
        { name: 'TailwindCSS', count: 10 },
        { name: 'Node.js', count: 8 },
        { name: 'JavaScript', count: 18 },
        { name: 'CSS', count: 14 },
        { name: 'HTML', count: 10 },
        { name: 'Strapi', count: 6 },
        { name: 'MongoDB', count: 7 },
        { name: 'PostgreSQL', count: 5 },
        { name: 'Git', count: 12 },
    ]

    // 中国传统颜色
    const chineseColors = [
        '#C93756', // 胭脂
        '#F20C00', // 朱红
        '#FF4C00', // 橘红
        '#FF8936', // 橙黄
        '#FFC773', // 杏黄
        '#7BCFA6', // 竹青
        '#0EB0C9', // 碧蓝
        '#2E4E7E', // 靛青
        '#426666', // 墨灰
        '#8D4BBB', // 紫罗兰
    ]

    // 根据count计算字体大小
    const getFontSize = (count: number) => {
        const max = Math.max(...tags.map(t => t.count))
        const min = Math.min(...tags.map(t => t.count))
        const ratio = (count - min) / (max - min)
        return 12 + ratio * 12 // 12px - 24px
    }

    // 随机获取颜色
    const getRandomColor = () => {
        return chineseColors[Math.floor(Math.random() * chineseColors.length)]
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-48 flex flex-wrap items-center justify-center gap-2 overflow-hidden p-2"
        >
            {tags.map((tag, index) => {
                const fontSize = getFontSize(tag.count)
                const color = getRandomColor()

                return (
                    <Link
                        key={index}
                        href={`/tags/${encodeURIComponent(tag.name)}`}
                        className="inline-block px-2 py-1 hover:scale-110 transition-transform
                                 hover:underline cursor-pointer"
                        style={{
                            fontSize: `${fontSize}px`,
                            color: color,
                            fontFamily: 'Oswald, sans-serif',
                            fontWeight: tag.count > 15 ? 'bold' : 'normal',
                        }}
                        title={`${tag.name} (${tag.count}篇)`}
                    >
                        {tag.name}
                    </Link>
                )
            })}
        </div>
    )
}
