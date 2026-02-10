import enUS from "./en-US.js";
import zhCN from "./zh-CN.js";
import zhTW from "./zh-TW.js";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
    'zh-TW': zhTW
  }
}))
