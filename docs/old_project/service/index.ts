import useLocalCache from "~/hooks/useLocalCache";
import Fetch from './http';
import { type CreateFetchOptions } from '@vueuse/core';

const { getCache, clearCache } = useLocalCache();
const blackApis = ['/admin']; // 接口白名单

const defaultConfig: CreateFetchOptions = {
  baseUrl: '', // 这里的环境为vite，环境变量可自定义。当然也可以直接使用定值，例 '/api'
  options: {
    beforeFetch({ options, cancel, url }) {
      const token = getCache('token');
      if (blackApis.find((item) => url.includes(item)) && !token) {
        cancel(); // 取消请求(不发送请求)
      }
      options.headers = {
        ...options.headers,
        Authorization: token,
      };
      return { options };
    },
    afterFetch(ctx) {
      // 这里做统一错误处理
      const { code, message } = ctx.data;
      if (code === 102) {
        console.log('登录过期，请重新登录');
        clearCache();
        location.reload();
      } else if (code !== undefined && code !== 0) {
        console.log(message || '请求失败，请稍后再试');
      }
      return ctx;
    },
    onFetchError(ctx) {
      // 错误请求
      console.log('错误的请求，请稍后再试');
      return ctx;
    },
    timeout: 10000,
  },
}

export const Request = (config: CreateFetchOptions = {}) => {
  return new Fetch({ ...defaultConfig, ...config })
};
