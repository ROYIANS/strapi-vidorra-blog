// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  devtools: { enabled: true },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1, user-scalable=0, viewport-fit=cover',
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "dayjs-nuxt"],
  build: {
    transpile: process.env.NODE_ENV === 'production'
      ? [
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@juggle/resize-observer'
      ]
      : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      })
    ]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    vueI18n: '~/locales/i18n.config.js'
  },
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone', 'isLeapYear']
  }
})
