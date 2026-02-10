import { notFound } from 'next/navigation'
import { PostHeader, PostContent, PostFooter } from '@/components/post-detail'
import { ThemeToggle } from '@/components/theme-toggle'
import { getPostBySlug } from '@/lib/mock-posts'
import Link from 'next/link'

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen">
            {/* Simple Header */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4 md:px-4">
                    <Link href="/posts" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <i className="ri-arrow-left-line"></i>
                        <span className="font-semibold">返回列表</span>
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-16"></div>

            {/* Main Content */}
            <main>
                <div className="rounded-sm relative" style={{ backgroundColor: 'var(--card)' }}>
                    <PostHeader post={post} />
                    <PostContent content={post.content} />
                    <PostFooter post={post} />
                </div>
            </main>
        </div>
    )
}
