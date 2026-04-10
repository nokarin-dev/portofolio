import { blogPosts, getBlogPost } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, ClockIcon } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Nokarin`,
    description: post.excerpt,
  }
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let inCode = false
  let codeLines: string[] = []
  let codeLang = ""
  let key = 0

  const processInline = (text: string) => {
    // Bold
    const parts = text.split(/\*\*(.+?)\*\*/)
    return parts.map((p, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="text-white font-semibold">
          {p}
        </strong>
      ) : p.includes("`") ? (
        <span key={i}>
          {p.split(/`(.+?)`/).map((s, j) =>
            j % 2 === 1 ? (
              <code key={j} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono">
                {s}
              </code>
            ) : (
              s
            )
          )}
        </span>
      ) : (
        p
      )
    )
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true
        codeLang = line.slice(3)
        codeLines = []
      } else {
        inCode = false
        elements.push(
          <pre
            key={key++}
            className="my-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed"
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        )
        codeLines = []
      }
      continue
    }

    if (inCode) { codeLines.push(line); continue }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>)
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={key++} className="text-3xl font-extrabold text-white mb-6 tracking-tight">{line.slice(2)}</h1>)
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-zinc-400 text-sm leading-relaxed ml-4 list-disc">
          {processInline(line.slice(2))}
        </li>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-3" />)
    } else {
      elements.push(
        <p key={key++} className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          {processInline(line)}
        </p>
      )
    }
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-black px-5 sm:px-10 pt-28 pb-24">
      <article className="max-w-2xl mx-auto">
        {/* back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
        >
          <ArrowLeftIcon size={14} />
          All posts
        </Link>

        {/* meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 mb-6">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <ClockIcon size={11} />
            {post.readTime}
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-500 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* content */}
        <div className="prose-custom">{renderMarkdown(post.content)}</div>

        {/* footer nav */}
        <div className="mt-16 pt-8 border-t border-zinc-900">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors"
          >
            <ArrowLeftIcon size={14} />
            Back to all posts
          </Link>
        </div>
      </article>
    </main>
  )
}
