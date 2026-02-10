import Link from 'next/link'

/**
 * HomeSidebarAuthor - 侧边栏作者卡片
 * 显示作者信息和社交链接
 */

interface AuthorInfo {
  nickname: string
  avatar: string
  birthYear: number
  location: string
  description: string
}

interface SocialLink {
  title: string
  url: string
  icon: string
}

// 作者信息配置（后续可以从配置文件或 API 获取）
const authorInfo: AuthorInfo = {
  nickname: 'ROYIANS',
  avatar: 'https://avatars.githubusercontent.com/u/12946000?v=4',
  birthYear: 1998,
  location: '中国',
  description: '随缘而安，顺其自然',
}

const socialLinks: SocialLink[] = [
  { title: 'GitHub', url: 'https://github.com/royians', icon: 'ri-github-fill' },
  { title: 'Email', url: 'mailto:royians@vidorra.life', icon: 'ri-mail-fill' },
  { title: 'RSS', url: '/rss.xml', icon: 'ri-rss-fill' },
]

export function HomeSidebarAuthor() {
  const currentYear = new Date().getFullYear()
  const age = currentYear - authorInfo.birthYear

  return (
    <>
      {/* 移动端版本 - 方形卡片 */}
      <div className="xl:hidden bg-zinc-900 rounded overflow-hidden relative dark:border-zinc-800 mb-3 aspect-square">
        <div className="absolute inset-0 bg-zinc-900 group text-white">
          <img
            alt="author avatar"
            src={authorInfo.avatar}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 grid">
            <div className="p-4">
              <div className="font-black text-4xl">{authorInfo.nickname}</div>
              <div className="w-1/6 border-2 my-2 border-[var(--primary)]"></div>
              <div className="text-xs">
                <i className="ri-cake-2-fill mr-1"></i>
                <span>{age}</span>
                <span>，</span>
                <i className="ri-map-pin-fill mr-1"></i>
                <span>{authorInfo.location}</span>
              </div>
              <div className="text-xs">{authorInfo.description}</div>
            </div>
            <div className="text-sm bg-black dark:bg-[var(--primary)] w-full h-0 group-hover:h-10
                          transition-[height] duration-500">
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 h-10 w-full justify-center">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      className="text-lg flex hover:scale-110 transition-transform"
                      title={link.title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 桌面端版本 - 横向卡片 */}
      <div className="hidden xl:flex relative overflow-hidden border dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded mb-3">
        <div className="w-1/3 aspect-square shrink-0">
          <img
            alt="author avatar"
            src={authorInfo.avatar}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 grid grid-cols-1 w-full">
          <div className="font-black text-4xl pb-2">{authorInfo.nickname}</div>
          <div className="text-xs">
            <i className="ri-cake-2-fill mr-1"></i>
            <span>{age}</span>
            <span>，</span>
            <i className="ri-map-pin-fill mr-1"></i>
            <span>{authorInfo.location}</span>
          </div>
          <div className="text-xs">{authorInfo.description}</div>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  className="text-lg flex hover:text-[var(--primary)] transition-colors"
                  title={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
