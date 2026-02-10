// hooks/useLocalCache.ts
import { useLocalStorage } from '@vueuse/core';

const defCache= {
  token: '',
  userInfo: { username: '', avatar: '' },
  theme: 'default' as 'default' | 'custom',
  darkMode: false
};

type LocalCacheValueType = typeof defCache;
type Keys = keyof LocalCacheValueType;

export default function useLocalCache() {
  // 1.获取cache
  function getCache<T extends Keys>(key: T): LocalCacheValueType [T] {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache<T extends Keys>(key: T, value: LocalCacheValueType [T]) {
    useLocalStorage(key, defCache[key]).value = value;
  }
  // 3.移除cache
  function removeCache(key: Keys) {
    useLocalStorage(key, defCache[key]).value = null;
  }
  // 4.清除所有cache
  function clearCache() {
    localStorage.clear();
  }
  return { getCache, setCache, removeCache, clearCache };
}
