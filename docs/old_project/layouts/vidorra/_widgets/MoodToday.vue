<template>
  <div class="heti--serif grid grid-cols-1 relative justify-items-center items-center w-full h-64 text-sm p-4 overflow-hidden">
    <div class="h-full w-12 absolute left-0 top-0 bg-gradient-to-r from-white dark:from-zinc-900 z-1"></div>
    <div class="h-full w-12 absolute right-0 top-0 bg-gradient-to-l from-white dark:from-zinc-900 z-1"></div>
    <img alt="mood" :src="moods[curMood] || moods.star" class="w-20 h-20 hover:animate-spin-y-1.5 object-cover" />
    <ul class="animate-scroll py-5 m-auto list-none absolute top-1/2 -translate-y-1/2 left-0 heti--sans -z-1">
      <template v-for="i in 8" :key="i">
        <li class="relative mx-auto p-0 -m-1.5 list-none">
          <div class="w-fit flex relative font-black text-lg">
                <span class="whitespace-nowrap py-0 px-1" v-for="k in 5">
                  <span v-if="i % 2 === 1">
                    <template v-if="!moodToday || !moodToday.description">
                      今天的我，是<span class="text-indigo-600 font-bold uppercase">{{ moodToday?.name || '未知' }}</span>的我。
                    </template>
                    <template v-else>{{ moodToday.description }}</template>
                  </span>
                  <span class="text-sm" v-else>{{ currentTime }}</span>
                </span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import moods from "~/layouts/vidorra/config/moods";
import useHexoData from "~/hooks/useHexoData";

const dayJs = useDayjs()
const hexo = await useHexoData()

const currentTime = computed(() => {
  return dayJs().format(' YYYY-MM-DD  YYYY-MM-DD  YYYY-MM-DD  YYYY-MM-DD  YYYY-MM-DD ')
})

const moodToday = hexo.getMoodToday()
const curMood = ref(moodToday?.mood || 'star')
</script>

<style>
.animate-scroll {
  --initial: 0;
  --final: -20%;
  --initial-2: 30%;
  --final-2: 50%;
}

.animate-scroll li:nth-child(odd) div {
  transform: translate3d(var(--initial), 0, 0);
  animation: slide 5s linear infinite;
}

.animate-scroll li:nth-child(even) div {
  transform: translate3d(var(--initial-2), 0, 0);
  animation: slide-2 5s linear infinite;
  left: -100%;
}

@keyframes slide {
  0% {
    transform: translate3d(var(--initial), 0, 0);
  }

  100% {
    transform: translate3d(var(--final), 0, 0);
  }
}
@keyframes slide-2 {
  0% {
    transform: translate3d(var(--initial-2), 0, 0);
  }

  100% {
    transform: translate3d(var(--final-2), 0, 0);
  }
}
</style>
