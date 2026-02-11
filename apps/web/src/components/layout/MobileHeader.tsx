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
    title?: string
    url?: string
    icon?: string
    group?: boolean
    name?: string
}

const navItems: NavItem[] = [
    { title: '首页', url: '/', icon: 'ri-home-4-line' },
    { title: '归档', url: '/archives', icon: 'ri-archive-line' },
    { title: '分类', url: '/categories', icon: 'ri-folder-2-line' },
    { title: '标签', url: '/tags', icon: 'ri-price-tag-3-line' },
    { title: '友链', url: '/friends', icon: 'ri-links-line' },
    { title: '关于', url: '/about', icon: 'ri-information-line' },
    { group: true, name: '生活' },
    { title: '说说', url: '/moments', icon: 'ri-chat-3-line' },
    { title: '摄影', url: '/photos', icon: 'ri-camera-3-line' },
    { group: true, name: '娱乐' },
    { title: '书单', url: '/books', icon: 'ri-book-2-line' },
    { title: '影集', url: '/movies', icon: 'ri-movie-2-line' },
    { title: '歌单', url: '/music', icon: 'ri-music-2-line' },
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
                        <div className="h-8 flex items-center relative
                                       after:absolute after:w-1 after:h-1 after:top-1 after:-right-1
                                       after:rounded after:border-white after:border after:border-solid after:bg-white">
                            <img
                                src="/logo-transparent.png"
                                alt={siteTitle}
                                className="h-full object-contain"
                            />
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
            <div
                className={`hidden max-md:block fixed z-[99999] inset-0
                          backdrop-saturate-[1.8] backdrop-blur-xl
                          transition-all duration-500
                          ${isOpen
                            ? 'bg-[rgba(105,144,84,0.6)] dark:bg-[rgba(0,0,0,0.6)] opacity-100'
                            : 'bg-[rgba(105,144,84,0)] dark:bg-[rgba(0,0,0,0)] opacity-0 pointer-events-none'
                          }`}
                onClick={toggleSidebar}
                style={{
                    backdropFilter: 'saturate(1.8) blur(20px)',
                    WebkitBackdropFilter: 'saturate(1.8) blur(20px)'
                }}
            />

            {/* Drawer Menu */}
            <div
                className={`hidden max-md:block fixed top-0 overflow-y-auto overflow-x-hidden
                           w-72 h-full bg-white dark:bg-zinc-900 z-[999999]
                           shadow-[rgba(100,100,111,0.2)_0_7px_29px_0]
                           transition-all duration-500 text-gray-700 dark:text-gray-200
                           opacity-80 sidebar-scrollbar
                           ${isOpen ? 'right-0' : '-right-72'}`}
            >
                {/* Title */}
                <div className="bg-white dark:bg-zinc-900 w-full h-14 leading-normal py-3 px-5 sticky top-0 left-0 z-10">
                    <h1 className="site-title font-serif text-center text-3xl leading-none break-all">
                        {siteTitle}
                    </h1>
                </div>
                {/* Gradient fade */}
                <div className="sticky top-14 inset-x-0 w-full h-8 bg-gradient-to-b from-white dark:from-zinc-900 pointer-events-none z-10" />

                {/* Subtitle / Logo */}
                <div className="mx-auto mb-2 w-4/5 text-center flex items-center justify-center">
                    {/* 可以是文字或图片，这里使用图片 */}
                    <img
                        src="/logo.png"
                        alt="description"
                        className="px-1.5 w-1/2"
                    />
                    {/* 或者使用文字版本：
                    <p className="px-1.5 text-white text-xs bg-[var(--sideline)]">
                        {subTitle}
                    </p>
                    */}
                </div>

                {/* Action Buttons */}
                <div className="w-full px-5">
                    <ul className="w-full h-full flex gap-4 items-center justify-center">
                        <li className="blog-button-lg" title="搜索">
                            <i className="ri-search-2-line" />
                        </li>
                        <li className="blog-button-lg" title="语言">
                            <i className="ri-translate-2" />
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
                            // Group header
                            if (item.group) {
                                return (
                                    <li key={index} className="pt-10 pb-1 m-0 order-2 text-left font-bold text-xs text-[var(--sideline)] col-span-2">
                                        {item.name}
                                    </li>
                                )
                            }

                            // Regular navigation item
                            const isActive = pathname === item.url ||
                                (item.url !== '/' && pathname.startsWith(item.url!))
                            return (
                                <li key={index} className="px-2 py-3 m-0 bg-gray-100 dark:bg-zinc-950 dark:bg-opacity-20 rounded">
                                    <Link
                                        href={item.url!}
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

                {/* Bottom gradient fade */}
                <div className="sticky bottom-32 inset-x-0 w-full h-8 bg-gradient-to-t from-white dark:from-zinc-900 pointer-events-none z-20" />

                {/* Bottom User Area with Background */}
                <div className="sticky bottom-0 inset-x-0 w-full h-32 p-5 flex items-center z-10">
                    {/* Background Image */}
                    <img
                        className="absolute bottom-0 inset-x-0 w-full h-full object-cover dark:brightness-75"
                        alt="user-bg"
                        src="/images/default/user-bg.png"
                    />
                    {/* Top gradient overlay */}
                    <div className="absolute top-0 inset-x-0 w-full h-1/3 bg-gradient-to-b from-white dark:from-zinc-900 pointer-events-none" />

                    {/* Avatar */}
                    <div className="relative z-10">
                        <img
                            src="/images/default/user-avatar-1.jpg"
                            alt="avatar"
                            className="w-16 h-16 rounded-full hover:animate-bounce"
                        />
                    </div>

                    {/* Login Button */}
                    <div className="w-1/2 mx-auto relative z-10">
                        <button className="w-full px-4 py-2 bg-[var(--sideline)] text-white rounded
                                         hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <i className="ri-login-box-line" />
                            <span className="whitespace-nowrap">登录 / 注册</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
