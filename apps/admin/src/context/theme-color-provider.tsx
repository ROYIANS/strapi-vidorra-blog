import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/lib/cookies'
import {
  applyThemeColor,
  type ThemeColorName,
  themeColors,
} from '@/lib/theme-colors'
import { useTheme } from './theme-provider'

const DEFAULT_THEME_COLOR: ThemeColorName = 'blue'
const THEME_COLOR_COOKIE_NAME = 'vite-ui-theme-color'
const THEME_COLOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type ThemeColorProviderState = {
  themeColor: ThemeColorName
  setThemeColor: (color: ThemeColorName) => void
  resetThemeColor: () => void
}

const initialState: ThemeColorProviderState = {
  themeColor: DEFAULT_THEME_COLOR,
  setThemeColor: () => null,
  resetThemeColor: () => null,
}

const ThemeColorContext = createContext<ThemeColorProviderState>(initialState)

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [themeColor, _setThemeColor] = useState<ThemeColorName>(() => {
    const saved = getCookie(THEME_COLOR_COOKIE_NAME) as ThemeColorName | undefined
    return saved && saved in themeColors ? saved : DEFAULT_THEME_COLOR
  })

  useEffect(() => {
    if (themeColors[themeColor]) {
      applyThemeColor(themeColor, resolvedTheme)
    }
  }, [themeColor, resolvedTheme])

  const setThemeColor = (color: ThemeColorName) => {
    setCookie(THEME_COLOR_COOKIE_NAME, color, THEME_COLOR_COOKIE_MAX_AGE)
    _setThemeColor(color)
  }

  const resetThemeColor = () => {
    setCookie(
      THEME_COLOR_COOKIE_NAME,
      DEFAULT_THEME_COLOR,
      THEME_COLOR_COOKIE_MAX_AGE
    )
    _setThemeColor(DEFAULT_THEME_COLOR)
  }

  return (
    <ThemeColorContext value={{ themeColor, setThemeColor, resetThemeColor }}>
      {children}
    </ThemeColorContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeColor() {
  const context = useContext(ThemeColorContext)
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider')
  }
  return context
}
