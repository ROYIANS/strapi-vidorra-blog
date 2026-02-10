import Link from 'next/link'
import type { PostSummary } from '@vidorra/types'

interface PostCardProps {
    post: PostSummary
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="group cursor-pointer">
            <Link href={`/posts/${post.slug}`}>
                <div className="overflow-hidden rounded-lg transition-all duration-300">
                    {post.cover && (
                        <div className="aspect-[2/1] w-full overflow-hidden">
                            <img
                                src={post.cover}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    )}

                    <div className="p-6" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
                        <h2 className="mb-3 text-2xl font-bold line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                            {post.title}
                        </h2>

                        <p className="mb-4 text-sm line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            <span className="flex items-center gap-1">
                                <i className="ri-user-line"></i>
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                                <i className="ri-calendar-line"></i>
                                {new Date(post.date).toLocaleDateString('zh-CN')}
                            </span>
                            {post.readTime && (
                                <span className="flex items-center gap-1">
                                    <i className="ri-time-line"></i>
                                    {post.readTime} 分钟
                                </span>
                            )}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs rounded"
                                        style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}
