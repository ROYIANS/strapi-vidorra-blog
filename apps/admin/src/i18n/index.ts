import { getCookie, setCookie } from '@/lib/cookies'
import { enUS } from './messages/en-US'
import { zhCN } from './messages/zh-CN'

type Primitive = string | number | boolean | null | undefined
type Params = Record<string, Primitive>
export type Locale = 'zh-CN' | 'en-US'

const I18N_COOKIE_NAME = 'i18n-locale'
const I18N_STORAGE_KEY = 'i18n-locale'
const I18N_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
const FALLBACK_LOCALE: Locale = 'zh-CN'

const messagesByLocale = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const

const localeSubscribers = new Set<() => void>()

type NestedKeyOf<TObj extends object> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${NestedKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]

const messages = zhCN

export type I18nKey = NestedKeyOf<typeof messages>

function normalizeLocale(value: string | undefined): Locale {
  return value === 'en-US' ? 'en-US' : 'zh-CN'
}

function resolveInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(I18N_STORAGE_KEY)
    if (stored) return normalizeLocale(stored)
  }

  const saved = getCookie(I18N_COOKIE_NAME)
  if (saved) return normalizeLocale(saved)
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE
  return navigator.language.toLowerCase().startsWith('en') ? 'en-US' : 'zh-CN'
}

let currentLocale: Locale = resolveInitialLocale()

function applyDocumentLang(locale: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('lang', locale)
}

applyDocumentLang(currentLocale)

function getMessageByKeyFromObject(
  source: unknown,
  key: I18nKey
): string | undefined {
  const parts = key.split('.')
  let current: unknown = source

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === 'string' ? current : undefined
}

function formatMessage(template: string, params?: Params) {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = params[key]
    return value === null || value === undefined ? '' : String(value)
  })
}

export function t(key: I18nKey, params?: Params) {
  const template =
    getMessageByKeyFromObject(messagesByLocale[currentLocale], key) ??
    getMessageByKeyFromObject(messagesByLocale[FALLBACK_LOCALE], key)

  if (!template) return key
  return formatMessage(template, params)
}

export function getLocale(): Locale {
  return currentLocale
}

export function setLocale(locale: Locale) {
  if (locale === currentLocale) return
  currentLocale = locale
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(I18N_STORAGE_KEY, locale)
  }
  setCookie(I18N_COOKIE_NAME, locale, I18N_COOKIE_MAX_AGE)
  applyDocumentLang(locale)

  for (const notify of localeSubscribers) {
    notify()
  }
}

export function subscribeLocale(callback: () => void) {
  localeSubscribers.add(callback)
  return () => localeSubscribers.delete(callback)
}
