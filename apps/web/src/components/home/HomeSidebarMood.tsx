'use client'

import { useEffect, useState } from 'react'
import { MoodToday } from './MoodToday'
import { MoodCalendar } from './MoodCalendar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

/**
 * HomeSidebarMood - 心情卡片
 * 精准复刻 old_project/layouts/vidorra/_partial/HomeSidebarMoodCard.vue + MoodCard.vue
 */

export function HomeSidebarMood() {
    const [greeting, setGreeting] = useState('你好')
    const [hitokoto, setHitokoto] = useState('加载中...')
    const [city, setCity] = useState('')

    useEffect(() => {
        // 根据时间设置问候语
        const hour = new Date().getHours()
        if (hour >= 4 && hour <= 10) setGreeting('早上好')
        else if (hour >= 11 && hour <= 13) setGreeting('中午好')
        else if (hour >= 14 && hour <= 18) setGreeting('下午好')
        else setGreeting('晚上好')

        // 加载一言
        fetchHitokoto()

        // 加载城市信息
        fetchCity()
    }, [])

    // 获取一言
    const fetchHitokoto = async () => {
        try {
            const response = await fetch('https://v1.hitokoto.cn/?c=i&encode=json')
            const data = await response.json()
            setHitokoto(data.hitokoto || '代码如诗，技术改变世界。')
        } catch (error) {
            console.error('获取一言失败:', error)
            setHitokoto('代码如诗，技术改变世界。')
        }
    }

    // 获取城市信息
    const fetchCity = async () => {
        try {
            const response = await fetch('https://api.qjqq.cn/api/district')
            const data = await response.json()
            if (data.code === 200 && data.data) {
                const { district, city } = data.data
                setCity(district || city || '北京')
            } else {
                setCity('北京')
            }
        } catch (error) {
            console.error('获取城市信息失败:', error)
            setCity('北京')
        }
    }

    return (
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200
                      dark:border-zinc-800 bg-opacity-80 mb-3 h-max relative overflow-hidden">
            {/* 顶部渐变遮罩 - 修复z-index，避免遮住文字 */}
            <div className="h-14 absolute top-0 inset-x-0 z-[1] pointer-events-none
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
                <div className="w-full px-4 pb-4 dark:border-zinc-800">
                    {/* 小屏到大屏：使用 shadcn Tabs */}
                    <div className="hidden md:block">
                        <Tabs defaultValue="today" className="w-full">
                            <TabsList className="w-full grid grid-cols-2">
                                <TabsTrigger value="today">今日</TabsTrigger>
                                <TabsTrigger value="calendar">心情日历</TabsTrigger>
                            </TabsList>
                            <TabsContent value="today" className="px-0">
                                <MoodToday />
                            </TabsContent>
                            <TabsContent value="calendar" className="px-0">
                                <MoodCalendar />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* 超大屏：并排显示 */}
                    <div className="xl:hidden md:grid grid-cols-2">
                        <MoodToday />
                        <MoodCalendar />
                    </div>
                </div>
            </div>
        </div>
    )
}
