<template>
  <DefaultLayout>
    <div class="banner" style="overflow: hidden">
      <div class="banner-text">
        <n-h1 :style="titleStyle" class="naive-title">
          <span>404</span>
        </n-h1>
        <n-p style="font-size: 16px; margin-top: 0; margin-bottom: 0">
          notFound
        </n-p>
      </div>
      <span
          v-for="i in 40"
          :key="`4-${i}`"
          class="particle"
          :style="get40Styles(i)"
      >4</span>
      <span
          v-for="i in 40"
          :key="`0-${i}`"
          class="particle"
          :style="get40Styles(40 + i)"
      >0</span>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "./default.vue";
import {useIsMobile} from "~/utils/composables"
import { NLayout, NP, NH1, NButton } from "naive-ui"

const isMobile = useIsMobile()
const titleStyle = computed(() => {
  if (isMobile.value) {
    return 'margin-top: 0; font-size: 64px !important'
  } else {
    return 'margin-top: 0; font-size: 80px !important'
  }
})

const getRandomNum = (min: number, max: number) => {
  const range = max - min
  const rand = Math.random()
  return min + Math.round(range * rand)
}
const get40Styles = (i: number) => {
  const randomSize = getRandomNum(1, 20) + 10
  const blur = 0.02 * i
  const speed = getRandomNum(1, 20) + 20
  // const delay = this.getRandomNum(1, 10) * 0.1
  const animation = ['float', 'floatReverse', 'float2', 'floatReverse2']
  const anim = animation[getRandomNum(0, animation.length)]

  return {
    top: `${(getRandomNum(1, 100) / (100 + randomSize / 8)) * 100}%`,
    left: `${(getRandomNum(1, 100) / (100 + randomSize / 10)) * 100}%`,
    fontSize: `${randomSize}px`,
    filter: `blur(${blur}px)`,
    animation: `${speed}s ${anim} infinite`
  }
}
</script>

<style scoped>
.banner {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.banner-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  justify-content: center;
  z-index: 1;
}

.naive-title {
  line-height: 1;
  font-family: Metropolis, sans-serif;
  margin-bottom: 18px !important;
}

@media only screen and (max-width: 1023px) {
  .banner {
    position: static;
    text-align: left;
    padding-left: 16px;
    transform: none;
    padding-top: 60px;
    padding-right: 16px;
    min-height: 550px;
    height: 100%;
  }

  .banner-text {
    width: 90%;
  }
}

.particle {
  position: absolute;
  display: block;
  pointer-events: none;
}
</style>

<style>
@keyframes apparition {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(180px);
  }
}

@keyframes floatReverse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-180px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(28px);
  }
}

@keyframes floatReverse2 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-28px);
  }
}
</style>
