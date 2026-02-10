import {defineNuxtPlugin} from "#app";
import WordCloud from 'wordcloud'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      WordCloud,
    }
  }
})
