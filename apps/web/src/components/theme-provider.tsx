'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
    type Theme,
    type ThemeContext as IThemeContext,
    defaultTheme,
    ThemeRegistry,
    applyTheme,
    loadThemeFromStorage,
    saveThemeToStorage,
    getSystemThemePreference,
    watchSystemTheme,
} from '@vidorra/theme'

const ThemeContext = createContext<IThemeContext | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
    defaultThemeName?: string
    enableSystemTheme?: boolean
    storageKey?: string
}

export function ThemeProvider({
    children,
    defaultThemeName = 'vidorra-default',
    enableSystemTheme = false, // 默认关闭系统主题，总是从 light 模式开始
    storageKey = 'vidorra-theme',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme)
    const [mode, setModeState] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false)

    // 初始化主题
    useEffect(() => {
        const stored = loadThemeFromStorage(storageKey)

        if (stored) {
            const loadedTheme = ThemeRegistry.getTheme(stored.themeName) || defaultTheme
            setThemeState(loadedTheme)
            setModeState(stored.mode)
            applyTheme(loadedTheme, stored.mode)
        } else {
            // 默认总是从 light 模式开始
            const initialMode = 'light'
            setModeState(initialMode)
            applyTheme(theme, initialMode)
            saveThemeToStorage(defaultThemeName, initialMode, storageKey)
        }

        setMounted(true)
    }, [])

    // 监听系统主题变化
    useEffect(() => {
        if (!enableSystemTheme || !mounted) return

        const unwatch = watchSystemTheme((systemMode) => {
            setModeState(systemMode)
            applyTheme(theme, systemMode)
            saveThemeToStorage(theme.name, systemMode, storageKey)
        })

        return unwatch
    }, [enableSystemTheme, theme, mounted])

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
        applyTheme(newTheme, mode)
        saveThemeToStorage(newTheme.name, mode, storageKey)
    }

    const setMode = (newMode: 'light' | 'dark') => {
        setModeState(newMode)
        applyTheme(theme, newMode)
        saveThemeToStorage(theme.name, newMode, storageKey)
    }

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setMode(newMode)
    }

    // 始终提供 context，防止服务端渲染时出错
    return (
        <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
