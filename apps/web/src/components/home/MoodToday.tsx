'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import moodsConfig from '@/lib/moods'

/**
 * MoodToday - 今日心情组件
 * 精准复刻 old_project/layouts/vidorra/_widgets/MoodToday.vue
 */

export function MoodToday({ className }: { className?: string }) {
  const [currentTime, setCurrentTime] = useState('')
  const [mood] = useState('star') // 当前心情，后续可从API获取
  const [moodName] = useState('未知') // 心情名称
  const [description] = useState('') // 心情描述，后续可从API获取

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      // 重复5次以适应滚动动画
      setCurrentTime(` ${formatted}  ${formatted}  ${formatted}  ${formatted}  ${formatted} `)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`font-serif grid grid-cols-1 relative justify-items-center items-center w-full h-64 text-sm p-4 overflow-hidden ${className || ''}`}>
      {/* 左右渐变遮罩 */}
      <div className="h-full w-12 absolute left-0 top-0 bg-gradient-to-r from-white dark:from-zinc-900 z-[1] pointer-events-none" />
      <div className="h-full w-12 absolute right-0 top-0 bg-gradient-to-l from-white dark:from-zinc-900 z-[1] pointer-events-none" />

      {/* 心情图片 */}
      <div className="relative w-20 h-20 hover:animate-spin-y cursor-pointer transition-transform">
        <Image
          src={moodsConfig[mood] || moodsConfig.star}
          alt="今日心情"
          width={80}
          height={80}
          className="w-20 h-20 object-cover"
        />
      </div>

      {/* 滚动文字背景 */}
      <ul className="animate-scroll-mood py-5 m-auto list-none absolute top-1/2 -translate-y-1/2 left-0 -z-[1]">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
          <li key={i} className="relative mx-auto p-0 -m-1.5 list-none">
            <div className="w-fit flex relative font-black text-lg">
              {Array.from({ length: 5 }, (_, k) => k).map((k) => (
                <span key={k} className="whitespace-nowrap py-0 px-1">
                  {i % 2 === 1 ? (
                    <span>
                      {!description ? (
                        <>
                          今天的我，是<span className="text-indigo-600 font-bold uppercase">{moodName}</span>的我。
                        </>
                      ) : (
                        description
                      )}
                    </span>
                  ) : (
                    <span className="text-sm">{currentTime}</span>
                  )}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
