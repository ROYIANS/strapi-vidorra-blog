'use client'

import { useEffect, useState } from 'react'
import { MoodToday } from './MoodToday'
import { MoodCalendar } from './MoodCalendar'

/**
 * HomeSidebarMood - 心情卡片
 * 精准复刻 old_project/layouts/vidorra/_partial/HomeSidebarMoodCard.vue + MoodCard.vue
 */

export function HomeSidebarMood() {
    const [greeting, setGreeting] = useState('你好')
    const [hitokoto, setHitokoto] = useState('加载中...')
    const [city, setCity] = useState('')
    const [activeTab, setActiveTab] = useState<'today' | 'calendar'>('today')

    useEffect(() => {
        // 根据时间设置问候语
        const hour = new Date().getHours()
        if (hour >= 4 && hour <= 10) setGreeting('早上好')
        else if (hour >= 11 && hour <= 13) setGreeting('中午好')
        else if (hour >= 14 && hour <= 18) setGreeting('下午好')
        else setGreeting('晚上好')

        // 模拟加载一言（后续可接入真实API）
        setHitokoto('代码如诗，技术改变世界。')

        // 模拟城市（后续可接入IP定位API）
        setCity('北京')
    }, [])

    return (
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200
                      dark:border-zinc-800 bg-opacity-80 mb-3 h-max relative overflow-hidden">
            {/* 顶部渐变遮罩 */}
            <div className="h-14 absolute top-0 inset-x-0 z-[99] pointer-events-none
                          bg-gradient-to-t from-white dark:from-zinc-900 w-full" />

            {/* 顶部彩色背景 */}
            <div className="h-14 absolute top-0 inset-x-0 z-0 pointer-events-none
                          bg-gradient-to-r from-[#d6e1d1] via-60% via-yellow-100 to-blue-100
                          dark:from-[#304128] dark:to-transparent" />

            {/* 内容区域 */}
            <div className="relative inset-0 z-[2]">
                {/* 问候语 */}
                <div className="text-sm font-bold px-4 pt-4 pb-1">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        嗨，{greeting}，{city && `来自${city}的`}朋友！
                    </span>
                </div>

                {/* 一言 */}
                <div className="text-xs px-4 text-gray-600 dark:text-gray-400 pb-2">
                    {hitokoto}
                </div>

                {/* 分割线 */}
                <div className="border-t border-gray-200 dark:border-zinc-800 my-2" />

                {/* MoodCard - 响应式布局 */}
                <div className="w-full px-4 dark:border-zinc-800">
                    {/* 小屏到大屏：Tab切换 */}
                    <div className="md:block xl:hidden">
                        {/* Tab 按钮 */}
                        <div className="flex border-b border-gray-200 dark:border-zinc-800">
                            <button
                                onClick={() => setActiveTab('today')}
                                className={`px-4 py-2 text-sm font-medium transition-colors relative
                                  ${activeTab === 'today'
                                        ? 'text-[var(--primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--primary)]'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                今日
                            </button>
                            <button
                                onClick={() => setActiveTab('calendar')}
                                className={`px-4 py-2 text-sm font-medium transition-colors relative
                                  ${activeTab === 'calendar'
                                        ? 'text-[var(--primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--primary)]'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                心情日历
                            </button>
                        </div>

                        {/* Tab 内容 */}
                        <div className="px-0">
                            {activeTab === 'today' ? <MoodToday /> : <MoodCalendar />}
                        </div>
                    </div>

                    {/* 超大屏：并排显示 */}
                    <div className="hidden md:hidden xl:grid grid-cols-2">
                        <MoodToday />
                        <MoodCalendar />
                    </div>
                </div>
            </div>
        </div>
    )
}
