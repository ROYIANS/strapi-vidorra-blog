'use client'

/**
 * HomeSidebarWeather - 天气卡片
 * 显示当前天气信息（未来可接入和风天气API）
 */
export function HomeSidebarWeather() {
    return (
        <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-80 rounded-sm border border-gray-200
                      dark:border-zinc-800 bg-opacity-80 pb-5 mb-3 h-max relative">
            {/* 顶部渐变遮罩 */}
            <div className="h-14 absolute top-0 inset-x-0 z-[1] pointer-events-none
                          bg-gradient-to-t from-white dark:from-zinc-900 w-full" />

            {/* 内容区域 */}
            <div className="relative inset-0 z-[2]">
                {/* 标题 */}
                <div className="text-sm font-bold text-gray-600 dark:text-gray-400 px-4 pt-2">
                    天气早知道
                </div>

                {/* 分割线 */}
                <div className="border-t border-gray-200 dark:border-zinc-800 my-2" />

                {/* 天气内容 */}
                <div className="px-4">
                    <WeatherWidget />
                </div>
            </div>
        </div>
    )
}

/**
 * WeatherWidget - 简化版天气组件
 * 后续可接入和风天气API
 */
function WeatherWidget() {
    // 模拟天气数据
    const weather = {
        location: '北京',
        temperature: '22°C',
        condition: '晴',
        icon: '☀️',
        humidity: '45%',
        wind: '东北风 2级',
    }

    return (
        <div className="text-center py-4">
            {/* 地点 */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {weather.location}
            </div>

            {/* 温度和图标 */}
            <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-4xl">{weather.icon}</span>
                <span className="text-3xl font-bold">{weather.temperature}</span>
            </div>

            {/* 天气状况 */}
            <div className="text-lg font-medium mb-3">{weather.condition}</div>

            {/* 额外信息 */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <div>湿度 {weather.humidity}</div>
                <div>{weather.wind}</div>
            </div>

            {/* 提示文字 */}
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                数据仅供参考
            </div>
        </div>
    )
}
