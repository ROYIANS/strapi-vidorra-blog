<script setup lang="ts">
import {NDialogProvider, NGlobalStyle, NLoadingBarProvider, NMessageProvider, NNotificationProvider} from "naive-ui";
import useHexoData from "~/hooks/useHexoData";

const props = defineProps({
  error: {
    type: Object,
    default: () => {
    }
  }
})

const statusCodeToLayoutPage = (code: number) => {
  switch (code) {
    case 404:
      return 'not-found'
    case 403:
      return 'forbidden'
    case 500:
    default:
      return 'error'
  }
}

const route = useRoute()
const hexo = await useHexoData()
const themeConfig = hexo.getThemeConfig()
const layout = `${themeConfig?.theme || 'vidorra'}-${statusCodeToLayoutPage(props.error.statusCode)}`
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <NuxtLayout :name="layout"/>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
  <n-global-style/>
</template>
