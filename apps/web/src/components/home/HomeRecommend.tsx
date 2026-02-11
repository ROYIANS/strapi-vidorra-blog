'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostSummary } from '@vidorra/types'

interface HomeRecommendProps {
  posts: PostSummary[]
  announcement?: {
    enable: boolean
    title: string
    content: string
    type?: 'info' | 'success' | 'warning' | 'error' | 'default'
    icon?: string
    closable?: boolean
  }
}

/**
 * HomeRecommend - 首页推荐区域
 * 精准复刻 old_project/layouts/vidorra/_partial/HomeRecommend.vue
 */
export function HomeRecommend({ posts, announcement }: HomeRecommendProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  // 轮播文章（有封面的置顶文章）
  const carouselPosts = posts.filter(p => p.cover).slice(0, 3)
  // 推荐列表（前5篇）
  const recommendList = posts.slice(0, 5)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselPosts.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === carouselPosts.length - 1 ? 0 : prev + 1))
  }

  if (carouselPosts.length === 0) {
    return null
  }

  const currentPost = carouselPosts[currentIndex]

  // Announcement颜色映射
  const announcementColors = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    default: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
  }

  return (
    <div className="p-4 w-full">
      {/* 公告组件 */}
      {announcement?.enable && showAnnouncement && (
        <div className={`mb-2 p-3 rounded border ${announcementColors[announcement.type || 'default']} relative`}>
          <div className="flex items-start gap-2">
            {announcement.icon && (
              <i className={`${announcement.icon} text-lg mt-0.5`} />
            )}
            <div className="flex-1">
              {announcement.title && (
                <div className="font-bold text-sm mb-1">{announcement.title}</div>
              )}
              <div className="text-sm">{announcement.content}</div>
            </div>
            {announcement.closable && (
              <button
                onClick={() => setShowAnnouncement(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <i className="ri-close-line" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 推荐区域：3列网格布局，大屏变block */}
      <div className="grid grid-cols-3 grid-flow-row-dense max-lg:block gap-4 overflow-hidden h-96 max-lg:h-auto">
        {/* 推荐列表 - order-1，占1列，在左边 */}
        <section className="order-1 col-span-1 overflow-auto hover-scrollbar max-xl:pt-4 pb-16 relative">
          {/* Recommend 标题 */}
          <div className="w-max h-8 p-2 mb-4">
            <div className="w-full h-full z-0 relative after:w-full after:h-1/2
                          after:bg-[#c8d7c2] dark:after:bg-[#304128]
                          after:absolute after:top-2/3 after:-right-1/3 after:-z-1">
              Recommend.
            </div>
          </div>

          {/* 推荐文章列表 */}
          {recommendList.map((post, index) => (
            <div
              key={post.id}
              className={`w-full px-4 grid grid-cols-3 group ${
                index === 0 ? '' : 'border-t dark:border-t-zinc-800'
              }`}
            >
              {/* 文字区域 */}
              <div
                className={`overflow-hidden py-2 ${
                  post.cover ? 'col-span-2' : 'col-span-3'
                }`}
              >
                {/* 标题 */}
                <div className="font-bold text-2xl cursor-pointer hover:underline self-start">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title || '未命名文档'}
                  </Link>
                </div>

                {/* 描述 */}
                {post.description && (
                  <div className="font-serif text-sm py-2 flex line-clamp-4">
                    {post.description}
                  </div>
                )}

                {/* 元信息 */}
                <div className="flex justify-start items-center self-end text-xs">
                  <span title={new Date(post.date).toLocaleString()}>
                    {new Date(post.date).toLocaleDateString('zh-CN')}
                  </span>
                  <span className="mx-1 w-1 h-1 bg-gray-400 inline-block rounded-full" />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* 封面图 */}
              {post.cover && (
                <div className="overflow-hidden my-2 ml-2 cursor-pointer">
                  <img
                    alt={post.title}
                    src={post.cover}
                    className="w-full h-full object-cover grayscale group-hover:filter-none
                             group-hover:scale-125 transition-all duration-1000"
                  />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* 轮播区域 - order-2，占2列，在右边 */}
        <section className="order-2 col-span-2 overflow-hidden border-black border-2 dark:border-[#567647] h-full">
          <div className="w-full h-full relative group">
            {/* 轮播图片 */}
            <img
              className="w-full h-full max-lg:h-auto max-lg:aspect-video object-cover"
              alt={currentPost.title}
              src={currentPost.cover}
            />

            {/* 文字叠加层 */}
            <div className="p-2 cursor-pointer absolute max-lg:relative max-lg:w-full max-lg:from-transparent
                          left-0 bottom-0 bg-gradient-to-t from-zinc-800 from-5% dark:max-lg:bg-transparent
                          max-lg:text-inherit text-white w-full">
              {/* 分类 */}
              <div className="text-xs p-1">{currentPost.category || '未分类'}</div>

              {/* 标题 */}
              <div className="text-4xl font-black tracking-tighter uppercase hover:underline">
                <Link href={`/posts/${currentPost.slug}`}>
                  {currentPost.title || '未命名文档'}
                </Link>
              </div>

              {/* 描述 - hover展开 */}
              <div className="text-sm mt-4 font-serif leading-tight group-hover:scale-y-100 max-lg:block
                            grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                <div className="overflow-hidden">
                  <span>{currentPost.description}</span>
                </div>
              </div>

              {/* 作者 */}
              <div className="text-xs pt-2 px-1">{currentPost.author}</div>
            </div>
          </div>

          {/* 轮播控制按钮 */}
          {carouselPosts.length > 1 && (
            <>
              <div className="flex absolute bottom-0 right-0 z-10">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 text-white bg-black
                           dark:bg-[var(--primary)] transition-all cursor-pointer hover:opacity-80"
                  onClick={handlePrev}
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 text-white bg-black
                           dark:bg-[var(--primary)] transition-all cursor-pointer hover:opacity-80"
                  onClick={handleNext}
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>

              {/* 轮播指示器（自定义样式） */}
              <ul className="custom-dots flex absolute top-5 right-5 z-10 gap-1">
                {carouselPosts.map((_, index) => (
                  <li
                    key={index}
                    className={`h-1 rounded cursor-pointer transition-all duration-300 ${
                      currentIndex === index
                        ? 'w-10 bg-white'
                        : 'w-3 bg-white/40'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
