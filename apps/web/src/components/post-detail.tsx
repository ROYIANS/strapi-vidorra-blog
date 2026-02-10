import type { Post } from '@vidorra/types'
import { MarkdownRenderer } from '@/components/markdown-renderer'

interface PostHeaderProps {
    post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
    return (
        <div className="w-full">
            {/* 封面图和标题 */}
            <div className="relative aspect-[4/1] min-h-[200px] w-full overflow-hidden group">
                {post.cover && (
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="h-full w-full object-cover brightness-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:brightness-75"
                    />
                )}

                <header className="absolute bottom-0 left-0 right-0 z-10 flex h-full items-end px-24 pb-8 backdrop-blur-sm transition-all duration-1000 group-hover:backdrop-blur-none md:px-4">
                    <div className={post.cover ? 'text-white' : ''}>
                        <h1 className="heti--serif mb-6 mt-2 text-4xl font-extrabold leading-snug md:mb-4">
                            {post.title}
                        </h1>

                        <div className="grid grid-cols-9 gap-2 text-xs">
                            {/* 作者和日期 */}
                            <div className="col-span-3 flex flex-row justify-start lg:flex-col">
                                <span>
                                    <i className="ri-pen-nib-line pr-1"></i>
                                    <span className="font-bold">{post.author}</span>
                                </span>
                                <span className="block px-2 lg:hidden">/</span>
                                <span>
                                    <i className="ri-calendar-schedule-line pr-1"></i>
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString('zh-CN')}
                                    </time>
                                </span>
                            </div>

                            {/* 分类 */}
                            {post.category && (
                                <div className="col-span-2 flex flex-row justify-center lg:flex-col">
                                    <span>分类</span>
                                    <span className="block px-2 lg:hidden">/</span>
                                    <span>
                                        <i className="ri-folder-2-line pr-1"></i>
                                        {post.category}
                                    </span>
                                </div>
                            )}

                            {/* 字数 */}
                            {post.wordCount && (
                                <div className="col-span-2 flex flex-row justify-center lg:flex-col">
                                    <span>本文共计</span>
                                    <span className="block px-2 lg:hidden">/</span>
                                    <span>
                                        <i className="ri-text pr-1"></i>
                                        {post.wordCount} 字
                                    </span>
                                </div>
                            )}

                            {/* 阅读时间 */}
                            {post.readTime && (
                                <div className="col-span-2 flex flex-row justify-center lg:flex-col">
                                    <span>预计阅读</span>
                                    <span className="block px-2 lg:hidden">/</span>
                                    <span>
                                        <i className="ri-hourglass-line pr-1"></i>
                                        {post.readTime} 分钟
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

interface PostContentProps {
    content: string
}

export function PostContent({ content }: PostContentProps) {
    return (
        <article className="post-content mt-24 px-24 md:px-4">
            <MarkdownRenderer content={content} />
        </article>
    )
}

interface PostFooterProps {
    post: Post
}

export function PostFooter({ post }: PostFooterProps) {
    return (
        <div className="relative z-10 m-24 my-4 overflow-hidden rounded-xl p-4 md:m-2" style={{ backgroundColor: 'var(--muted)' }}>
            <header className="relative z-10">
                <p className="line-clamp-1 font-semibold">{post.title}</p>
                <p className="line-clamp-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
                </p>
            </header>

            <nav className="relative z-10 mt-4 flex flex-row">
                <div className="mr-4">
                    <p className="line-clamp-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>作者</p>
                    <p className="line-clamp-1 text-xs md:text-sm">{post.author}</p>
                </div>
                <div className="mr-4">
                    <p className="line-clamp-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>发布于</p>
                    <p className="line-clamp-1 text-xs md:text-sm">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleString('zh-CN')}
                        </time>
                    </p>
                </div>
                <div className="mr-4">
                    <p className="line-clamp-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>更新于</p>
                    <p className="line-clamp-1 text-xs md:text-sm">
                        <time dateTime={post.updated}>
                            {new Date(post.updated).toLocaleString('zh-CN')}
                        </time>
                    </p>
                </div>
            </nav>
        </div>
    )
}
