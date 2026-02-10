import { PostCard } from '@/components/post-card'
import { ThemeToggle } from '@/components/theme-toggle'
import { getPosts } from '@/lib/mock-posts'

export default function PostsPage() {
    const { posts } = getPosts(1, 10)

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="mx-auto max-w-6xl px-8 py-6 md:px-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                            Vidorra Blog
                        </h1>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-8 py-12 md:px-4">
                <section className="mb-12">
                    <h2 className="mb-2 text-4xl font-bold">最新文章</h2>
                    <p style={{ color: 'var(--muted-foreground)' }}>
                        探索技术，分享知识
                    </p>
                </section>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    )
}
