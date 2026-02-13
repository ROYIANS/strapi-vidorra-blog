import { createContext, useContext, useEffect, useState } from 'react'
import { type FontScheme, fontSchemes } from '@/config/fonts'
import { getCookie, removeCookie, setCookie } from '@/lib/cookies'

const FONT_COOKIE_NAME = 'font-scheme'
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type FontContextType = {
  font: FontScheme
  setFont: (font: FontScheme) => void
  resetFont: () => void
}

const FontContext = createContext<FontContextType | null>(null)

function applyFont(fontId: FontScheme) {
  const fontFamilyMap: Record<FontScheme, string> = {
    modern: "'Outfit', 'Noto Sans SC', 'Noto Color Emoji', sans-serif",
    serif: "'Noto Serif', 'Noto Color Emoji', serif",
    system:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif",
  }

  const fontFamily = fontFamilyMap[fontId]
  if (document.body) {
    document.body.style.fontFamily = fontFamily
  }
  document.documentElement.style.setProperty('--font-body', fontFamily)
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, _setFont] = useState<FontScheme>(() => {
    const savedFont = getCookie(FONT_COOKIE_NAME)
    const validScheme = fontSchemes.find((scheme) => scheme.id === savedFont)
    return validScheme ? validScheme.id : fontSchemes[0].id
  })

  useEffect(() => {
    applyFont(font)
  }, [font])

  const setFont = (newFont: FontScheme) => {
    setCookie(FONT_COOKIE_NAME, newFont, FONT_COOKIE_MAX_AGE)
    _setFont(newFont)
  }

  const resetFont = () => {
    removeCookie(FONT_COOKIE_NAME)
    _setFont(fontSchemes[0].id)
  }

  return (
    <FontContext value={{ font, setFont, resetFont }}>{children}</FontContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
