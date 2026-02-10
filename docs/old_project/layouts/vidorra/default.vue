<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="curTheme">
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-mt
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      top-0 w-full left-0 h-[--mask-width]"></div>
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-mb
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      bottom-0 w-full left-0 h-[--mask-width]"></div>
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-ml
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      left-0 w-[--mask-width] bottom-0 h-[80vh]"></div>
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-mr
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      right-0 w-[--mask-width] bottom-0 h-[80vh]"></div>
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-ml
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      left-0 top-0 w-[--mask-width] h-[80vh]"></div>
    <div class="fixed z-999 bg-default-theme-sideline pointer-events-none animate-default-mask-mr
      border-solid border-default-theme-sideline border-[length:--mask-border-width] dark:bg-black dark:border-black
      right-0 top-0 w-[--mask-width] h-[80vh]"></div>
    <Header :site-title="siteTitle" :page-title="pageTitle" :nav-items="navItems" :sub-title="subTitle"
            :description="description" :logo="logoURI" :header-config="headerConfig"/>
    <main class="relative md:min-h-40 min-h-[--content-min-h] ml-[--side-width] bg-default-theme-background dark:bg-zinc-900
               md:mt-12 md:pr-0 md:pl-0 md:pt-0 md:block p-2 [&:has(.main-content)]:p-0"
          style="box-shadow: rgba(0, 0, 0, 0.05) 0 1px 2px 0;">
      <div class="hidden dark:block absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
        <svg class="absolute top-0 right-0" width="219" height="147" viewBox="0 0 219 147" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.18" x="10.4252" y="75.8326" width="7.50168" height="7.50168" transform="rotate(110.283 10.4252 75.8326)" fill="#686868" stroke="white" stroke-width="1.22683"></rect>
          <rect opacity="0.18" x="180.869" y="138.825" width="7.50168" height="7.50168" transform="rotate(110.283 180.869 138.825)" fill="#686868" stroke="white" stroke-width="1.22683"></rect>
          <rect x="69.4713" y="-91.84" width="180.485" height="180.485" transform="rotate(20.2832 69.4713 -91.84)" stroke="white" stroke-opacity="0.1" stroke-width="1.22683"></rect>
        </svg>
        <svg class="absolute bottom-0 left-0" width="232" height="191" viewBox="0 0 232 191" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50.5685" cy="172.432" r="112.068" stroke="white" stroke-opacity="0.09"></circle>
          <g opacity="0.1">
            <path d="M26.4932 5.20547L228.856 172.432" stroke="#D9D9D9"></path>
            <rect x="22.4384" y="0.5" width="6.15753" height="6.15753" fill="#686868" stroke="white"></rect>
            <rect x="224.801" y="169.027" width="6.15753" height="6.15753" fill="#686868" stroke="white"></rect>
            <circle cx="121.819" cy="83.613" r="1.7774" fill="#323232" stroke="white"></circle>
          </g>
        </svg>
        <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3" xmlns="http://www.w3.org/2000/svg" width="982" height="786" viewBox="0 0 982 786" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M490 401V537H348.5V401H490ZM490 785.5V676H348.5V785.5H347.5V676H206V785.5H205V676H63.5V785.5H62.5V676H0V675H62.5V538H0V537H62.5V401H0V400H62.5V258H0V257H62.5V116H0V115H62.5V0H63.5V115L205 115V0H206V115L347.5 115V0H348.5V115H490V0H491V115L627.5 115V0H628.5V115H765V0H766V115L902.5 115V0H903.5V115H982V116H903.5V257H982V258H903.5V400H982V401H903.5V537H982V538H903.5V675H982V676H903.5V785.5H902.5V676H766V785.5H765V676H628.5V785.5H627.5V676H491V785.5H490ZM902.5 675V538H766V675H902.5ZM902.5 537V401H766V537H902.5ZM902.5 400V258H766V400H902.5ZM902.5 257V116L766 116V257H902.5ZM627.5 675H491V538H627.5V675ZM765 675H628.5V538H765V675ZM348.5 675H490V538H348.5V675ZM347.5 538V675H206V538H347.5ZM205 538V675H63.5V538H205ZM765 537V401H628.5V537H765ZM765 400V258H628.5V400H765ZM765 257V116H628.5V257H765ZM347.5 401V537H206V401H347.5ZM205 401V537H63.5V401H205ZM627.5 401V537H491V401H627.5ZM627.5 116L491 116V257H627.5V116ZM627.5 258H491V400H627.5V258ZM63.5 257V116L205 116V257H63.5ZM63.5 400V258H205V400H63.5ZM206 116V257H347.5V116L206 116ZM348.5 116V257H490V116H348.5ZM206 400V258H347.5V400H206ZM348.5 258V400H490V258H348.5Z" fill="url(#paint0_radial_1_8)" />
          <defs>
            <radialGradient id="paint0_radial_1_8" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(491 392.75) rotate(90) scale(513.25 679.989)">
              <stop stop-color="white" stop-opacity="0.2" />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div class="jumbo absolute inset-0 opacity-5"></div>
      </div>
      <div class="block dark:hidden absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
        <div class="grid-bg absolute inset-0 w-full h-full"></div>
      </div>
      <slot></slot>
      <div class="hidden md:hidden dark:hidden absolute inset-0 m-5 pointer-events-none">
        <div class="line-h absolute top-0 inset-x-0 h-[2px] bg-left-top bg-repeat-x"></div>
        <div class="line-v absolute right-0 inset-y-0 w-[2px] bg-left-top bg-repeat-y"></div>
        <div class="line-h absolute bottom-0 inset-x-0 h-[2px] bg-left-top bg-repeat-x"></div>
        <div class="line-v absolute left-0 inset-y-0 w-[2px] bg-left-top bg-repeat-y"></div>
      </div>
    </main>
    <Footer :author="siteAuthor" :links="socialLinks"/>
    <n-back-top class="!z-2147483646 !w-8 !h-8 !rounded-sm !min-w-0 !bg-black !text-white dark:!bg-default-theme-primary hover:!bg-default-theme-primary-800">
      <i class="ri-skip-up-line" />
    </n-back-top>
    <MagicCursor />
  </n-config-provider>
</template>

<script setup lang="ts">
import '~/assets/css/default/index.css';
import 'remixicon/fonts/remixicon.css';
import Header from "./_partial/Header.vue";
import Footer from "./_partial/Footer.vue";
import useLocalCache from "~/hooks/useLocalCache";
import { darkTheme, useLoadingBar } from 'naive-ui'
import useHexoData from "~/hooks/useHexoData";

const hexo = await useHexoData()

const siteConfig = hexo.getSiteConfig()!
const themeConfig = hexo.getThemeConfig()!


const props = defineProps({
  pageTitle: {
    type: String,
    default: null
  },
  pageAuthor: {
    type: String,
    default: null
  },
  pageKeywords: {
    type: String,
    default: null
  },
  pageDescription: {
    type: String,
    default: null
  }
})

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides: import('naive-ui').GlobalThemeOverrides = {
  common: {
    primaryColor: '#699054',
    primaryColorHover: '#84a476',
    primaryColorPressed: '#5f834f',
    primaryColorSuppl: '#a0b894'
  }
}

const isDark = ref(false)
const curTheme = computed(() => {
  return isDark.value ? darkTheme : null
})

// head externals
const head = themeConfig.head

// header props
// 网站标题
const siteTitle = siteConfig.title || 'Untitled'
// 网站副标题
const subTitle = siteConfig.subtitle || ''
// 网站描述
const description = siteConfig.description || ''
// 导航栏项目
const navItems = themeConfig.nav
// favicon
const faviconURI = themeConfig.favicon
const favicon16URI = themeConfig.favicon16 || faviconURI
const favicon32URI = themeConfig.favicon32 || faviconURI
const appleTouchIconURI = themeConfig.appleTouchIcon
const manifestURI = themeConfig.manifest
const maskIconURI = themeConfig.maskicon
// logo
const logoURI = themeConfig.logo as string || faviconURI as string
// headerConfig
const headerConfig = themeConfig.header || {}
// logo
// const logo = themeConfig.logo
// avatar
// const avatar = themeConfig.avatar

// footer props
// 网站拥有者
const siteAuthor = siteConfig.author || '佚名'
// 社交链接
const socialLinks = themeConfig.links as any[]

useSeoMeta({
  title: props.pageTitle ? `${props.pageTitle} | ${siteTitle}` : siteTitle,
  description: props.pageDescription || siteConfig.description,
  keywords: props.pageKeywords || siteConfig.keywords,
  author: props.pageAuthor || siteConfig.author
})
useHead({
  bodyAttrs: {
    class: 'heti--sans text-base text-main-text dark:text-gray-200'
  },
  link: [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous"},
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&family=Noto+Sans+SC:wght@100;200;300;400;500;600;700;800;900&family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&display=swap"
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: faviconURI
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: faviconURI
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: favicon32URI
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: favicon16URI
    },
    {
      rel: "manifest",
      href: manifestURI
    },
    {
      rel: "mask-icon",
      href: maskIconURI
    },
    {
      rel: "theme-color",
      content: "#699054"
    },
    ...(head.links || [])
  ],
  script: [
    {src: "https://unpkg.com/heti/umd/heti-addon.min.js"},
    {src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js", async: true},
    ...(head.scripts || [])
  ]
})

onMounted(() => {
  setTimeout(() => {
    document.body.classList.add('bg-default-theme-sideline')
    document.body.classList.add('dark:bg-black')
  }, 500)
})

const loadingBar = useLoadingBar()

onBeforeMount(() => {
  loadingBar.start()
  toggleDarkMode(true)
})

const toggleDarkMode = (notToggle = false) => {
  const { getCache, setCache } = useLocalCache()
  const isDarkMode = getCache('darkMode')
  console.log('isDark', isDarkMode)
  const finalDark = notToggle ? isDarkMode : !isDarkMode
  setCache('darkMode', finalDark)
  isDark.value = finalDark
  if (finalDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

provide('toggleDarkMode', toggleDarkMode)


if (import.meta.client) {
  // Hook to app lifecycle
  const nuxtApp = useNuxtApp()
  const router = useRouter()

  const generateRouteKey = (route: RouteLocationNormalized) => {
    const source = route?.meta.key ?? route.path
        .replace(/(:\w+)\([^)]+\)/g, '$1')
        .replace(/(:\w+)[?+*]/g, '$1')
        .replace(/:\w+/g, r => route.params[r.slice(1)]?.toString() || '')
    return typeof source === 'function' ? source(route) : source
  }

  const isChangingPage = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to === from) { return false }

    // If route keys are different then it will result in a rerender
    if (generateRouteKey(to) !== generateRouteKey(from)) { return true }

    const areComponentsSame = to.matched.every((comp, index) =>
        comp.components && comp.components.default === from.matched[index]?.components?.default
    )
    return !areComponentsSame;
  }

  router.onError(() => {
    loadingBar.error()
  })
  router.beforeResolve((to, from) => {
    if (!isChangingPage(to, from)) {
      loadingBar.finish()
    }
  })

  router.afterEach((_to, _from, failure) => {
    if (failure) {
      loadingBar.error()
    }
  })

  const unsubPage = nuxtApp.hook('page:finish', loadingBar.finish)
  const unsubError = nuxtApp.hook('vue:error', loadingBar.error)

  onBeforeUnmount(() => {
    unsubPage()
    unsubError()
    loadingBar.finish()
  })
}
</script>
