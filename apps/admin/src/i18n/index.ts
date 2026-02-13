import { zhCN } from './messages/zh-CN'

type Primitive = string | number | boolean | null | undefined
type Params = Record<string, Primitive>

type NestedKeyOf<TObj extends object> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${NestedKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]

const messages = zhCN

export type I18nKey = NestedKeyOf<typeof messages>

function getMessageByKey(key: I18nKey): string | undefined {
  const parts = key.split('.')
  let current: unknown = messages

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
  const template = getMessageByKey(key)
  if (!template) return key
  return formatMessage(template, params)
}

