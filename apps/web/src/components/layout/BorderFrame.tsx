'use client'

/**
 * BorderFrame - 绿色边框装饰
 * 还原旧项目的四边绿色边框 + 滑入动画效果
 */
export function BorderFrame() {
    return (
        <>
            {/* Top */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-mt
                    top-0 w-full left-0 h-[var(--mask-width)]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
            {/* Bottom */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-mb
                    bottom-0 w-full left-0 h-[var(--mask-width)]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
            {/* Left Top */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-ml
                    left-0 top-0 w-[var(--mask-width)] h-[80vh]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
            {/* Left Bottom */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-ml
                    left-0 bottom-0 w-[var(--mask-width)] h-[80vh]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
            {/* Right Top */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-mr
                    right-0 top-0 w-[var(--mask-width)] h-[80vh]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
            {/* Right Bottom */}
            <div
                className="fixed z-[999] pointer-events-none animate-mask-mr
                    right-0 bottom-0 w-[var(--mask-width)] h-[80vh]
                    bg-[var(--sideline)] border-solid border-[var(--sideline)]
                    border-[length:var(--mask-border-width)]
                    dark:bg-black dark:border-black"
            />
        </>
    )
}
