import Link from 'next/link'
import { fetchPosts, fetchStickyPosts, fetchCategories } from '@/services'
import { HomePostList } from '@/components/home/HomePostList'
import { HomeSidebarAuthor } from '@/components/home/HomeSidebarAuthor'
import { HomeSidebarMood } from '@/components/home/HomeSidebarMood'
import { HomeSidebarWeather } from '@/components/home/HomeSidebarWeather'
import { HomeSidebarTag } from '@/components/home/HomeSidebarTag'
import { HomeRecommend } from '@/components/home/HomeRecommend'

export default async function Home() {
  const [postsData, stickyPosts, categories] = await Promise.all([
    fetchPosts(1, 10),
    fetchStickyPosts(),
    fetchCategories(),
  ])

  // 公告配置
  const announcement = {
    enable: true,
    title: '欢迎来到小梦岛',
    content: '您现在看到的是博客新主题，目前仍然在开发中，目前首页和博文页以及友链基本能完毕，请关注项目进展：https://github.com/ROYIANS/hexo-theme-vidorra',
    type: 'default' as const,
    icon: 'ri-error-warning-line',
    closable: true,
  }

  return (
    <div className="flex flex-wrap items-stretch max-xl:block p-5 gap-4 max-md:p-2">
      {/* 主内容区 - 左侧 2/3 */}
      <section className="order-1 grow shrink-0 basis-2/3 h-auto relative overflow-x-hidden">
        {/* Recommend Area */}
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200 relative dark:border-zinc-800 bg-opacity-80">
          <HomeRecommend posts={stickyPosts} announcement={announcement} />
        </div>

        {/* Post List */}
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200 relative dark:border-zinc-800 bg-opacity-80 mt-3">
          <HomePostList
            posts={postsData.posts}
            categories={categories}
            totalPosts={postsData.total}
          />
        </div>
      </section>

      {/* 右侧侧边栏 - 1/5 */}
      <section className="order-2 grow-0 shrink basis-1/5 sticky h-max top-5 max-xl:relative max-xl:top-0 max-xl:mt-4">
        <HomeSidebarAuthor />
        <HomeSidebarMood />
        <HomeSidebarWeather />
        <HomeSidebarTag />
      </section>
    </div>
  )
}
