// 主题类型定义
export interface ThemeColors {
    // 核心色
    primary: string
    primaryHover: string
    sideline: string  // 边框装饰色（对于vidorra主题，等于primary）

    // 背景和文字
    background: string
    foreground: string

    // 卡片
    card: string
    cardForeground: string

    // 弹出层
    popover: string
    popoverForeground: string

    // 边框和输入
    border: string
    input: string

    // 次要色
    muted: string
    mutedForeground: string

    // 强调色
    accent: string
    accentForeground: string

    // 危险色
    destructive: string
    destructiveForeground: string

    // Primary 色阶（Light mode）
    primary100?: string
    primary200?: string
    primary300?: string
    primary400?: string
    primary500?: string
    primary600?: string
    primary700?: string
    primary800?: string
    primary900?: string

    // Primary 色阶（Dark mode）
    primaryDark100?: string
    primaryDark200?: string
    primaryDark300?: string
    primaryDark400?: string
    primaryDark500?: string
    primaryDark600?: string
    primaryDark700?: string
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
