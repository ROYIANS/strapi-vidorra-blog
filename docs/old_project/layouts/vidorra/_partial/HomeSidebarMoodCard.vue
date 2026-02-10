<template>
  <div class="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border relative
              dark:border-zinc-800 bg-opacity-80 mb-3 h-max">
    <div class="h-14 absolute top-0 inset-x-0 z-1 pointer-events-none bg-gradient-to-t from-white dark:from-zinc-900 w-full z-99"></div>
    <div class="h-14 absolute top-0 inset-x-0 z-0 pointer-events-none bg-gradient-to-r from-default-theme-primary-200 via-60% via-yellow-100 to-blue-100
                      dark:from-default-theme-primary-dark-600 dark:to-transparent"></div>
    <div class="relative inset-0 z-2">
      <div class="text-sm font-bold px-4 pt-4 pb-1">
        <n-gradient-text type="success">
          嗨，{{ helloWord }}，<span v-if="curUserCity">来自{{ curUserCity }}的</span>朋友！
        </n-gradient-text>
      </div>
      <div class="text-xs px-4">
        {{ hitokoto }}
      </div>
      <n-divider class="!my-2" />
      <MoodCard class="px-4 dark:border-zinc-800"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import QWeather from "~/layouts/vidorra/_widgets/QWeather.vue";
import MoodCard from "~/layouts/vidorra/_widgets/MoodCard.vue";
import {getHitokoto, getIpCity} from "~/service/backend/externelApiService";

const dayjs = useDayjs()

const helloWord = computed(() => {
  const currentHour = dayjs().hour()
  if (4 <= currentHour && currentHour <= 10) {
    return '早上好'
  }
  if (11 <= currentHour && currentHour <= 13) {
    return '中午好'
  }
  if (14 <= currentHour && currentHour <= 18) {
    return '下午好'
  }
  if ((19 <= currentHour && currentHour <= 24) || (currentHour >=0 && currentHour <= 3)) {
    return '晚上好'
  }
  return 'A'
})

const hitokoto = ref('')
const curUserCity = ref('')

const initDefaultData = async () => {
  const { data: hitokotoData } = await getHitokoto()
  hitokoto.value = hitokotoData?.value?.hitokoto || ''
  const { data: ipCityData } = await getIpCity()
  curUserCity.value = ipCityData.value?.data.district || ipCityData.value?.data.city || '北京'
}

onMounted(() => {
  initDefaultData()
})
</script>
