import type { Theme } from './types'

// 默认主题 - 继承自 hexo-theme-vidorra 的设计
export const vidorraTheme: Theme = {
    name: 'vidorra-default',
    displayName: 'Vidorra',
    description: '默认主题，继承自 hexo-theme-vidorra 的优雅设计',
    author: 'ROYIANS',
    version: '1.0.0',
    colors: {
        light: {
            primary: '#699054',           // 主色 - 绿色
            primaryHover: '#84a476',      // 主色悬停
            background: '#ffffff',         // 背景
            foreground: '#1a1a1a',        // 文字
            card: '#f8f9fa',              // 卡片背景
            cardForeground: '#1a1a1a',    // 卡片文字
            popover: '#ffffff',           // 弹出层背景
            popoverForeground: '#1a1a1a', // 弹出层文字
            border: '#e5e7eb',            // 边框
            input: '#f3f4f6',             // 输入框背景
            muted: '#f3f4f6',             // 次要背景
            mutedForeground: '#6b7280',   // 次要文字
            accent: '#f3f4f6',            // 强调背景
            accentForeground: '#1a1a1a',  // 强调文字
            destructive: '#ef4444',       // 危险色
            destructiveForeground: '#ffffff', // 危险色文字
        },
        dark: {
            primary: '#84a476',           // 主色 - 浅绿色 (暗黑模式下)
            primaryHover: '#99b789',      // 主色悬停
            background: '#0a0a0a',        // 背景 - 深黑
            foreground: '#ededed',        // 文字 - 浅色
            card: '#161616',              // 卡片背景
            cardForeground: '#ededed',    // 卡片文字
            popover: '#161616',           // 弹出层背景
            popoverForeground: '#ededed', // 弹出层文字
            border: '#2d2d2d',            // 边框
            input: '#1f1f1f',             // 输入框背景
            muted: '#1f1f1f',             // 次要背景
            mutedForeground: '#a1a1aa',   // 次要文字
            accent: '#1f1f1f',            // 强调背景
            accentForeground: '#ededed',  // 强调文字
            destructive: '#dc2626',       // 危险色
            destructiveForeground: '#ffffff', // 危险色文字
        },
    },
    fonts: {
        sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        serif: '"Noto Serif SC", "Source Han Serif SC", serif',
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
