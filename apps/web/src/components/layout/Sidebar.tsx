'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'

/**
 * Sidebar - 左侧固定侧边栏
 * 还原旧项目的竖排标题 + 导航菜单 + 功能按钮
 */

interface NavItem {
    title: string
    url: string
    icon: string
    group?: boolean
    name?: string
}

const navItems: NavItem[] = [
    { title: '首页', url: '/', icon: 'ri-home-4-line', group: false },
    { title: '文章', url: '/posts', icon: 'ri-article-line', group: false },
    { title: '友链', url: '/friends', icon: 'ri-links-line', group: false },
    { title: '关于', url: '/about', icon: 'ri-information-line', group: false },
]

const siteTitle = 'ROYIANS'
const subTitle = '随缘而安'

export function Sidebar() {
    const pathname = usePathname()
    const { toggleMode } = useTheme()

    return (
        <>
            {/* Desktop Sidebar */}
            <header className="hidden md:block fixed pt-2 pb-16 px-[var(--h-margin)] h-full w-[var(--side-width)]
                               bg-white dark:bg-zinc-950 text-gray-700 dark:text-gray-200 text-sm select-none
                               overflow-auto z-50 sidebar-scrollbar">
                <div className="animate-left-in">
                    {/* Logo / Title */}
                    <div className="w-full mx-0 my-8">
                        <Link href="/">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="font-serif text-3xl leading-none relative
                                              before:absolute before:block before:w-2 before:h-2 before:top-0 before:-right-2
                                              before:rounded before:border-[var(--sideline)] before:border-2 before:border-solid
                                              before:bg-[var(--sideline)]"
                                    style={{ writingMode: 'vertical-rl' }}
                                >
                                    {siteTitle}
                                </h1>
                                <p className="px-1.5 text-white mt-2 text-xs bg-[var(--sideline)]">
                                    {subTitle}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="mb-12 select-none">
                        <ul className="list-none flex flex-col p-0 m-0">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.url ||
                                    (item.url !== '/' && pathname.startsWith(item.url))

                                return (
                                    <li key={index} className="p-0 m-0">
                                        <Link
                                            href={item.url}
                                            className={`no-underline flex items-center my-3 leading-none touch-manipulation
                                                after:content-[''] after:flex-grow after:ml-1 after:inline-block after:h-px
                                                after:border-b after:border-dashed after:border-gray-200 dark:after:border-zinc-800
                                                after:hover:border-solid
                                                hover:text-[var(--sideline)] hover:after:border-[var(--sideline)]
                                                transition-colors duration-200
                                                ${isActive ? 'text-[var(--sideline)] font-semibold after:border-solid after:border-[var(--sideline)]' : ''}`}
                                        >
                                            <i className={`${item.icon} text-xl leading-none w-5 h-5 relative`} />
                                            <span className="pr-2 pl-1.5 leading-6 h-6">{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Desktop Bottom Action Bar */}
            <nav className="hidden md:block fixed bottom-0 left-0
                           my-[var(--mask-width)] p-2 h-16 w-[var(--side-width)]
                           bg-white dark:bg-zinc-950 text-gray-700 dark:text-gray-200 select-none z-50">
                <ul className="w-full h-full flex gap-4 items-center justify-center">
                    <li className="blog-button-sm" title="搜索">
                        <i className="ri-search-2-line" />
                    </li>
                    <li className="blog-button-sm" title="亮色/暗色模式" onClick={toggleMode}>
                        <i className="ri-contrast-line" />
                    </li>
                    <li className="blog-button-sm" title="主题色">
                        <i className="ri-t-shirt-2-line" />
                    </li>
                </ul>
            </nav>
        </>
    )
}
