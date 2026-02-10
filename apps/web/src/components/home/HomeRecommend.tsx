'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostSummary } from '@vidorra/types'

interface HomeRecommendProps {
  posts: PostSummary[]
}

/**
 * HomeRecommend - 首页推荐区域
 * 左侧：置顶文章轮播
 * 右侧：推荐文章列表
 */
export function HomeRecommend({ posts }: HomeRecommendProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-3 grid-flow-row-dense lg:block gap-4 overflow-hidden h-96 lg:h-auto">
        {/* 轮播区域 */}
        <section className="order-2 col-span-2 overflow-hidden border-2 border-black dark:border-zinc-700 h-full relative">
          <div className="w-full h-full relative group">
            <img
              className="w-full h-full lg:h-auto lg:aspect-video object-cover"
              alt={currentPost.title}
              src={currentPost.cover}
            />
            <div className="p-2 cursor-pointer absolute lg:relative lg:w-full lg:from-transparent
                          left-0 bottom-0 bg-gradient-to-t from-zinc-800 from-5% dark:lg:bg-transparent
                          lg:text-inherit text-white w-full">
              <div className="text-xs p-1">{currentPost.category || '未分类'}</div>
              <div className="text-4xl font-black tracking-tighter uppercase hover:underline">
                <Link href={`/posts/${currentPost.slug}`}>
                  {currentPost.title || '未命名文档'}
                </Link>
              </div>
              <div className="text-sm mt-4 leading-tight group-hover:scale-y-100 lg:block
                            grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                <div className="overflow-hidden">
                  <span>{currentPost.description}</span>
                </div>
              </div>
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
                  <i className="ri-arrow-left-line"></i>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 text-white bg-black
                           dark:bg-[var(--primary)] transition-all cursor-pointer hover:opacity-80"
                  onClick={handleNext}
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>

              {/* 轮播指示器 */}
              <ul className="flex absolute top-5 right-5 z-10 gap-1">
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

        {/* 推荐列表 */}
        <section className="order-1 col-span-1 overflow-auto xl:pt-4 pb-16 relative">
          <div className="w-max h-8 p-2 mb-4">
            <div className="w-full h-full z-0 relative after:w-full after:h-1/2
                          after:bg-[var(--primary)] after:opacity-30 dark:after:opacity-20
                          after:absolute after:top-2/3 after:-right-1/3 after:-z-1">
              Recommend.
            </div>
          </div>

          {recommendList.map((post, index) => (
            <div
              key={post.id}
              className={`w-full px-4 grid grid-cols-3 group ${
                index === 0 ? '' : 'border-t dark:border-t-zinc-800'
              }`}
            >
              <div
                className={`overflow-hidden py-2 ${
                  post.cover ? 'col-span-2' : 'col-span-3'
                }`}
              >
                <div className="font-bold text-2xl cursor-pointer hover:underline self-start">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title || '未命名文档'}
                  </Link>
                </div>
                {post.description && (
                  <div className="text-sm py-2 flex line-clamp-4">
                    {post.description}
                  </div>
                )}
                <div className="flex justify-start items-center self-end text-xs text-zinc-600 dark:text-zinc-400">
                  <span title={new Date(post.date).toLocaleString()}>
                    {new Date(post.date).toLocaleDateString('zh-CN')}
                  </span>
                  <span className="mx-1 w-1 h-1 bg-gray-400 inline-block rounded-full"></span>
                  <span>{post.author}</span>
                </div>
              </div>
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
      </div>
    </div>
  )
}
