'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { PostSummary } from '@vidorra/types'

interface HomePostListProps {
  posts: PostSummary[]
  categories: string[]
  totalPosts: number
}

/**
 * HomePostList - 首页文章列表
 * 包含分类筛选（支持滚动）和文章列表展示
 */
export function HomePostList({ posts, categories, totalPosts }: HomePostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categoriesRef = useRef<HTMLUListElement>(null)
  const [hasScroll, setHasScroll] = useState(false)
  const [scrollIcon, setScrollIcon] = useState('ri-skip-right-fill')

  // 检测是否需要滚动按钮
  useEffect(() => {
    const checkScroll = () => {
      if (categoriesRef.current) {
        setHasScroll(
          categoriesRef.current.scrollWidth > categoriesRef.current.clientWidth
        )
      }
    }
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [categories])

  // 滚动处理
  const handleScrollClick = () => {
    if (!categoriesRef.current) return

    if (scrollIcon === 'ri-skip-right-fill') {
      categoriesRef.current.scrollBy({
        left: categoriesRef.current.clientWidth,
        behavior: 'smooth',
      })
      setScrollIcon('ri-skip-left-fill')
    } else {
      categoriesRef.current.scroll({
        left: 0,
        behavior: 'smooth',
      })
      setScrollIcon('ri-skip-right-fill')
    }
  }

  // 格式化日期为相对时间
  const formatRelativeTime = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

    if (diffInSeconds < 60) return '刚刚'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 分钟前`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 小时前`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} 天前`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} 个月前`
    return `${Math.floor(diffInSeconds / 31536000)} 年前`
  }

  return (
    <div className="w-full pb-5 select-none">
      {/* 分类筛选栏 */}
      <div className="text-sm w-full p-4 relative">
        <ul
          ref={categoriesRef}
          className="grid grid-flow-col auto-cols-max rounded-sm overflow-x-auto pr-14 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <li
            className={`px-4 py-1 m-1 cursor-pointer rounded transition-colors ${
              selectedCategory === null
                ? 'bg-black dark:bg-[var(--primary)] text-white dark:text-zinc-900'
                : 'hover:bg-black hover:text-white dark:hover:bg-[var(--primary)] dark:hover:text-zinc-900'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <span>全部</span>
          </li>
          {categories.map((cat, index) => (
            <li
              key={index}
              className={`px-4 py-1 m-1 cursor-pointer rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-black dark:bg-[var(--primary)] text-white dark:text-zinc-900'
                  : 'hover:bg-black hover:text-white dark:hover:bg-[var(--primary)] dark:hover:text-zinc-900'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
            </li>
          ))}
        </ul>

        {/* 滚动按钮 */}
        {hasScroll && (
          <div
            className="h-full w-14 flex justify-center items-center bg-gradient-to-l from-80%
                     from-white dark:from-zinc-900 absolute right-0 top-0 text-xl cursor-pointer"
            onClick={handleScrollClick}
          >
            <i className={scrollIcon} />
          </div>
        )}
      </div>

      {/* 文章列表 */}
      <div className="px-8 w-full flex flex-wrap flex-auto max-lg:block max-lg:pr-0 max-lg:pl-6">
        {posts.map((post, index) => {
          const hasCoverAndDesc = post.cover && post.description
          const isLongDesc = (post.description?.length || 0) > 80

          return (
            <div
              key={post.id}
              className={`basis-1/2 flex-grow-0 flex-shrink group cursor-pointer my-1 max-lg:my-8 ${
                hasCoverAndDesc || isLongDesc ? 'basis-full' : ''
              }`}
            >
              {/* 有封面和描述的大卡片 */}
              {hasCoverAndDesc ? (
                <div className="w-full h-full text-white max-lg:-mx-6 max-lg:w-auto">
                  <div className="relative z-0 flex py-4 before:bg-black before:opacity-40 before:absolute before:-z-1 before:inset-0">
                    <div className="flex flex-col justify-center w-full">
                      <div className="px-2 my-2 grid grid-cols-12 max-lg:px-0">
                        <div className="col-span-12 px-5 grid relative">
                          <h1 className="text-xl font-black group-hover:underline self-start">
                            <Link href={`/posts/${post.slug}`}>
                              {post.title || '未命名文档'}
                            </Link>
                          </h1>
                          <div className="text-sm py-2">{post.description}</div>
                          <div className="text-xs text-zinc-300 self-end">
                            <span className="text-[var(--primary)]">
                              {formatRelativeTime(post.date)}
                            </span>
                            <span> / </span>
                            <i className="ri-pen-nib-line"></i>
                            <span>{post.author}</span>
                            {post.tags && post.tags.length > 0 && (
                              <>
                                <span> / </span>
                                <i className="ri-hashtag"></i>
                                {post.tags.map((tag, tIndex) => (
                                  <span key={tIndex} className="mx-1 opacity-70 underline">
                                    {tag}
                                  </span>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-full h-full absolute overflow-hidden pointer-events-none -z-3 top-0 left-0"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                    >
                      <img
                        alt={post.title || '未命名文档'}
                        src={post.cover}
                        className="object-cover object-center max-w-none w-full h-full overflow-hidden pointer-events-none blur-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* 普通卡片 */
                <div className={`px-2 my-2 grid ${isLongDesc ? 'grid-cols-12 lg:!grid-cols-6' : 'grid-cols-6'} lg:px-0 group/img`}>
                  <div className="col-span-1 relative aspect-square">
                    <div className="w-full h-full border border-gray-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 overflow-hidden relative">
                      <div className="w-full h-full flex items-center justify-center">
                        <div>
                          <div className="text-2xl font-black text-center">
                            {new Date(post.date).getDate().toString().padStart(2, '0')}
                          </div>
                          <div className="text-xs text-center">
                            {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      {post.cover && (
                        <img
                          alt={post.title || '未命名文档'}
                          src={post.cover}
                          className="w-full h-full object-cover absolute top-[100%] group-hover/img:top-0
                                   transition-[top] duration-500"
                        />
                      )}
                    </div>
                  </div>
                  <div className={`px-5 grid ${isLongDesc ? 'col-span-11 max-lg:!col-span-5' : 'col-span-5'}`}>
                    <h1 className="text-xl font-black group-hover:underline self-start">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title || '未命名文档'}
                      </Link>
                    </h1>
                    {post.description && (
                      <div className="text-sm py-2">{post.description}</div>
                    )}
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 self-end">
                      <span className="text-[var(--primary)]">
                        {formatRelativeTime(post.date)}
                      </span>
                      <span> / </span>
                      <i className="ri-pen-nib-line"></i>
                      <span>{post.author}</span>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span> / </span>
                          <i className="ri-hashtag"></i>
                          {post.tags.map((tag, tIndex) => (
                            <span key={tIndex} className="mx-1 opacity-70 underline">
                              {tag}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 分页信息 */}
      <div className="px-8 pt-8 flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400">
        共有 {totalPosts} 篇文章
      </div>
    </div>
  )
}
