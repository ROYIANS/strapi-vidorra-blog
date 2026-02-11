import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { BorderFrame, Sidebar, MobileHeader, Footer } from '@/components/layout'
import { BackgroundDecoration } from '@/components/layout'
import './globals.css'

export const metadata: Metadata = {
  title: '小梦岛 | Vidorra Blog',
  description: '随缘而安 — 一款对标 Medium 的现代化博客系统',
  keywords: ['博客', '小梦岛', 'Next.js', '前端', '技术分享'],
  authors: [{ name: '小梦岛', url: 'https://www.royians.cn' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&family=Noto+Sans+SC:wght@100;200;300;400;500;600;700;800;900&family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased heti--sans">
        <ThemeProvider>
          {/* 绿色边框装饰 */}
          <BorderFrame />

          {/* 左侧固定侧边栏 (桌面端) */}
          <Sidebar />

          {/* 手机端顶部导航栏 */}
          <MobileHeader />

          {/* 主内容区域 */}
          <main
            className="relative min-h-[var(--content-min-h)]
                       max-md:ml-0 max-md:mt-12
                       bg-[var(--background)] dark:bg-zinc-900
                       md:pr-0 md:pl-0 md:pt-0 md:block p-2 [&:has(.main-content)]:p-0"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0',
              marginLeft: 'calc(var(--side-width) + var(--mask-width) - 0.7rem)'
            }}
          >
            <BackgroundDecoration />
            <div className="relative z-10">
              {children}
            </div>
          </main>

          {/* 页脚 */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
