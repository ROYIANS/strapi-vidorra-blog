import type { Theme } from './types'

/**
 * Vidorra 默认主题
 * 继承自 hexo-theme-vidorra 的设计系统
 * 主色：#699054 (Vidorra Green)
 * 背景：#fffcf5 (Cream White)
 */
export const vidorraTheme: Theme = {
    name: 'vidorra-default',
    displayName: 'Vidorra',
    description: '默认主题，继承自 hexo-theme-vidorra 的优雅设计',
    author: 'ROYIANS',
    version: '1.0.0',
    colors: {
        light: {
            // 核心色
            primary: '#699054',           // 主色 - Vidorra Green
            primaryHover: '#84a476',      // 主色悬停
            sideline: '#699054',          // 边框装饰色

            // 背景和文字
            background: '#fffcf5',        // 奶油白背景
            foreground: '#212121',        // 深色文字

            // 卡片
            card: '#ffffff',              // 白色卡片
            cardForeground: '#1a1a1a',    // 卡片文字

            // 弹出层
            popover: '#ffffff',
            popoverForeground: '#1a1a1a',

            // 边框和输入
            border: '#eee',               // 浅灰边框
            input: '#f3f4f6',

            // 次要色
            muted: '#f3f4f6',
            mutedForeground: '#6b7280',

            // 强调色
            accent: '#f3f4f6',
            accentForeground: '#1a1a1a',

            // 危险色
            destructive: '#ef4444',
            destructiveForeground: '#ffffff',

            // Primary 色阶（从 old_project tailwind.config.js）
            primary100: '#e4ebe0',
            primary200: '#d6e1d1',
            primary300: '#c8d7c2',
            primary400: '#bbcdb3',
            primary500: '#adc2a3',
            primary600: '#a0b894',
            primary700: '#92ae85',
            primary800: '#84a476',
            primary900: '#779a66',

            // Dark 色阶
            primaryDark100: '#5f834f',
            primaryDark200: '#567647',
            primaryDark300: '#4c693f',
            primaryDark400: '#435c37',
            primaryDark500: '#394f2f',
            primaryDark600: '#304128',
            primaryDark700: '#263420',
        },
        dark: {
            // 核心色
            primary: '#699054',           // 保持主色一致
            primaryHover: '#84a476',
            sideline: '#699054',

            // 背景和文字
            background: '#0a0a0a',        // 深黑背景
            foreground: '#ededed',        // 浅色文字

            // 卡片
            card: '#161616',              // 深灰卡片
            cardForeground: '#ededed',

            // 弹出层
            popover: '#161616',
            popoverForeground: '#ededed',

            // 边框和输入
            border: '#262626',            // 深色边框
            input: '#1f1f1f',

            // 次要色
            muted: '#1f1f1f',
            mutedForeground: '#a1a1aa',

            // 强调色
            accent: '#1f1f1f',
            accentForeground: '#ededed',

            // 危险色
            destructive: '#dc2626',
            destructiveForeground: '#ffffff',

            // Primary 色阶（暗黑模式使用相同色阶）
            primary100: '#e4ebe0',
            primary200: '#d6e1d1',
            primary300: '#c8d7c2',
            primary400: '#bbcdb3',
            primary500: '#adc2a3',
            primary600: '#a0b894',
            primary700: '#92ae85',
            primary800: '#84a476',
            primary900: '#779a66',

            // Dark 色阶
            primaryDark100: '#5f834f',
            primaryDark200: '#567647',
            primaryDark300: '#4c693f',
            primaryDark400: '#435c37',
            primaryDark500: '#394f2f',
            primaryDark600: '#304128',
            primaryDark700: '#263420',
        },
    },
    fonts: {
        sans: '"Oswald", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        serif: '"Newsreader", "Noto Serif SC", "Source Han Serif SC", serif',
        mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
    },
}

// 主题注册表
const themes = new Map<string, Theme>()
themes.set(vidorraTheme.name, vidorraTheme)

// 主题管理工具
export const ThemeRegistry = {
    /**
     * 注册新主题
     */
    register(theme: Theme) {
        themes.set(theme.name, theme)
    },

    /**
     * 获取主题
     */
    getTheme(name: string): Theme | undefined {
        return themes.get(name)
    },

    /**
     * 获取所有主题
     */
    getAllThemes(): Theme[] {
        return Array.from(themes.values())
    },

    /**
     * 移除主题
     */
    remove(name: string) {
        themes.delete(name)
    },
}
