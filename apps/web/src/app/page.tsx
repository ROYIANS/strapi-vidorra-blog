import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
            Vidorra Blog
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/posts"
              className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[var(--muted)]"
            >
              文章列表
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="rounded-lg p-8" style={{ backgroundColor: 'var(--card)' }}>
          <h2 className="text-2xl font-semibold mb-4">
            欢迎来到 Vidorra Blog 🎉
          </h2>
          <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
            一款对标 Medium 的现代化博客系统
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded border" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-2">🎨 主题系统</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                支持自定义主题和深浅色模式切换
              </p>
            </div>

            <div className="p-4 rounded border" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-2">📅 心情日历</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                每日签到记录心情和生活瞬间
              </p>
            </div>

            <div className="p-4 rounded border" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-2">📝 优雅排版</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Medium 级别的阅读体验
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
