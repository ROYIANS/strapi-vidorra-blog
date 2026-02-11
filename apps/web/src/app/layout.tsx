import type { Metadata } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC, Oswald, Newsreader, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { BorderFrame, Sidebar, MobileHeader, Footer } from '@/components/layout'
import { BackgroundDecoration } from '@/components/layout'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif-en',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

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
      <body className={`${notoSansSC.variable} ${notoSerifSC.variable} ${oswald.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased heti--sans`}>
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
