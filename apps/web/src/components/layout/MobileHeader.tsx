'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'

/**
 * MobileHeader - 手机端顶部导航栏 + 右侧抽屉菜单
 * 还原旧项目的移动端交互
 */

interface NavItem {
    title: string
    url: string
    icon: string
}

const navItems: NavItem[] = [
    { title: '首页', url: '/', icon: 'ri-home-4-line' },
    { title: '文章', url: '/posts', icon: 'ri-article-line' },
    { title: '友链', url: '/friends', icon: 'ri-links-line' },
    { title: '关于', url: '/about', icon: 'ri-information-line' },
]

const siteTitle = '小梦岛'
const subTitle = '随缘而安'

export function MobileHeader() {
    const pathname = usePathname()
    const { toggleMode } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [toggleIcon, setToggleIcon] = useState('ri-menu-3-line')

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <>
            {/* Top Bar */}
            <div className="hidden max-md:flex bg-[var(--sideline)] dark:bg-black
                           w-full h-12 fixed z-[9999] left-0 -top-px
                           justify-between items-center select-none">
                <div className="shrink grow basis-auto h-full text-left ml-3 mr-12 max-w-[50%]
                               overflow-hidden flex justify-start items-center">
                    <Link href="/" className="shrink-0">
                        <div className="font-serif font-bold text-white text-lg relative flex items-center
                                       after:absolute after:w-1 after:h-1 after:top-1 after:-right-1
                                       after:rounded after:border-white after:border after:border-solid after:bg-white">
                            <span className="leading-normal">{siteTitle}</span>
                        </div>
                    </Link>
                </div>
                <div
                    className="flex shrink-0 grow-0 basis-auto px-5 h-full items-center text-2xl
                              text-right text-white font-normal transition-all cursor-pointer"
                    onMouseEnter={() => setToggleIcon('ri-menu-line')}
                    onMouseLeave={() => setToggleIcon('ri-menu-3-line')}
                    onClick={toggleSidebar}
                >
                    <i className={toggleIcon} />
                </div>
            </div>

            {/* Mask Overlay */}
            {isOpen && (
                <div
                    className="hidden max-md:block fixed z-[99999] inset-0
                              bg-[var(--sideline)] dark:bg-black bg-opacity-60
                              backdrop-saturate-[1.8] backdrop-blur-[20px]
                              animate-fade-in"
                    onClick={toggleSidebar}
                />
            )}

            {/* Drawer Menu */}
            <div
                className={`hidden max-md:block fixed top-0 overflow-y-auto overflow-x-hidden
                           w-72 h-full bg-white dark:bg-zinc-900 z-[999999]
                           shadow-[rgba(100,100,111,0.2)_0_7px_29px_0]
                           transition-all duration-500 text-gray-700 dark:text-gray-200
                           ${isOpen ? 'right-0 opacity-100' : '-right-72 opacity-80'}`}
            >
                {/* Title */}
                <div className="bg-white dark:bg-zinc-900 w-full h-14 leading-normal py-3 px-5 sticky top-0 left-0 z-10">
                    <h1 className="font-serif text-center text-3xl leading-none break-all">
                        {siteTitle}
                    </h1>
                </div>
                {/* Gradient fade */}
                <div className="sticky top-14 inset-x-0 w-full h-8 bg-gradient-to-b from-white dark:from-zinc-900 pointer-events-none z-10" />

                {/* Subtitle */}
                <div className="mx-auto mb-2 w-4/5 text-center flex items-center justify-center">
                    <p className="px-1.5 text-white text-xs bg-[var(--sideline)]">
                        {subTitle}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="w-full px-5">
                    <ul className="w-full h-full flex gap-4 items-center justify-center">
                        <li className="blog-button-lg" title="搜索">
                            <i className="ri-search-2-line" />
                        </li>
                        <li className="blog-button-lg" title="亮色/暗色模式" onClick={toggleMode}>
                            <i className="ri-contrast-line" />
                        </li>
                        <li className="blog-button-lg" title="主题色">
                            <i className="ri-t-shirt-2-line" />
                        </li>
                    </ul>
                </div>

                {/* Nav Menu Grid */}
                <nav className="w-full py-3 px-5">
                    <ul className="list-none p-0 m-0 grid grid-cols-2 gap-2">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.url ||
                                (item.url !== '/' && pathname.startsWith(item.url))
                            return (
                                <li key={index} className="px-2 py-3 m-0 bg-gray-100 dark:bg-zinc-950 dark:bg-opacity-20 rounded">
                                    <Link
                                        href={item.url}
                                        onClick={() => setIsOpen(false)}
                                        className={`no-underline grid grid-cols-1 leading-none touch-manipulation text-center
                                            dark:text-gray-400 hover:text-[var(--sideline)] hover:dark:text-white
                                            ${isActive ? 'text-[var(--sideline)] font-semibold' : ''}`}
                                    >
                                        <i className={`${item.icon} text-3xl leading-none w-full relative`} />
                                        <span className="pr-2 pl-1.5 leading-6 h-6 text-xs">{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}
