import type { Theme, ThemeColors } from './types'

/**
 * 应用主题到 DOM
 * 通过 CSS 变量实现主题切换
 */
export function applyTheme(theme: Theme, mode: 'light' | 'dark' = 'light') {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const colors = theme.colors[mode]

    // 应用颜色变量
    Object.entries(colors).forEach(([key, value]) => {
        if (!value) return // 跳过undefined值
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.setProperty(`--${cssKey}`, value)
    })

    // 应用字体变量
    if (theme.fonts) {
        Object.entries(theme.fonts).forEach(([key, value]) => {
            root.style.setProperty(`--font-${key}`, value)
        })
    }

    // 设置暗黑模式类名
    if (mode === 'dark') {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }

    // 应用自定义 CSS
    if (theme.customCss) {
        let styleEl = document.getElementById('theme-custom-css')
        if (!styleEl) {
            styleEl = document.createElement('style')
            styleEl.id = 'theme-custom-css'
            document.head.appendChild(styleEl)
        }
        styleEl.textContent = theme.customCss
    }

    // Debug log
    if (process.env.NODE_ENV === 'development') {
        console.log('[Theme] Applied theme:', theme.name, 'mode:', mode)
        console.log('[Theme] Background color:', colors.background)
    }
}

/**
 * 从存储中获取主题配置
 */
export function loadThemeFromStorage(storageKey: string = 'vidorra-theme') {
    if (typeof window === 'undefined') return null

    try {
        const stored = localStorage.getItem(storageKey)
        return stored ? JSON.parse(stored) : null
    } catch {
        return null
    }
}

/**
 * 保存主题配置到存储
 */
export function saveThemeToStorage(
    themeName: string,
    mode: 'light' | 'dark',
    storageKey: string = 'vidorra-theme'
) {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem(
            storageKey,
            JSON.stringify({ themeName, mode })
        )
    } catch {
        // 忽略存储错误
    }
}

/**
 * 获取系统主题偏好
 */
export function getSystemThemePreference(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

/**
 * 监听系统主题变化
 */
export function watchSystemTheme(callback: (mode: 'light' | 'dark') => void) {
    if (typeof window === 'undefined') return () => { }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
        callback(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)

    return () => {
        mediaQuery.removeEventListener('change', handler)
    }
}

/**
 * 生成 TailwindCSS 主题配置
 * 支持完整的色阶
 */
export function generateTailwindTheme(colors: ThemeColors) {
    const base = {
        primary: colors.primary,
        'primary-hover': colors.primaryHover,
        sideline: colors.sideline,
        background: colors.background,
        foreground: colors.foreground,
        card: colors.card,
        'card-foreground': colors.cardForeground,
        popover: colors.popover,
        'popover-foreground': colors.popoverForeground,
        border: colors.border,
        input: colors.input,
        muted: colors.muted,
        'muted-foreground': colors.mutedForeground,
        accent: colors.accent,
        'accent-foreground': colors.accentForeground,
        destructive: colors.destructive,
        'destructive-foreground': colors.destructiveForeground,
    }

    // 添加色阶
    const scale: Record<string, string> = {}
    if (colors.primary100) scale['primary-100'] = colors.primary100
    if (colors.primary200) scale['primary-200'] = colors.primary200
    if (colors.primary300) scale['primary-300'] = colors.primary300
    if (colors.primary400) scale['primary-400'] = colors.primary400
    if (colors.primary500) scale['primary-500'] = colors.primary500
    if (colors.primary600) scale['primary-600'] = colors.primary600
    if (colors.primary700) scale['primary-700'] = colors.primary700
    if (colors.primary800) scale['primary-800'] = colors.primary800
    if (colors.primary900) scale['primary-900'] = colors.primary900
    if (colors.primaryDark100) scale['primary-dark-100'] = colors.primaryDark100
    if (colors.primaryDark200) scale['primary-dark-200'] = colors.primaryDark200
    if (colors.primaryDark300) scale['primary-dark-300'] = colors.primaryDark300
    if (colors.primaryDark400) scale['primary-dark-400'] = colors.primaryDark400
    if (colors.primaryDark500) scale['primary-dark-500'] = colors.primaryDark500
    if (colors.primaryDark600) scale['primary-dark-600'] = colors.primaryDark600
    if (colors.primaryDark700) scale['primary-dark-700'] = colors.primaryDark700

    return { ...base, ...scale }
}
