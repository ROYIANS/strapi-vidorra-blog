<template>
  <DefaultLayout>
    <div class="flex flex-wrap items-stretch xl:block p-5 gap-4 md:p-2">
      <section class="order-1 grow shrink-0 basis-2/3 h-auto relative overflow-x-hidden">
        <div class="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border relative dark:border-zinc-800 bg-opacity-80">
          <HomeContent :cur-page="+$route.params.id" />
        </div>
      </section>
      <section class="order-2 grow-0 shrink basis-1/5 sticky h-max top-5 xl:relative xl:top-0 xl:mt-4">
        <HomeSidebarAuthorCard />
        <HomeSidebarMoodCard />
        <HomeSidebarWeatherCard />
        <HomeSidebarTagCard />
      </section>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import HomeSidebarAuthorCard from "~/layouts/vidorra/_partial/HomeSidebarAuthorCard.vue";
import DefaultLayout from "~/layouts/vidorra/default.vue";
import HomeSidebarWeatherCard from "~/layouts/vidorra/_partial/HomeSidebarWeatherCard.vue";
import HomeContent from "~/layouts/vidorra/_partial/HomeContent.vue";
import HomeSidebarTagCard from "~/layouts/vidorra/_partial/HomeSidebarTagCard.vue";
import HomeSidebarMoodCard from "~/layouts/vidorra/_partial/HomeSidebarMoodCard.vue";
</script>
