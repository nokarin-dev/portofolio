import { aqlossChangelog } from "@/lib/aqloss-changelog"
import * as motion from "motion/react-client"
import { ArrowLeftIcon, ArrowUpRightIcon, GitBranchIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Changelog | Aqloss",
    description: "Release history for Aqloss - every version, what changed, and what got fixed.",
}

const TYPE_COLOR: Record<string, string> = {
    added: "text-emerald-500",
    fixed: "text-blue-400",
    changed: "text-amber-400",
    removed: "text-red-400",
}

const TYPE_DOT: Record<string, string> = {
    added: "bg-emerald-500",
    fixed: "bg-blue-400",
    changed: "bg-amber-400",
    removed: "bg-red-400",
}

export default function AqlossChangelogPage() {
    const latest = aqlossChangelog[0]

    return (
        <main className="min-h-screen bg-black text-white px-5 sm:px-10 pt-28 pb-32">
            <div className="max-w-2xl mx-auto">
                {/* back */}
                <a
                    href="/projects/aqloss"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
                >
                    <ArrowLeftIcon size={14} />
                    Back to Aqloss
                </a>

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600 mb-3">
                        Aqloss
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Changelog
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                        Every release, what changed, what broke, what got fixed. Latest is{" "}
                        <span className="text-zinc-300 font-mono">v{latest.version}</span>.
                    </p>
                </motion.div>

                {/* timeline */}
                <div className="relative">
                    {/* vertical line */}
                    <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-900" aria-hidden />

                    <div className="flex flex-col gap-0">
                        {aqlossChangelog.map((release, i) => {
                            const isLatest = i === 0
                            const addedCount = release.changes.filter((c) => c.type === "added").length
                            const fixedCount = release.changes.filter((c) => c.type === "fixed").length
                            const changedCount = release.changes.filter((c) => c.type === "changed").length

                            return (
                                <motion.div
                                    key={release.version}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className="relative pl-8 pb-10"
                                >
                                    {/* dot */}
                                    <div
                                        className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 z-10 ${isLatest
                                            ? "border-white bg-white"
                                            : "border-zinc-700 bg-zinc-950"
                                            }`}
                                        aria-hidden
                                    />

                                    <a
                                        href={`/projects/aqloss/changelog/v${release.version}`}
                                        className="group block"
                                    >
                                        <div className="rounded-xl border border-zinc-900 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-900/40 p-5 transition-all duration-200">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <span className="font-mono font-semibold text-white text-sm">
                                                            v{release.version}
                                                        </span>
                                                        {isLatest && (
                                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                                                Latest
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-zinc-600 font-mono">
                                                        {new Date(release.date).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                                <ArrowUpRightIcon
                                                    size={14}
                                                    className="text-zinc-700 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors"
                                                />
                                            </div>

                                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                                {release.summary}
                                            </p>

                                            {release.changes.length > 0 && (
                                                <div className="flex items-center gap-4 text-[11px]">
                                                    {addedCount > 0 && (
                                                        <span className="flex items-center gap-1.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT.added}`} aria-hidden />
                                                            <span className={TYPE_COLOR.added}>{addedCount} added</span>
                                                        </span>
                                                    )}
                                                    {fixedCount > 0 && (
                                                        <span className="flex items-center gap-1.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT.fixed}`} aria-hidden />
                                                            <span className={TYPE_COLOR.fixed}>{fixedCount} fixed</span>
                                                        </span>
                                                    )}
                                                    {changedCount > 0 && (
                                                        <span className="flex items-center gap-1.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT.changed}`} aria-hidden />
                                                            <span className={TYPE_COLOR.changed}>{changedCount} changed</span>
                                                        </span>
                                                    )}
                                                    {release.changes.length === 0 && (
                                                        <span className="text-zinc-700">Initial release</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </a>

                                    {release.compareUrl && (
                                        <a
                                            href={release.compareUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 mt-2 ml-1 text-[11px] text-zinc-700 hover:text-zinc-400 transition-colors"
                                        >
                                            <GitBranchIcon size={10} />
                                            View diff on GitHub
                                        </a>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}