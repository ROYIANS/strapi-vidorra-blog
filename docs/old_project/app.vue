<template>
  <n-loading-bar-provider :loading-bar-style="loadingBarStyle">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <NuxtPage />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>
<script setup lang="ts">
const loadingBarStyle = {
  loading: {
    background: '#000'
  }
}

// fix: 解决 naive-ui 和 tailwindcss 冲突问题
onBeforeMount(() => {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
})
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
