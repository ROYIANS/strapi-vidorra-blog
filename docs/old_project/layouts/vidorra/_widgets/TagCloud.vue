<template>
  <div class="m-2">
    <div ref="tagCloud" class="w-full h-48"></div>
  </div>
</template>

<script setup>
import useHexoData from "~/hooks/useHexoData";
import useChineseColor from "~/hooks/useChineseColor";

const { $WordCloud } = useNuxtApp()

const hexo = await useHexoData()
const { getRandomChineseColor } = useChineseColor()

const tags = hexo.getTagList()

const tagsArray = tags.map(item => {
  return [item.name, item.count]
})

const tagCloud = ref()

onMounted(() => {
  $WordCloud(tagCloud.value, {
    list: tagsArray,
    gridSize: 8,
    weightFactor: 16,
    fontFamily: '"Oswald", "Sarasa Gothic SC", "Sarasa UI SC", "Noto Sans SC", sans-serif',
    // fontFamily: '"Newsreader", "Noto Serif SC", serif',
    color: () => {
      const randomColor = getRandomChineseColor()
      return randomColor.hex
    },
    backgroundColor: 'transparent',
    rotateRatio: 0
  });
})
</script>
