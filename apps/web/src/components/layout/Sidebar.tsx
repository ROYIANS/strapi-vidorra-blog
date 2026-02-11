'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'

/**
 * Sidebar - 左侧固定侧边栏
 * 还原旧项目的竖排标题 + 导航菜单 + 功能按钮
 */

interface NavItem {
    title?: string
    url?: string
    icon?: string
    group?: boolean
    name?: string
}

const navItems: NavItem[] = [
    { title: '首页', url: '/', icon: 'ri-home-4-line' },
    { title: '文章', url: '/posts', icon: 'ri-article-line' },
    { title: '友链', url: '/friends', icon: 'ri-links-line' },
    { title: '关于', url: '/about', icon: 'ri-information-line' },
    { title: '说说', url: '/moments', icon: 'ri-chat-3-line' },
    { title: '摄影', url: '/photos', icon: 'ri-camera-line' },
    { title: '分类', url: '/categories', icon: 'ri-folder-line' },
    { title: '标签', url: '/tags', icon: 'ri-price-tag-3-line' },
    { group: true, name: '娱乐' },
    { title: '书单', url: '/books', icon: 'ri-book-line' },
    { title: '影集', url: '/movies', icon: 'ri-movie-line' },
    { title: '歌单', url: '/music', icon: 'ri-music-line' },
]

const siteTitle = '小梦岛'
const subTitle = '随缘而安'

export function Sidebar() {
    const pathname = usePathname()
    const { toggleMode } = useTheme()

    return (
        <>
            {/* Desktop Sidebar */}
            <header className="max-md:hidden fixed pt-2 pb-16 px-[var(--h-margin)] h-full w-[var(--side-width)]
                               bg-white dark:bg-zinc-950 text-gray-700 dark:text-gray-200 text-sm select-none
                               overflow-auto z-50 sidebar-scrollbar top-0"
                style={{ left: 'var(--mask-width)' }}
            >
                <div className="animate-left-in">
                    {/* Logo / Title */}
                    <div className="w-full mx-0 my-8">
                        <Link href="/">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="site-title font-serif text-3xl leading-none relative
                                              before:absolute before:block before:w-2 before:h-2 before:top-0 before:-right-2
                                              before:rounded before:border-[var(--sideline)] before:border-2 before:border-solid
                                              before:bg-[var(--sideline)] break-all"
                                    style={{ writingMode: 'vertical-rl' }}
                                >
                                    {siteTitle}
                                </h1>
                                <p className="px-1.5 text-white mt-2 text-xs bg-[var(--sideline)]">
                                    {subTitle}
                                </p>
                                {/* Logo 图片 */}
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="px-1.5 mt-2 w-4/5"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="mb-12 select-none">
                        <ul className="list-none flex flex-col p-0 m-0">
                            {navItems.map((item, index) => {
                                // Group header
                                if (item.group) {
                                    return (
                                        <li key={index} className="pt-10 pb-1 m-0 order-2 text-left font-bold text-xs text-[var(--sideline)]">
                                            {item.name}
                                        </li>
                                    )
                                }

                                // Regular navigation item
                                const isActive = pathname === item.url ||
                                    (item.url !== '/' && pathname.startsWith(item.url!))

                                return (
                                    <li key={index} className="p-0 m-0 order-2">
                                        <Link
                                            href={item.url!}
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

                        {/* Login/Register Button */}
                        <div className="py-5 w-full">
                            <button className="w-full px-4 py-2 bg-[var(--sideline)] text-white rounded
                                             hover:opacity-90 transition-opacity
                                             dark:bg-[var(--sideline)] flex items-center justify-center gap-2">
                                <i className="ri-user-add-line" />
                                <span>登录 / 注册</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Desktop Bottom Action Bar */}
            <nav className="max-md:hidden bg-white bg-curve-pattern dark:bg-zinc-950 text-gray-700 dark:text-gray-200 -bottom-px select-none
                           fixed bottom-0 my-[var(--mask-width)] p-2 h-16 w-[var(--side-width)] z-50"
                style={{ left: 'var(--mask-width)' }}
            >
                <ul className="w-full h-full flex gap-4 items-center justify-center">
                    <li className="blog-button-sm" title="搜索">
                        <i className="ri-search-2-line" />
                    </li>
                    <li className="blog-button-sm" title="语言">
                        <i className="ri-translate-2" />
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
