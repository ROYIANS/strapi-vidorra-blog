<template>
  <div class="w-full">
    <n-tabs type="segment" size="small" animated class="md:!block xl:!hidden">
      <n-tab-pane name="今日" tab="今日">
        <MoodToday />
      </n-tab-pane>
      <n-tab-pane name="心情日历" tab="心情日历">
        <MoodCalendar class="px-0" />
      </n-tab-pane>
    </n-tabs>
    <div class="hidden md:hidden xl:grid grid-cols-2">
      <MoodToday />
      <MoodCalendar />
    </div>
  </div>
</template>

<script setup>
import MoodCalendar from "./MoodCalendar.vue";
import MoodToday from "./MoodToday.vue";
</script>
