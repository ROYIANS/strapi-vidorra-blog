<template>
  <div class="xl:hidden bg-zinc-900 rounded overflow-hidden
              relative dark:border-zinc-800 mb-3 aspect-square">
    <div class="absolute inset-0 bg-zinc-900 group text-white">
      <img alt="author avatar" :src="me.avatar" class="w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 grid">
        <div class="p-4">
          <div class="font-black text-4xl">{{ me.nickname }}</div>
          <div class="w-1/6 border-2 my-2 border-default-theme-primary"></div>
          <div class="heti--serif text-xs">
            <i class="ri-cake-2-fill mr-1"></i>
            <span>{{ +$dayjs().year() - +me.birthYear }}</span>
            <span>，</span>
            <i class="ri-map-pin-fill mr-1"></i>
            <span>{{ me.location }}</span>
          </div>
          <div class="text-xs">{{ me.description }}</div>
        </div>
        <div class="text-sm bg-black dark:bg-default-theme-primary w-full h-0 group-hover:h-10
                    transition-[height] duration-500">
          <div v-if="links.length" class="flex items-center gap-3 h-10 w-full justify-center">
            <a v-for="(link, index) in links" :key="index" class="text-lg flex" :title="link.title" :href="link.url">
              <i :class="link.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden xl:flex relative overflow-hidden border dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded mb-3">
    <div class="w-1/3 aspect-square shrink-0">
      <img alt="author avatar" :src="me.avatar" class="w-full h-full object-cover" />
    </div>
    <div class="p-4 grid grid-cols-1 w-full">
      <div class="font-black text-4xl pb-2">{{ me.nickname }}</div>
      <div class="heti--serif text-xs">
        <i class="ri-cake-2-fill mr-1"></i>
        <span>{{ +$dayjs().year() - +me.birthYear }}</span>
        <span>，</span>
        <i class="ri-map-pin-fill mr-1"></i>
        <span>{{ me.location }}</span>
      </div>
      <div class="text-xs">{{ me.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useHexoData from "~/hooks/useHexoData";

const hexo = await useHexoData()

const themeConfig = hexo.getThemeConfig()!

const me = themeConfig.me

const links = themeConfig.links
</script>
