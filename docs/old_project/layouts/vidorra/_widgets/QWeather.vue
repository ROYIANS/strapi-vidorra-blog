<template>
  <div id="he-plugin-standard"></div>
</template>

<script setup>
import useHexoData from "~/hooks/useHexoData";

const hexo = await useHexoData()

const themeConfig = hexo.getThemeConfig()

onMounted(() => {
  window.WIDGET = {
    "CONFIG": {
      "layout": "2",
      "width": "",
      "height": "",
      "background": "5",
      "dataColor": "transparent",
      "borderRadius": "8",
      "key": themeConfig?.secrets.qweather_api_key
    }
  }
  const c = document.createElement('link')
  c.rel = 'stylesheet'
  c.href = 'https://widget.qweather.net/standard/static/css/he-standard.css?v=1.4.0'
  const s = document.createElement('script')
  s.src = 'https://widget.qweather.net/standard/static/js/he-standard.js?v=1.4.0'
  const sn = document.getElementsByTagName('script')[0]
  sn.parentNode?.insertBefore(c, sn)
  sn.parentNode?.insertBefore(s, sn)
})
</script>

<style>
#he-plugin-standard {
  width: 100%!important;
}

.dark .wv-n-h-now, .dark .wv-f-forecast a, .dark .wv-lt-location > span {
  color: #fff!important;
}

.wv-n-h-now, .wv-f-forecast a, .wv-lt-location > span {
  color: #212121!important;
}

.wv-n-h-now {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.wv-n-h-now > div:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wv-lt-row, .wv-lt-col-7, .wv-lt-location {
  text-align: center!important;
  width: 100%!important;
}

.wv-lt-refresh, .wv-lt-location > a, .wv-top-backdrop {
  display: none!important;
  pointer-events: none!important;
}
</style>
