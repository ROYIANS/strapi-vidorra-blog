<template>
  <DefaultLayout :page-title="themeConfig?.friends?.name || '友情链接'">
    <div class="main-content text-gray-700 dark:text-white">
      <div class="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm relative
                  dark:border-zinc-800 bg-opacity-80 pb-24">
        <div class="w-full aspect-[4/1] min-h-20 overflow-hidden relative group">
          <img
              v-if="themeConfig?.friends?.background"
              :alt="themeConfig?.friends?.name || '友情链接'"
              class="w-full h-full object-cover group-hover:filter-none group-hover:scale-105 brightness-[0.6] transition-all duration-1000"
              :src="themeConfig?.friends?.background"
          />
          <header
              class="overflow-hidden px-24 md:px-4 pb-8 absolute bottom-0 inset-x-0 z-1 h-full flex items-end
                     backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-1000"
              :class="themeConfig?.friends?.background ? 'text-white group-hover:opacity-50' : ''"
          >
            <div class="md:pt-4 pt-6">
              <h1 class="heti--serif text-4xl font-extrabold leading-snug md:mb-4 mb-6 mt-2">
                <span>{{ themeConfig?.friends?.name || '友情链接' }}</span>
              </h1>
              <div class="text-sm">
                {{ themeConfig?.friends?.description }}
              </div>
            </div>
          </header>
        </div>
        <section class="px-24 md:px-4 pt-24">
          <div v-for="(group, index) in links" :key="index" >
            <h2 class="text-2xl font-bold heti--serif">
              {{ group.group }}<sub>({{ group.links.length || 0 }})</sub>
            </h2>
            <div class="text-xs">{{ group.desc }}</div>
            <div class="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4 pt-12 select-none">
              <div
                  v-for="(link, jIndex) in group.links || []"
                  :key="jIndex"
                  class="group"
                  :style="{
                    backgroundColor: getRandomColor(link.name).hex,
                    color: getRandomColor(link.name).fontColor || '#ffffff'
                  }"
              >
                <div class="w-full aspect-video px-2 py-4 flex flex-col justify-between heti--serif heti--vertical relative">
                  <h3 class="font-bold self-end z-1">
                    <a :href="link.link" target="_blank" class="cursor-hover-item hover:underline" :data-cursor-text="`访问${link.name}→`">
                      <span>{{ link.name }}</span>
                    </a>
                  </h3>
                  <div class="px-8 z-1">{{ link.desc }}</div>
                  <div v-if="link.rss" class="px-2 z-1">
                    <a :href="link.rss" target="_blank" class="cursor-hover-item" :data-cursor-text="`订阅${link.name}`">
                      <i class="ri-rss-fill"></i>
                      <span>RSS</span>
                    </a>
                  </div>
                  <div v-else></div>
                  <img
                      class="absolute left-2 bottom-2 object-cover aspect-square rounded-full w-8 z-1"
                      :alt="link.name"
                      :src="link.avatar"
                  />
                  <img
                      class="absolute left-0 top-0 w-full h-full object-cover opacity-0 brightness-50
                             blur-sm group-hover:opacity-100 duration-500 transition-opacity"
                      :alt="link.name"
                      :src="link.background || link.avatar"
                  />
<!--                  <img-->
<!--                      class="w-1/4 aspect-square rounded-full object-cover"-->
<!--                      :alt="link.name"-->
<!--                      :src="link.avatar"-->
<!--                  />-->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "~/layouts/vidorra/default.vue";
import useHexoData from "~/hooks/useHexoData";
import useChineseColor from "~/hooks/useChineseColor";
import type {Ref} from "vue";

const hexo = await useHexoData()
const chineseColor = useChineseColor()

const themeConfig = hexo.getThemeConfig()
const links = hexo.getFriends()

const randomColors: Ref<Record<string, any>> = ref({})

const getRandomColor = (name: any) => {
  if (randomColors.value[name] !== undefined) {
    return randomColors.value[name]
  } else {
    const random = chineseColor.getRandomChineseColor()
    randomColors.value[name] = random
    return random
  }
}
</script>
