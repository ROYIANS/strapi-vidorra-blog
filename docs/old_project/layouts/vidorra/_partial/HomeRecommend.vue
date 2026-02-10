<template>
  <div class="p-4 w-full">
    <n-alert class="mb-2" v-if="announcement.enable" :title="announcement.title" :type="announcement.type || 'default'" :closable="announcement.closable">
      <template #icon>
        <n-icon>
          <i :class="announcement.icon || 'ri-planet-line'"></i>
        </n-icon>
      </template>
      {{ announcement.content }}
    </n-alert>
    <div class="grid grid-cols-3 grid-flow-row-dense lg:block gap-4 overflow-hidden h-96 lg:h-auto">
      <section class="order-2 col-span-2 overflow-hidden border-black border-2 dark:border-default-theme-primary-dark-200 h-full">
        <n-carousel show-arrow autoplay draggable>
          <div v-for="(post, index) in totalStickyPosts" :key="index" class="w-full h-full relative group">
            <img
                class="w-full h-full lg:h-auto lg:aspect-video object-cover"
                :alt="post.title"
                :src="post.cover"
            />
            <div class="heti--sans p-2 cursor-pointer absolute lg:relative lg:w-full lg:from-transparent
                        left-0 bottom-0 bg-gradient-to-t from-zinc-800 from-5% dark:lg:bg-transparent lg:text-inherit
                        text-white w-full">
              <div class="text-xs p-1">{{ post?.categories?.map(c => c.name).join('  /  ') }}</div>
              <div class="cursor-hover-item text-4xl font-black tracking-tighter uppercase hover:underline">
                <NuxtLink :to="`/p/${post.uniqueId}`">
                  {{ post.title || '未命名文档' }}
                </NuxtLink>
              </div>
              <div class="text-sm mt-4 heti--serif leading-tight group-hover:scale-y-100 lg:block
                          grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                <div class="overflow-hidden">
                  <span>{{ post.description }}</span>
                </div>
              </div>
              <div class="text-xs pt-2 px-1">{{ post?.author || siteInfo.author }}</div>
            </div>
          </div>
          <template #arrow="{ prev, next }">
            <div class="flex absolute bottom-0 right-0">
              <button type="button" class="inline-flex items-center justify-center w-8 h-8 text-white bg-black dark:bg-default-theme-primary transition-all cursor-pointer" @click="prev">
                <n-icon>
                  <i class="ri-arrow-left-line"></i>
                </n-icon>
              </button>
              <button type="button" class="inline-flex items-center justify-center w-8 h-8 text-white bg-black dark:bg-default-theme-primary transition-all cursor-pointer" @click="next">
                <n-icon>
                  <i class="ri-arrow-right-line"></i>
                </n-icon>
              </button>
            </div>
          </template>
          <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
              <li
                  v-for="index of total"
                  :key="index"
                  :class="{ ['is-active']: currentIndex === index - 1 }"
                  @click="to(index - 1)"
              />
            </ul>
          </template>
        </n-carousel>
      </section>
      <n-scrollbar>
        <section class="order-1 col-span-1 overflow-auto xl:pt-4 pb-16">
          <div class="w-max h-8 p-2">
            <div class="w-full h-full z-0 relative after:w-full after:h-1/2 after:bg-default-theme-primary-300 dark:after:bg-default-theme-primary-dark-600 after:absolute after:top-2/3 after:-right-1/3 after:-z-1">Recommend.</div>
          </div>
          <template v-for="(post, index) in topFivePosts">
            <div
                class="w-full px-4 grid grid-cols-3 group"
                :class="index === 0 ? '' : 'border-t dark:border-t-zinc-800'"
            >
              <div
                  class="overflow-hidden py-2"
                  :class="post.cover ? 'col-span-2' : 'col-span-3'"
              >
                <div class="cursor-hover-item font-bold text-2xl cursor-pointer hover:underline self-start">
                  <NuxtLink :to="`/p/${post.uniqueId}`">
                    {{ post.title || '未命名文档' }}
                  </NuxtLink>
                </div>
                <div v-if="post.description" class="heti--serif text-sm py-2 flex">
                  <n-ellipsis :line-clamp="4" :tooltip="false">
                    {{ post.description || '' }}
                  </n-ellipsis>
                </div>
                <div class="flex justify-start items-center self-end">
                  <span class="text-xs" :title="$dayjs(post.date).format('YYYY-MM-DD HH:mm:ss')">{{ $dayjs(post.date || $dayjs()).fromNow() }}</span>
                  <span class="mx-1 w-1 h-1 bg-gray-400 inline-block rounded-full"></span>
                  <span class="text-xs">{{ post.author || siteInfo.author }}</span>
                </div>
              </div>
              <div v-if="post.cover" class="overflow-hidden my-2 ml-2 cursor-pointer">
                <img :alt="post.title" :src="post.cover" class="w-full h-full object-cover grayscale group-hover:filter-none group-hover:scale-125 transition-all duration-1000" />
              </div>
            </div>
          </template>
          <div class="absolute w-full bottom-0 bg-white dark:bg-zinc-900">
            <div class="lg:hidden bg-gradient-to-t from-white dark:from-zinc-900 w-full absolute -top-6 left-0 h-6"></div>
            <div
                data-cursor-text="查看更多推荐"
                class="cursor-hover-item bg-black dark:bg-default-theme-primary text-base text-white
                       dark:text-zinc-900 w-max px-5 py-1 ml-2 my-2 cursor-pointer rounded"
            >
              <NuxtLink to="/p/1421450">
                <span class="pr-2">更多推荐</span>
              </NuxtLink>
              <i class="ri-arrow-right-line"></i>
            </div>
          </div>
        </section>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import useHexoData from "~/hooks/useHexoData";

const hexo = await useHexoData()

const siteInfo = hexo.getSiteConfig()
const postsList = hexo.getPostList()
const themeConfig = hexo.getThemeConfig()

const dayjs = useDayjs()

const announcement = themeConfig?.announcement
const stickyThread = themeConfig?.home.stickyThread || []

const stickyPosts = postsList?.filter(item => item.sticky) || []

postsList?.sort((a, b) => {
  const aDate = a.date
  const bDate = b.date
  return dayjs(aDate).isAfter(dayjs(bDate)) ? -1 : 1
})

const stickyThreadPosts: any[] = []

for (let thread of stickyThread) {
  const id = thread.uniqueId
  const findPost = postsList?.find(item => {
    return item.uniqueId === id;
  }) || {}
  stickyThreadPosts.push({
    ...findPost,
    ...thread
  })
}

let totalStickyPosts = ref([...stickyThreadPosts, ...stickyPosts])

if (totalStickyPosts.value.length === 0) {
  totalStickyPosts.value = postsList?.slice(0, 3) || []
}

const topFivePosts = postsList?.filter(item => {
  return item.recommend
}).slice(0, 5)
</script>

<style>
.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
