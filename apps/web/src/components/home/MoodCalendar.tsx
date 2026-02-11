'use client'

import { useState, useEffect } from 'react'

/**
 * MoodCalendar - 心情日历组件
 * 精准复刻 old_project/layouts/vidorra/_widgets/MoodCalendar.vue
 */

// 星期标签
const weeks = ['日', '一', '二', '三', '四', '五', '六']

// 心情emoji映射（简化版，后续可扩展）
const moodEmojis: Record<string, string> = {
  happy: '😊',
  star: '⭐',
  sad: '😢',
  excited: '🎉',
  calm: '😌',
  tired: '😴',
}

// 模拟心情数据类型
interface MoodData {
  date: string // YYYY-MM-DD
  mood: string
  description?: string
}

// 模拟数据（后续替换为真实API）
const mockMoodData: MoodData[] = [
  { date: '2026-02-01', mood: 'happy', description: '开心的一天' },
  { date: '2026-02-05', mood: 'star', description: '闪亮的一天' },
  { date: '2026-02-11', mood: 'excited', description: '激动的一天' },
  { date: '2026-02-14', mood: 'calm', description: '平静的一天' },
]

export function MoodCalendar({ className }: { className?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [displayYear, setDisplayYear] = useState(currentDate.getFullYear())
  const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth() + 1) // 1-12
  const [startIndex, setStartIndex] = useState(0) // 月份第一天在grid中的位置
  const [totalDays, setTotalDays] = useState(0) // 本月总天数
  const [curMonthMoods, setCurMonthMoods] = useState<Record<number, MoodData>>({})

  const currentDateNum = currentDate.getDate()
  const currentMonthNum = currentDate.getMonth() + 1
  const currentYearNum = currentDate.getFullYear()

  useEffect(() => {
    calculate()
  }, [displayYear, displayMonth])

  const calculate = () => {
    // 计算本月第一天是星期几（0=周日, 1=周一, ...）
    const firstDay = new Date(displayYear, displayMonth - 1, 1)
    const dayOfWeek = firstDay.getDay()
    setStartIndex(dayOfWeek + 1) // +1 因为grid从1开始

    // 计算本月总天数
    const lastDay = new Date(displayYear, displayMonth, 0)
    setTotalDays(lastDay.getDate())

    // 筛选本月的心情数据
    const filteredMoods = mockMoodData.filter((item) => {
      const itemDate = new Date(item.date)
      return (
        itemDate.getFullYear() === displayYear &&
        itemDate.getMonth() + 1 === displayMonth
      )
    })

    // 转换为按日期索引的对象
    const moodsMap: Record<number, MoodData> = {}
    filteredMoods.forEach((mood) => {
      const day = new Date(mood.date).getDate()
      moodsMap[day - 1] = mood // day-1 作为索引
    })
    setCurMonthMoods(moodsMap)
  }

  const handlePrevMonth = () => {
    if (displayMonth === 1) {
      setDisplayMonth(12)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (displayMonth === 12) {
      setDisplayMonth(1)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
  }

  const handleCurrentMonth = () => {
    setDisplayYear(currentYearNum)
    setDisplayMonth(currentMonthNum)
  }

  const endIndex = startIndex + totalDays

  return (
    <div className={`w-full h-full font-serif grid grid-cols-2 p-4 ${className || ''}`}>
      {/* 年月标题 */}
      <div className="font-black text-xl justify-self-start">
        {displayYear}/{String(displayMonth).padStart(2, '0')}
      </div>

      {/* 导航按钮 */}
      <div className="font-bold text-xl justify-self-end flex gap-1">
        <button
          onClick={handlePrevMonth}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
          title="上个月"
        >
          <i className="ri-arrow-left-s-line" />
        </button>
        <button
          onClick={handleCurrentMonth}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
          title="回到当前月"
        >
          <i className="ri-loader-3-line" />
        </button>
        <button
          onClick={handleNextMonth}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
          title="下个月"
        >
          <i className="ri-arrow-right-s-line" />
        </button>
      </div>

      {/* 星期标签 + 日历格子 */}
      <ul className="grid grid-cols-7 gap-2 select-none col-span-2 pt-2 list-none p-0 m-0">
        {/* 星期标签行 */}
        {weeks.map((day) => (
          <li key={day} className="flex items-center justify-center text-white text-xs font-bold">
            <div className="bg-[#699054] dark:bg-[#5f834f] rounded-full w-6 h-6 flex items-center justify-center">
              <span>{day}</span>
            </div>
          </li>
        ))}

        {/* 日历格子（42格 = 6周 × 7天） */}
        {Array.from({ length: 42 }, (_, i) => i + 1).map((i) => {
          const dayNumber = i - startIndex + 1
          const isValidDay = i >= startIndex && i < endIndex
          const isToday =
            isValidDay &&
            displayYear === currentYearNum &&
            displayMonth === currentMonthNum &&
            dayNumber === currentDateNum
          const mood = curMonthMoods[dayNumber - 1]

          return (
            <li key={i} className="flex items-center justify-center text-xs font-bold">
              {!isValidDay ? (
                <div className="invisible w-6 h-6" />
              ) : (
                <div
                  className="relative bg-[#e4ebe0] dark:bg-[#567647] cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                  title={mood?.description || `${displayMonth}/${dayNumber}`}
                >
                  {mood && (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-base hover:scale-125 transition-transform"
                      role="img"
                      aria-label={mood.mood}
                    >
                      {moodEmojis[mood.mood] || '⭐'}
                    </span>
                  )}
                  <span className={mood ? 'opacity-0' : ''}>{dayNumber}</span>
                  {isToday && (
                    <div className="absolute w-2 h-2 rounded-full right-0 bottom-0 bg-orange-600" />
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
