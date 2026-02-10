import Link from 'next/link'
import { fetchPosts, fetchStickyPosts, fetchCategories } from '@/services'
import { HomePostList } from '@/components/home/HomePostList'
import { HomeSidebarAuthor } from '@/components/home/HomeSidebarAuthor'
import { HomeRecommend } from '@/components/home/HomeRecommend'

export default async function Home() {
  const [postsData, stickyPosts, categories] = await Promise.all([
    fetchPosts(1, 10),
    fetchStickyPosts(),
    fetchCategories(),
  ])

  return (
    <div className="flex flex-wrap items-stretch p-5 gap-4 max-md:p-2 max-md:block">
      {/* Main Content */}
      <section className="order-1 grow shrink-0 basis-2/3 h-auto relative overflow-x-hidden max-xl:w-full max-xl:basis-full">
        {/* Recommend Area */}
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border relative dark:border-zinc-800 bg-opacity-80">
          <HomeRecommend posts={stickyPosts} />
        </div>

        {/* Post List */}
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border relative dark:border-zinc-800 bg-opacity-80 mt-3">
          <HomePostList
            posts={postsData.posts}
            categories={categories}
            totalPosts={postsData.total}
          />
        </div>
      </section>

      {/* Sidebar Widgets */}
      <section className="order-2 grow-0 shrink basis-1/5 sticky h-max top-5 max-xl:relative max-xl:top-0 max-xl:mt-4">
        <HomeSidebarAuthor />
      </section>
    </div>
  )
}
