<template>
  <!--  默认左侧侧边栏-->
  <header class="heti--sans md:hidden pt-2 pb-16 px-[--h-margin] h-full w-[--side-width] fixed overflow-auto
                 bg-white dark:bg-zinc-950 text-gray-700 dark:text-gray-200 text-sm select-none">
    <div class="animate-default-left-in">
      <div class="w-full mx-0 my-8">
        <router-link to="/">
          <div class="flex flex-col items-center justify-center">
            <h1 class="site-title heti--serif heti--vertical text-3xl leading-none relative before:absolute before:block
                        before:w-2 before:h-2 before:top-0 before:-right-2 before:rounded before:border-default-theme-primary
                        before:border-2 before:border-solid before:bg-default-theme-primary break-all">
              {{ siteTitle }}
            </h1>
            <p v-if="headerConfig?.description?.type !== 'image'" class="px-1.5 text-white mt-2 text-xs bg-default-theme-primary">
              {{ headerConfig?.description?.type !== 'subtitle' ? subTitle : headerConfig?.description?.content }}
            </p>
            <img v-else alt="description" :src="headerConfig?.description?.content" class="px-1.5 mt-2 w-4/5" />
          </div>
        </router-link>
      </div>
      <div class="hidden">{{ description }}</div>
      <nav class="mb-12 select-none">
        <ul class="list-none flex flex-col p-0 m-0">
          <template v-for="(item, index) in navItems" :key="index">
            <li v-if="item.group" class="pt-10 pb-1 m-0 order-2 text-left font-bold text-xs text-default-theme-primary">{{ item.name }}</li>
            <li v-else class="p-0 m-0 order-2">
              <router-link
                  v-if="item.url[0] === '/'"
                  :to="item.url"
                  class="cursor-hover-item no-underline flex items-center my-3 leading-none touch-manipulation
                         after:content-[''] after:flex-grow after:ml-1 after:inline-block after:h-px after:dark:border-zinc-800
                         after:border-b after:border-dashed after:border-gray-200 after:hover:border-solid
                         hover:text-default-theme-primary hover:after:border-default-theme-primary">
                <i :class="item.icon" class="text-xl leading-none w-5 h-5 relative"></i>
                <span class="pr-2 pl-1.5 leading-6 h-6">{{ item.title }}</span>
              </router-link>
              <a
                  v-else
                  :href="item.url"
                  target="_blank"
                  data-cursor-text="点击跳转 →"
                  class="cursor-hover-item no-underline flex items-center my-3 leading-none touch-manipulation after:dark:border-zinc-800
                         after:content-[''] after:flex-grow after:ml-1 after:inline-block after:h-px
                         after:border-b after:border-dashed after:border-gray-200 after:hover:border-solid
                         hover:text-default-theme-primary hover:after:border-default-theme-primary">
                <i :class="item.icon" class="text-xl leading-none w-5 h-5 relative"></i>
                <span class="pr-2 pl-1.5 leading-6 h-6">{{ item.title }}</span>
              </a>
            </li>
          </template>
        </ul>
        <div class="py-5 w-full">
          <NButton
              type="primary"
              block
              class="!w-full cursor-hover-item"
              :data-cursor-text="`你好，欢迎来到${siteTitle}！`"
              data-cursor-text-repeat="2"
          >
            <template #icon>
              <i class="ri-login-box-line" />
            </template>
            <span class="leading-[normal]">登录&nbsp;&nbsp;/&nbsp;&nbsp;注册</span>
          </NButton>
        </div>
      </nav>
    </div>
  </header>
  <!--  手机顶部导航栏-->
  <div class="md:flex hidden bg-default-theme-primary w-full h-12 fixed transition-all duration-[--duration] ease-[--curve]
              z-9999 left-0 -top-px justify-between items-center select-none dark:bg-black">
    <div class="shrink grow basis-auto h-full text-left ml-3 mr-12 max-w-[50%] overflow-hidden flex justify-start items-center no-underline">
      <router-link to="/" class="shrink-0">
        <div v-if="headerConfig.showTitle || headerConfig.showLogo" class="heti--serif font-bold text-white text-lg relative flex items-center after:absolute
                    after:w-1 after:h-1 after:top-1 after:-right-1 after:rounded after:border-white
                    after:border after:border-solid after:bg-white">
          <template v-if="headerConfig.showLogo">
            <div v-if="logo.startsWith('ri-')" class="w-8 h-8 text-6 flex items-center justify-center font-normal">
              <i :class="logo" />
            </div>
            <div v-else class="h-8">
              <img alt="logo" :src="logo" class="h-full" />
            </div>
          </template>
          <div v-if="headerConfig.showTitle" class="pl-1 leading-[normal]">{{ siteTitle }}</div>
        </div>
      </router-link>
    </div>
    <div class="flex shrink-0 grow-0 basis-auto px-5 h-full items-center text-2xl text-right text-white font-normal
                transition-all duration-[--duration] ease-[--curve] cursor-pointer"
         @mouseover="onMouseEnterToggle"
         @mouseleave="onMouseLeaveToggle"
         @click="toggleSidebar"
    >
      <i :class="toggleIcon"></i>
    </div>
  </div>
  <!--  左侧侧边栏功能按钮-->
  <nav class="md:hidden bg-white bg-curve-pattern dark:bg-zinc-950 text-gray-700 dark:text-gray-200 -bottom-px select-none
              my-[--mask-width] p-2 h-16 w-[--side-width] fixed">
    <ul class="w-full h-full flex gap-4 items-center justify-center">
      <li class="blog-button-sm" title="搜索" @click="button.trigger">
        <i class="ri-search-2-line"></i>
      </li>
      <li class="blog-button-sm" title="language" @click="button.trigger">
        <i class="ri-translate-2"></i>
      </li>
      <li class="blog-button-sm" title="亮色/暗色模式" @click="toggleDarkMode()">
        <i class="ri-contrast-line"></i>
      </li>
      <li class="blog-button-sm" title="主题色" @click="button.trigger">
        <i class="ri-t-shirt-2-line"></i>
      </li>
    </ul>
  </nav>
  <!--  手机右侧侧边栏-->
  <div class="hidden md:block bg-default-theme-primary bg-opacity-60 select-none">
    <!--    mask-->
    <div
        ref="maskRef"
        class="hidden z-99999 fixed w-full h-full bg-default-theme-primary dark:bg-black bg-opacity-60
                left-0 top-0 backdrop-saturate-[1.8] backdrop-blur-[20px] animate-default-show-off"
        @click="toggleSidebar"
    ></div>
    <!--    sidebar-->
    <div ref="sidebarRef" class="heti--sans hidden fixed top-0 -right-72 overflow-y-auto overflow-x-hidden w-72 h-full
              bg-white z-999999 shadow-type1 transition-all duration-500 dark:bg-zinc-900 opacity-80 text-gray-700
              dark:text-gray-200">
      <section>
        <!-- 标题 -->
        <div class="search-box bg-white dark:bg-zinc-900 w-full h-14 leading-[normal] py-3 px-5 sticky top-0 left-0 z-1">
          <h1 class="site-title heti--serif text-center text-3xl leading-none relative break-all">
            {{ siteTitle }}
          </h1>
        </div>
        <div class="sticky top-14 inset-x-0 w-full h-8 bg-gradient-to-b from-white pointer-events-none z-1 dark:from-zinc-900"></div>
        <!-- description/logo -->
        <div class="mx-auto mb-2 w-4/5 text-center items-center justify-center flex">
          <p v-if="headerConfig?.description?.type !== 'image'" class="px-1.5 text-white text-xs bg-default-theme-primary">
            {{ headerConfig?.description?.type !== 'subtitle' ? subTitle : headerConfig?.description?.content }}
          </p>
          <img v-else alt="description" :src="headerConfig?.description?.content" class="px-1.5 w-1/2" />
        </div>
        <!-- 功能按钮 -->
        <div class="w-full px-5">
          <ul class="w-full h-full flex gap-4 items-center justify-center">
            <li class="blog-button-lg" title="搜索" @click="button.trigger">
              <i class="ri-search-2-line"></i>
            </li>
            <li class="blog-button-lg" title="language" @click="button.trigger">
              <i class="ri-translate-2"></i>
            </li>
            <li class="blog-button-lg" title="亮色/暗色模式" @click="toggleDarkMode()">
              <i class="ri-contrast-line"></i>
            </li>
            <li class="blog-button-lg" title="主题色" @click="button.trigger">
              <i class="ri-t-shirt-2-line"></i>
            </li>
          </ul>
        </div>
        <!-- 菜单 -->
        <nav class="w-full py-3 px-5">
          <ul class="list-none p-0 m-0 grid grid-cols-2 gap-2">
            <template v-for="(item, index) in navItems" :key="index">
              <li v-if="item.group" class="pt-10 pb-1 m-0 order-2 text-left font-bold text-xs text-default-theme-primary col-span-2">{{ item.name }}</li>
              <li v-else class="px-2 py-3 m-0 order-2 bg-gray-100 dark:bg-zinc-950 dark:bg-opacity-20 rounded">
                <router-link
                    v-if="item.url[0] === '/'"
                    :to="item.url"
                    class="no-underline grid grid-cols-1 leading-none touch-manipulation text-center dark:text-gray-400
                         hover:text-default-theme-primary hover:dark:text-white hover:after:border-default-theme-primary">
                  <i :class="item.icon" class="text-3xl leading-none w-full relative"></i>
                  <span class="pr-2 pl-1.5 leading-6 h-6 text-xs">{{ item.title }}</span>
                </router-link>
                <a
                    v-else
                    :href="item.url"
                    target="_blank"
                    class="no-underline grid grid-cols-1 leading-none touch-manipulation text-center dark:text-gray-400
                         hover:text-default-theme-primary hover:dark:text-white hover:after:border-default-theme-primary">
                  <i :class="item.icon" class="text-3xl leading-none w-full relative"></i>
                  <span class="pr-2 pl-1.5 leading-6 h-6 text-xs">{{ item.title }}</span>
                </a>
              </li>
            </template>
          </ul>
        </nav>
        <div class="sticky bottom-32 inset-x-0 w-full h-8 bg-gradient-to-t from-white z-2 dark:from-zinc-900"></div>
        <!-- 头像框 -->
        <div class="sticky bottom-0 inset-x-0 w-full h-32 p-5 flex items-center z-1">
          <img class="absolute bottom-0 inset-x-0 w-full h-full object-cover dark:brightness-75" alt="user-bg" src="~assets/image/default/user-bg.png" />
          <div class="absolute top-0 inset-x-0 w-full h-1/3 bg-gradient-to-b from-white dark:to-0%"></div>
          <n-avatar :size="64" round :src="userDefaultImage" class="hover:animate-bounce animate-none" />
          <div class="w-1/2 mx-auto bg-default-theme-primary">
            <NButton type="primary" block class="!w-full">
              <template #icon>
                <i class="ri-login-box-line" />
              </template>
              <span class="leading-[normal]">登录&nbsp;&nbsp;/&nbsp;&nbsp;注册</span>
            </NButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import userDefaultImage from '~/assets/image/default/user-avatar-1.jpg'

const props = defineProps({
  siteTitle: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  pageTitle: {
    type: String,
    default: ''
  },
  navItems: {
    type: Object,
    default: () => []
  },
  logo: {
    type: String,
    default: ''
  },
  headerConfig: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const sidebarRef = ref()
const maskRef = ref()
const toggleDarkMode = inject('toggleDarkMode')

const toggleIcon = ref('ri-menu-3-line')

const onMouseEnterToggle = () => {
  toggleIcon.value = 'ri-menu-line'
}

const onMouseLeaveToggle = () => {
  toggleIcon.value = 'ri-menu-3-line'
}

const toggleSidebar = () => {
  const isHidden = sidebarRef.value.classList.contains('hidden')
  if (isHidden) {
    sidebarRef.value.classList.remove('hidden')
    document.documentElement.style.overflow = 'hidden'
    setTimeout(() => {
      maskRef.value.classList.remove('hidden')
      maskRef.value.style = 'animation: default-show-off 0.5s ease 0s 1 normal none running;'
      sidebarRef.value.style = 'right: 0;'
    }, 10)
  } else {
    maskRef.value.style = 'animation: default-hide-off 0.5s ease 0s 1 normal none running;'
    sidebarRef.value.style = 'right: -18rem;'
    document.documentElement.style.overflow = 'auto'
    setTimeout(() => {
      maskRef.value.classList.add('hidden')
      sidebarRef.value.classList.add('hidden')
    }, 450)
  }
}
</script>

<style>
.blog-button {
  @apply text-gray-700 cursor-pointer dark:bg-opacity-20 dark:text-gray-200;
  @apply hover:bg-default-theme-primary hover:text-white hover:dark:bg-default-theme-primary hover:dark:text-white;
  @apply flex items-center justify-center rounded-sm;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;
}
.blog-button-sm {
  @apply bg-white dark:bg-zinc-950 blog-button w-6 h-6;
}

.blog-button-lg {
  @apply bg-gray-100 dark:bg-zinc-950 blog-button w-12 h-12;
}
</style>
