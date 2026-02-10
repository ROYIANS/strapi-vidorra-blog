<template>
  <div class="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border relative
              dark:border-zinc-800 bg-opacity-80 pb-5 mb-3 h-max">
    <div class="h-14 absolute top-0 inset-x-0 z-1 pointer-events-none bg-gradient-to-t from-white dark:from-zinc-900 w-full z-99"></div>
    <div class="relative inset-0 z-2">
      <div class="text-sm font-bold text-gray-600 dark:text-gray-400 px-4 pt-2">
        标签云
      </div>
      <n-divider class="!my-2" />
      <TagCloud class="px-4 dark:border-zinc-800"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagCloud from "../_widgets/TagCloud.vue";
</script>
