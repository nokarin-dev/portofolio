import { getAllVersions, getRelease } from "@/lib/aqloss-changelog"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, GitBranchIcon } from "lucide-react"
import type { Metadata } from "next"
import * as motion from "motion/react-client"

interface Props {
    params: Promise<{ version: string }>
}

export async function generateStaticParams() {
    return getAllVersions().map((v) => ({ version: `v${v}` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { version } = await params
    const release = getRelease(version.replace(/^v/, ""))
    if (!release) return {}
    return {
        title: `v${release.version} | Aqloss Changelog`,
        description: release.summary,
    }
}

const TYPE_LABEL: Record<string, string> = {
    added: "Added",
    fixed: "Fixed",
    changed: "Changed",
    removed: "Removed",
}

const TYPE_STYLE: Record<string, { badge: string; border: string; dot: string }> = {
    added: {
        badge: "text-emerald-500 bg-emerald-950/40 border-emerald-900/50",
        border: "border-l-emerald-900/60",
        dot: "bg-emerald-500",
    },
    fixed: {
        badge: "text-blue-400 bg-blue-950/40 border-blue-900/50",
        border: "border-l-blue-900/60",
        dot: "bg-blue-400",
    },
    changed: {
        badge: "text-amber-400 bg-amber-950/40 border-amber-900/50",
        border: "border-l-amber-900/60",
        dot: "bg-amber-400",
    },
    removed: {
        badge: "text-red-400 bg-red-950/40 border-red-900/50",
        border: "border-l-red-900/60",
        dot: "bg-red-400",
    },
}

export default async function ChangelogVersionPage({ params }: Props) {
    const { version } = await params
    const release = getRelease(version.replace(/^v/, ""))
    if (!release) notFound()

    const allVersions = getAllVersions()
    const idx = allVersions.indexOf(release.version)
    const prevVersion = allVersions[idx - 1] ?? null
    const nextVersion = allVersions[idx + 1] ?? null
    const isLatest = idx === 0

    // group changes by type
    const grouped: Record<string, typeof release.changes> = {}
    const order = ["added", "fixed", "changed", "removed"]
    for (const type of order) {
        const entries = release.changes.filter((c) => c.type === type)
        if (entries.length > 0) grouped[type] = entries
    }

    const stats = order.map((t) => ({ type: t, count: (grouped[t] ?? []).length })).filter((s) => s.count > 0)

    return (
        <main className="min-h-screen bg-black text-white px-5 sm:px-10 pt-28 pb-32">
            <article className="max-w-2xl mx-auto">
                {/* back */}
                <a
                    href="/projects/aqloss/changelog"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
                >
                    <ArrowLeftIcon size={14} />
                    All releases
                </a>

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600">
                            Aqloss · Changelog
                        </p>
                        {isLatest && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                Latest
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-mono mb-4">
                        v{release.version}
                    </h1>

                    <p className="text-zinc-600 text-xs font-mono mb-6">
                        {new Date(release.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    <p className="text-zinc-400 text-base leading-relaxed mb-8">
                        {release.summary}
                    </p>

                    {/* stat pills */}
                    {stats.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                            {stats.map(({ type, count }) => (
                                <span
                                    key={type}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${TYPE_STYLE[type].badge}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${TYPE_STYLE[type].dot}`} aria-hidden />
                                    {count} {TYPE_LABEL[type]}
                                </span>
                            ))}
                        </div>
                    )}

                    {release.compareUrl && (
                        <a
                            href={release.compareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[12px] text-zinc-600 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 px-3.5 py-2 rounded-lg transition-colors mb-12"
                        >
                            <GitBranchIcon size={12} />
                            View diff on GitHub
                            <ExternalLinkIcon size={10} className="ml-0.5" />
                        </a>
                    )}
                </motion.div>

                {/* changes */}
                {release.changes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="py-16 text-center"
                    >
                        <p className="text-zinc-700 text-sm">Initial public release - no prior version to diff against.</p>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {order.filter((t) => grouped[t]).map((type, ti) => (
                            <motion.section
                                key={type}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + ti * 0.08 }}
                            >
                                <div className="flex items-center gap-2.5 mb-4">
                                    <span className={`w-2 h-2 rounded-full ${TYPE_STYLE[type].dot}`} aria-hidden />
                                    <h2 className={`text-xs font-semibold uppercase tracking-[0.18em] ${type === "added" ? "text-emerald-500"
                                        : type === "fixed" ? "text-blue-400"
                                            : type === "changed" ? "text-amber-400"
                                                : "text-red-400"
                                        }`}>
                                        {TYPE_LABEL[type]}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {grouped[type].map((change, ci) => (
                                        <div
                                            key={ci}
                                            className={`border-l-2 pl-4 py-2 ${TYPE_STYLE[type].border}`}
                                        >
                                            <p className="text-[10px] text-zinc-600 font-mono mb-1">
                                                {change.category}
                                            </p>
                                            <p className="text-sm text-zinc-300 leading-relaxed">
                                                {change.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                )}

                {/* version nav */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-zinc-900 flex items-center justify-between gap-4"
                >
                    <div>
                        {nextVersion ? (
                            <Link
                                href={`/projects/aqloss/changelog/v${nextVersion}`}
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors"
                            >
                                <ArrowLeftIcon size={14} />
                                v{nextVersion}
                            </Link>
                        ) : (
                            <span className="text-zinc-800 text-sm select-none">-</span>
                        )}
                    </div>

                    <Link
                        href="/projects/aqloss/changelog"
                        className="text-zinc-600 hover:text-zinc-300 text-xs transition-colors"
                    >
                        All releases
                    </Link>

                    <div>
                        {prevVersion ? (
                            <Link
                                href={`/projects/aqloss/changelog/v${prevVersion}`}
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors"
                            >
                                v{prevVersion}
                                <ArrowRightIcon size={14} />
                            </Link>
                        ) : (
                            <span className="text-zinc-800 text-sm select-none">-</span>
                        )}
                    </div>
                </motion.div>
            </article>
        </main>
    )
}