<template>
  <footer class="heti--sans flex flex-col h-40 items-center justify-center text-white text-sm ml-[--side-width]
                 pt-5 bg-default-theme-primary md:!shadow-none dark:bg-black">
    <!-- social links -->
    <div v-if="links.length" class="flex items-center gap-3 py-3">
      <a v-for="(link, index) in links" :key="index" class="text-lg flex" :title="link.title" :href="link.url">
        <i :class="link.icon"></i>
      </a>
    </div>
    <div class="flex items-center gap-2">
      <span>© {{ new Date().getFullYear().toString().substr(-4) }}</span>
      <i class="ri-hashtag"></i>
      <span>{{ author }}</span>
      <i class="ri-cursor-line"></i>
      <span id="busuanzi_container_site_uv">
        本站总访问量
        <span id="busuanzi_value_site_uv">???</span>人次
      </span>
    </div>
    <!-- powered by -->
    <div class="flex items-center gap-2">
      <span>Powered by</span>
      <a href="https://hexo.io/" target="_blank" rel="noopener noreferrer">Hexo</a>
      <span>&</span>
      <a href="https://github.com/ROYIANS/hexo-theme-dreamland" target="_blank"
         rel="noopener noreferrer">Dreamland</a>
    </div>

  </footer>
</template>

<script setup lang="ts">
defineProps({
  author: {
    type: String,
    default: 'ROYIANS'
  },
  links: {
    type: Array,
    default: () => []
  }
})
</script>
