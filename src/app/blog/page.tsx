import { blogPosts } from "@/lib/blog"
import * as motion from "motion/react-client"
import Link from "next/link"
import { ArrowLeftIcon, ArrowUpRightIcon, ClockIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Nokarin",
  description: "Thoughts, articles and notes on web development and technology.",
}

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen bg-black px-5 sm:px-10 pt-28 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
        >
          <ArrowLeftIcon size={14} />
          Back to home
        </Link>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base">
            Thoughts and notes on web dev, tools, and tech.
          </p>
        </motion.div>

        {/* posts */}
        <div className="mt-16 flex flex-col gap-0">
          {sorted.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group flex flex-col gap-3 py-8 border-b border-zinc-900 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <ArrowUpRightIcon
                      size={16}
                      className="text-zinc-700 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors"
                    />
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-1">
                      <ClockIcon size={11} />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-zinc-800 text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
