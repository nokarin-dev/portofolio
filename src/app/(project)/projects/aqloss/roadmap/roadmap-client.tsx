"use client"

import * as motion from "motion/react-client"
import Link from "next/link"
import { ArrowLeftIcon, CircleCheckIcon, CircleDashedIcon, ClockIcon, GitBranchIcon } from "lucide-react"
import type { RoadmapMilestone, RoadmapStatus } from "@/lib/aqloss-roadmap"

const STATUS_CONFIG: Record<RoadmapStatus, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
    done: {
        icon: <CircleCheckIcon size={14} />,
        label: "Done",
        color: "text-emerald-500",
        bg: "bg-emerald-950/40 border-emerald-900/50",
    },
    "in-progress": {
        icon: <ClockIcon size={14} />,
        label: "In progress",
        color: "text-amber-400",
        bg: "bg-amber-950/40 border-amber-900/50",
    },
    planned: {
        icon: <CircleDashedIcon size={14} />,
        label: "Planned",
        color: "text-zinc-500",
        bg: "bg-zinc-900/40 border-zinc-800/50",
    },
}

function StatusBadge({ status }: { status: RoadmapStatus }) {
    const cfg = STATUS_CONFIG[status]
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${cfg.color} ${cfg.bg}`}>
            {cfg.icon}
            {cfg.label}
        </span>
    )
}

export default function RoadmapClient({ milestones }: { milestones: RoadmapMilestone[] }) {
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
                    transition={{ duration: 0.45 }}
                    className="mb-6"
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600 mb-3">
                        Aqloss
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Roadmap
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                        What's being worked on, what's planned, and what's sitting in the backlog waiting for upstream libraries to catch up.
                    </p>
                </motion.div>

                {/* legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-14"
                >
                    {(["in-progress", "planned", "done"] as RoadmapStatus[]).map((s) => (
                        <StatusBadge key={s} status={s} />
                    ))}
                </motion.div>

                {/* milestones */}
                <div className="flex flex-col gap-14">
                    {milestones.map((milestone, mi) => (
                        <motion.section
                            key={milestone.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.1 + mi * 0.1 }}
                        >
                            {/* milestone header */}
                            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-zinc-900">
                                <div>
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <h2 className="text-lg font-bold font-mono text-white">
                                            {milestone.title}
                                        </h2>
                                        <StatusBadge status={milestone.status} />
                                    </div>
                                    <p className="text-zinc-500 text-sm">{milestone.subtitle}</p>
                                </div>
                            </div>

                            {/* items */}
                            <div className="flex flex-col gap-3">
                                {milestone.items.map((item, ii) => {
                                    const cfg = STATUS_CONFIG[item.status]
                                    return (
                                        <div
                                            key={ii}
                                            className="flex gap-4 p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/40 transition-colors"
                                        >
                                            <span className={`shrink-0 mt-0.5 ${cfg.color}`} aria-hidden>
                                                {cfg.icon}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3 mb-1">
                                                    <p className={`text-sm font-medium ${item.status === "done" ? "text-zinc-500 line-through decoration-zinc-700" : "text-white"}`}>
                                                        {item.title}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-zinc-600 font-mono mb-2">
                                                    {item.category}
                                                </p>
                                                <p className="text-xs text-zinc-500 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <p className="text-xs text-zinc-700 leading-relaxed max-w-xs">
                        Priorities shift. Nothing here is a hard commitment - just a working list of what comes next.
                    </p>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/nokarin-dev/Aqloss/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <GitBranchIcon size={11} />
                            Open an issue
                        </a>
                        <Link
                            href="/projects/aqloss/changelog"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Changelog
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}