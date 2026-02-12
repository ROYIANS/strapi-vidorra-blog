'use client'

/**
 * Footer - 页脚
 */

interface SocialLink {
  title: string
  url: string
  icon: string
}

const socialLinks: SocialLink[] = [
  { title: 'GitHub', url: 'https://github.com/ROYIANS', icon: 'ri-github-fill' },
  { title: 'Email', url: 'mailto:royians@vidorra.life', icon: 'ri-mail-fill' },
]

const author = '小梦岛'

export function Footer() {
  return (
    <footer
      className="flex flex-col h-40 items-center justify-center text-white text-sm
                          ml-[var(--side-width)] pt-5 bg-[var(--sideline)] dark:bg-black
                          max-md:ml-0"
    >
      {socialLinks.length > 0 && (
        <div className="flex items-center gap-3 py-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              className="text-lg flex text-white hover:opacity-80 transition-opacity"
              title={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={link.icon} />
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span>© {new Date().getFullYear()}</span>
        <i className="ri-hashtag" />
        <span>{author}</span>
      </div>

      <div className="flex items-center gap-2 mt-1 opacity-70">
        <span>Powered by</span>
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-80">
          Next.js
        </a>
        <span>&</span>
        <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-80">
          NestJS
        </a>
      </div>
    </footer>
  )
}
