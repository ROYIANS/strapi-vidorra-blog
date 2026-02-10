<template>
  <div class="w-full h-full heti--serif grid grid-cols-2 p-4">
    <div class="font-black text-xl justify-self-start">{{ displayYear }}/{{ displayMonth }}</div>
    <div class="font-bold text-xl justify-self-end">
      <n-button-group size="tiny">
        <n-button quaternary size="tiny" @click="decreaseMonth">
          <template #icon>
            <i class="ri-arrow-left-s-line"></i>
          </template>
        </n-button>
        <n-button quaternary size="tiny" @click="curMonth">
          <template #icon>
            <i class="ri-loader-3-line"></i>
          </template>
        </n-button>
        <n-button quaternary size="tiny" @click="increaseMonth">
          <template #icon>
            <i class="ri-arrow-right-s-line"></i>
          </template>
        </n-button>
      </n-button-group>
    </div>
    <ul class="grid grid-cols-7 gap-2 select-none col-span-2 pt-2">
      <li v-for="i in weeks" :key="i" class="flex items-center justify-center text-white text-xs font-bold">
        <div class="bg-default-theme-primary-600 dark:bg-default-theme-primary-dark-300 rounded-full w-6 h-6 items-center justify-center flex">
          <span>{{ i }}</span>
        </div>
      </li>
      <li v-for="i in 42" :key="i" class="flex items-center justify-center text-xs font-bold">
        <div v-if="i < startIndex" class="invisible w-6 h-6"></div>
        <div v-if="i>= startIndex && i < endIndex" class="relative bg-default-theme-primary-100 dark:bg-default-theme-primary-dark-700 cursor-pointer rounded-full w-6 h-6 items-center justify-center flex">
          <img
              v-if="curMonthMoods[i - startIndex]"
              :src="curMonthMoods[i - startIndex]?.url"
              :alt="curMonthMoods[i - startIndex]?.mood"
              :title="curMonthMoods[i - startIndex]?.mood"
              class="w-full h-full rounded-full absolute inset-0 hover:animate-default-fade-out object-cover object-center"
          />
          <span>{{ i - startIndex + 1 }}</span>
          <div
              v-if="+displayYear === +currentYear && +displayMonth === +currentMonth && +(i - startIndex + 1) === +currentDate"
              class="absolute w-2 h-2 rounded-full right-0 bottom-0 bg-orange-600"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import moods from "../config/moods.ts";
import useHexoData from "~/hooks/useHexoData";

const dayjs = useDayjs()
const hexo = await useHexoData()

const moodsData = hexo.getMoods()

const currentMonth = dayjs().format('MM')
const currentYear = dayjs().format('YYYY')
const currentDate = dayjs().format('DD')

const displayMonth = ref(currentMonth)
const displayYear = ref(currentYear)

const weeks = ['日', '一', '二', '三', '四', '五', '六']

const startIndex = ref(0)
const endIndex = ref(0)

const curMonthMoods = ref({})

const calculate = () => {
  startIndex.value = dayjs(`${displayYear.value}-${displayMonth.value}-01`).day() + 1
  const totalDay = dayjs(`${displayYear.value}-${displayMonth.value}-01`).daysInMonth()
  endIndex.value = startIndex.value + totalDay

  setCurMonthMoods()
}

const setCurMonthMoods = () => {
  const filteredMoods = moodsData.filter(item => {
    const itemYear = dayjs(item.date).format('YYYY')
    const itemMonth = dayjs(item.date).format('MM')
    return itemYear === displayYear.value && itemMonth === displayMonth.value
  })

  let dealtMonthMoods = {}

  filteredMoods.forEach(mood => {
    const itsDate = dayjs(mood.date).format('DD')
    dealtMonthMoods[Number(itsDate) - 1] = {
      mood: mood.description || mood.name,
      url: moods[mood.mood] || moods.star
    }
  })

  curMonthMoods.value = dealtMonthMoods
}

const increaseMonth = () => {
  moveMonth(1)
}
const decreaseMonth = () => {
  moveMonth(-1)
}

const curMonth = () => {
  moveMonth(0)
}

const moveMonth = (step = 0) => {
  const curMonth = dayjs(`${displayYear.value}-${displayMonth.value}-01`)
  let nextMonth
  if (step > 0) {
    nextMonth = curMonth.add(1, 'month')
  } else if (step < 0) {
    nextMonth = curMonth.subtract(1, 'month')
  } else {
    nextMonth = dayjs()
  }

  displayMonth.value = nextMonth.format('MM')
  displayYear.value = nextMonth.format('YYYY')

  calculate()
}

onMounted(() => {
  calculate()
})
</script>
