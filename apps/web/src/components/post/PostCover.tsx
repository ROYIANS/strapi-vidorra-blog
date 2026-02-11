'use client'

import Link from 'next/link'

interface PostCoverProps {
    cover?: string
    title: string
    author: string
    date: string
    pageViews?: number
    wordCount: number
    readingTime: number
}

/**
 * PostCover - 文章封面组件
 * 4:1宽高比，带封面图、标题和元数据栏
 */
export function PostCover({
    cover,
    title,
    author,
    date,
    pageViews,
    wordCount,
    readingTime,
}: PostCoverProps) {
    return (
        <div className="w-full aspect-[4/1] min-h-20 overflow-hidden relative group">
            {/* 封面图 */}
            {cover && (
                <img
                    alt={title}
                    src={cover}
                    className="w-full h-full object-cover group-hover:filter-none group-hover:scale-105
                             brightness-[0.6] transition-all duration-1000"
                />
            )}

            {/* 标题和元数据区域 */}
            <header
                className={`overflow-hidden px-24 max-md:px-4 pb-8 absolute bottom-0 inset-x-0 z-[1]
                         h-full flex items-end backdrop-blur-sm group-hover:backdrop-blur-none
                         transition-all duration-1000 ${cover ? 'text-white group-hover:opacity-50' : ''}`}
            >
                <div className="max-md:pt-4 pt-6">
                    {/* 标题 */}
                    <h1 className="font-serif text-4xl font-extrabold leading-snug max-md:mb-4 mb-6 mt-2">
                        <span>{title || '未命名文档'}</span>
                    </h1>

                    {/* 元数据网格 */}
                    <div className="grid grid-cols-9 gap-2 text-xs">
                        {/* 作者和日期 */}
                        <div className="col-span-3 flex max-lg:flex-col justify-start flex-row">
                            <span>
                                <i className="ri-pen-nib-line pr-1" />
                                <span
                                    title={`View all posts by ${author}`}
                                    className="font-bold"
                                >
                                    {author}
                                </span>
                            </span>
                            <span className="max-lg:hidden px-2 block">/</span>
                            <span>
                                <i className="ri-calendar-schedule-line pr-1" />
                                <time dateTime={date}>
                                    {new Date(date).toLocaleDateString('zh-CN')}
                                </time>
                            </span>
                        </div>

                        {/* 文章热度 */}
                        <div className="col-span-2 flex max-lg:flex-col justify-center flex-row">
                            <span>文章热度</span>
                            <span className="max-lg:hidden px-2 block">/</span>
                            <span>
                                <i className="ri-fire-fill pr-1" />
                                <span>{pageViews || '?'}</span>
                                <span>℃</span>
                            </span>
                        </div>

                        {/* 字数统计 */}
                        <div className="col-span-2 flex max-lg:flex-col justify-center flex-row">
                            <span>本文共计</span>
                            <span className="max-lg:hidden px-2 block">/</span>
                            <span>
                                <i className="ri-text pr-1" />
                                <span>{wordCount.toLocaleString()} 字</span>
                            </span>
                        </div>

                        {/* 阅读时间 */}
                        <div className="col-span-2 flex max-lg:flex-col justify-center flex-row">
                            <span>预计阅读</span>
                            <span className="max-lg:hidden px-2 block">/</span>
                            <span>
                                <i className="ri-hourglass-line pr-1" />
                                <span>{readingTime} 分钟</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
