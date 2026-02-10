// 主题类型定义
export interface ThemeColors {
    primary: string
    primaryHover: string
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    border: string
    input: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
}

export interface ThemeFonts {
    sans: string
    serif: string
    mono: string
}

export interface Theme {
    name: string
    displayName: string
    description?: string
    author?: string
    version?: string
    colors: {
        light: ThemeColors
        dark: ThemeColors
    }
    fonts?: ThemeFonts
    customCss?: string
}

// 主题配置
export interface ThemeConfig {
    defaultTheme: string
    enableDarkMode: boolean
    storageKey?: string
}

// 主题上下文
export interface ThemeContext {
    theme: Theme
    mode: 'light' | 'dark'
    setTheme: (theme: Theme) => void
    setMode: (mode: 'light' | 'dark') => void
    toggleMode: () => void
}
