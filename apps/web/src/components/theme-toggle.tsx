'use client'

import { useTheme } from './theme-provider'

export function ThemeToggle() {
    const { mode, toggleMode } = useTheme()

    return (
        <button
            onClick={toggleMode}
            className="rounded-lg p-2 transition-colors hover:bg-muted"
            aria-label="切换主题"
        >
            {mode === 'light' ? (
                <i className="ri-moon-line text-xl"></i>
            ) : (
                <i className="ri-sun-line text-xl"></i>
            )}
        </button>
    )
}
