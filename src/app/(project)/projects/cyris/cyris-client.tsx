"use client"

import { useState, useEffect, useRef } from "react"
import * as motion from "motion/react-client"
import { motion as m, AnimatePresence } from "motion/react"
import {
    ArrowRightIcon, ChevronDownIcon,
    SwordsIcon, CoinsIcon, ShieldCheckIcon,
    GlobeIcon, RotateCcwIcon, SparklesIcon, ZapIcon,
    MusicIcon, TrendingUpIcon, ActivityIcon,
    Gamepad2Icon, ShieldIcon, BanIcon,
} from "lucide-react"
import { FaDiscord } from "react-icons/fa"
import Image from "next/image"
import CyrisHeader from "@/components/cyris/cyris-header"

const INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1519991195005095966"
const SUPPORT_URL = "https://discord.gg/SPttF24Wjp"

type IconComponent = (props: { size?: number; className?: string }) => any

function GrainOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-999 opacity-[0.025]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "180px",
            }}
        />
    )
}

type LogSeverity = "info" | "success" | "warn"

const LOG_FEED: { icon: IconComponent; text: string; severity: LogSeverity }[] = [
    { icon: CoinsIcon, text: "Wager settled · wallet:wallet transfer, 0 rollback", severity: "success" },
    { icon: TrendingUpIcon, text: "Level up · nokarin reached LVL 25 in #general", severity: "info" },
    { icon: GlobeIcon, text: "Global match found · queue cleared in 2.1s", severity: "success" },
    { icon: BanIcon, text: "Moderation action · timeout issued, logged to #audit-log", severity: "warn" },
    { icon: MusicIcon, text: "Queue advanced · autoplay selected next track", severity: "info" },
    { icon: SwordsIcon, text: "Match started · scope: server, bet: 500 coins", severity: "info" },
]

function LogTicker() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % LOG_FEED.length), 2600)
        return () => clearInterval(id)
    }, [])

    const severityColor: Record<LogSeverity, string> = {
        info: "bg-indigo-500",
        success: "bg-emerald-500",
        warn: "bg-amber-500",
    }

    const entry = LOG_FEED[index]
    const Icon = entry.icon

    return (
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/70 backdrop-blur-sm max-w-full">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className={`absolute inline-flex h-full w-full rounded-full ${severityColor[entry.severity]} opacity-60 animate-ping`} />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${severityColor[entry.severity]}`} />
            </span>
            <AnimatePresence mode="wait">
                <m.div
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 min-w-0"
                >
                    <Icon size={11} className="text-zinc-500 shrink-0" />
                    <span className="text-zinc-400 text-[11px] font-mono truncate">{entry.text}</span>
                </m.div>
            </AnimatePresence>
        </div>
    )
}

type ModuleId = "economy" | "leveling" | "music" | "moderation" | "games"

interface OrbitModule {
    id: ModuleId
    label: string
    icon: IconComponent
    angle: number
    radius: number
    accent: string
    command: string
}

const ORBIT_MODULES: OrbitModule[] = [
    { id: "economy", label: "Economy & RPG", icon: CoinsIcon, angle: 320, radius: 200, accent: "text-amber-400", command: "/shop" },
    { id: "leveling", label: "Leveling", icon: TrendingUpIcon, angle: 30, radius: 190, accent: "text-emerald-400", command: "/rank" },
    { id: "music", label: "Music", icon: MusicIcon, angle: 100, radius: 205, accent: "text-fuchsia-400", command: "/play" },
    { id: "moderation", label: "Moderation", icon: ShieldIcon, angle: 165, radius: 195, accent: "text-sky-400", command: "/config" },
    { id: "games", label: "Minigames", icon: Gamepad2Icon, angle: 235, radius: 185, accent: "text-indigo-400", command: "/ttt queue" },
]

function polarToXY(angleDeg: number, radius: number) {
    const rad = (angleDeg - 90) * (Math.PI / 180)
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

function OrbitCard({ mod, active, onSelect }: { mod: OrbitModule; active: boolean; onSelect: (id: ModuleId) => void }) {
    const { x, y } = polarToXY(mod.angle, mod.radius)
    const Icon = mod.icon

    return (
        <m.button
            onClick={() => onSelect(mod.id)}
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay: 0.3 },
                scale: { duration: 0.5, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: mod.angle / 90 },
            }}
        >
            <div
                className={`flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${active
                    ? "border-zinc-700 bg-zinc-900/90 shadow-black/60 scale-105"
                    : "border-zinc-800/70 bg-zinc-950/80 shadow-black/40 hover:border-zinc-700"
                    }`}
            >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 bg-zinc-950 border border-zinc-800`}>
                    <Icon size={12} className={mod.accent} />
                </div>
                <span className="text-white text-[11px] sm:text-xs font-semibold whitespace-nowrap">{mod.label}</span>
            </div>
        </m.button>
    )
}

function OrbitConnections({ activeId }: { activeId: ModuleId }) {
    return (
        <svg
            viewBox="-260 -260 520 520"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
        >
            {ORBIT_MODULES.map((mod) => {
                const { x, y } = polarToXY(mod.angle, mod.radius)
                const isActive = mod.id === activeId
                return (
                    <m.line
                        key={mod.id}
                        x1={0} y1={0} x2={x} y2={y}
                        stroke={isActive ? "#818cf8" : "#3f3f46"}
                        strokeWidth={isActive ? 1.4 : 1}
                        strokeDasharray={isActive ? "0" : "3 4"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isActive ? 0.9 : 0.4 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                )
            })}
            <circle cx={0} cy={0} r={92} fill="none" stroke="#27272a" strokeWidth={1} strokeDasharray="2 6" opacity={0.5} />
            <circle cx={0} cy={0} r={205} fill="none" stroke="#18181b" strokeWidth={1} strokeDasharray="2 8" opacity={0.4} />
        </svg>
    )
}

function CoreNode({ pulse }: { pulse: boolean }) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-950 border border-indigo-500/40 flex flex-col items-center justify-center shadow-2xl shadow-indigo-950/60">
                <m.div
                    className="absolute inset-0 rounded-2xl border border-indigo-500/30"
                    animate={{ opacity: pulse ? [0.3, 0.7, 0.3] : 0.3 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <ActivityIcon size={18} className="text-indigo-400 mb-1" />
                <span className="text-white text-[10px] font-bold tracking-widest font-mono">CYRIS</span>
                <span className="text-zinc-600 text-[8px] font-mono tracking-wider">CORE</span>
            </div>
        </div>
    )
}

function EconomyPreview() {
    const items = [
        { label: "Wallet", value: "12,480" },
        { label: "Bank", value: "38,000 / 40,000" },
    ]
    return (
        <div className="w-full max-w-72 mx-auto space-y-2.5">
            {items.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl bg-zinc-950/80 border border-zinc-800/80 px-4 py-3">
                    <span className="text-zinc-500 text-xs">{item.label}</span>
                    <span className="text-white text-sm font-mono">{item.value}</span>
                </div>
            ))}
            <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/80 px-4 py-3 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Shop</span>
                <span className="text-amber-400 text-xs font-mono">Banknote · 7,500</span>
            </div>
        </div>
    )
}

function LevelingPreview() {
    return (
        <div className="w-full max-w-72 mx-auto rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4">
            <div className="flex items-center gap-3 mb-3">
                <Image
                    alt="nokarin-profile"
                    src="/favicon.ico"
                    width={128}
                    height={128}
                    className="w-11 h-11 rounded-full bg-zinc-800 border-2 border-indigo-500/60 shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">nokarin</p>
                    <p className="text-zinc-500 text-[11px]">@nokarin</p>
                </div>
                <span className="text-indigo-400 text-sm font-bold shrink-0">LVL 24</span>
            </div>
            <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full w-2/3 rounded-full" style={{ background: "linear-gradient(90deg, #4facfe, #ffffff)" }} />
            </div>
            <p className="text-zinc-600 text-[10px] font-mono mt-1.5 text-right">8,240 / 12,000 XP</p>
        </div>
    )
}

function MusicPreview() {
    return (
        <div className="w-full max-w-72 mx-auto rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                    <MusicIcon size={16} className="text-zinc-500" />
                </div>
                <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">Now Playing</p>
                    <p className="text-zinc-500 text-[11px] truncate">Autoplay · Loop off</p>
                </div>
            </div>
            <div className="flex items-center gap-1 h-6">
                {[40, 70, 45, 90, 55, 30, 65, 40, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 rounded-full bg-indigo-500/70" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    )
}

function ModerationPreview() {
    const rows = [
        { label: "Prefix", value: "!" },
        { label: "Mod log", value: "#audit-log" },
        { label: "Autorole", value: "@Member" },
    ]
    return (
        <div className="w-full max-w-72 mx-auto rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4 space-y-2.5">
            {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{row.label}</span>
                    <span className="text-zinc-300 font-mono">{row.value}</span>
                </div>
            ))}
        </div>
    )
}

function GamesPreview() {
    return (
        <div className="w-full max-w-56 mx-auto grid grid-cols-3 grid-rows-3 gap-1.5">
            {["X", "", "O", "", "X", "", "O", "", "X"].map((v, i) => (
                <div key={i} className="aspect-square rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center">
                    {v && <span className={`text-lg font-bold ${v === "X" ? "text-indigo-400" : "text-zinc-500"}`}>{v}</span>}
                </div>
            ))}
        </div>
    )
}

function ModulePreviewPanel({ activeId }: { activeId: ModuleId }) {
    const activeMod = ORBIT_MODULES.find((m) => m.id === activeId)!
    return (
        <div className="w-full max-w-xs mx-auto mt-10">
            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-sm p-5">
                <AnimatePresence mode="wait">
                    <m.div
                        key={activeId}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeId === "economy" && <EconomyPreview />}
                        {activeId === "leveling" && <LevelingPreview />}
                        {activeId === "music" && <MusicPreview />}
                        {activeId === "moderation" && <ModerationPreview />}
                        {activeId === "games" && <GamesPreview />}
                    </m.div>
                </AnimatePresence>
                <p className="text-zinc-700 text-[11px] font-mono tracking-widest uppercase mt-5 text-center">
                    {activeMod.command}
                </p>
            </div>
        </div>
    )
}

function OrbitConstellation() {
    const [active, setActive] = useState<ModuleId>("economy")

    useEffect(() => {
        const id = setInterval(() => {
            setActive((cur) => {
                const idx = ORBIT_MODULES.findIndex((m) => m.id === cur)
                return ORBIT_MODULES[(idx + 1) % ORBIT_MODULES.length].id
            })
        }, 3400)
        return () => clearInterval(id)
    }, [])

    return (
        <div>
            <div className="relative w-full max-w-130 mx-auto aspect-square scale-[0.72] sm:scale-90 md:scale-100">
                <OrbitConnections activeId={active} />
                <CoreNode pulse />
                {ORBIT_MODULES.map((mod) => (
                    <OrbitCard key={mod.id} mod={mod} active={active === mod.id} onSelect={setActive} />
                ))}
            </div>
            <ModulePreviewPanel activeId={active} />
        </div>
    )
}

function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-5 text-center pt-32 pb-16 overflow-hidden">
            <div
                aria-hidden
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full opacity-20 blur-[120px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #4f46e5 0%, transparent 70%)" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-3xl mx-auto mb-10"
            >
                <div className="mb-6 flex justify-center">
                    <LogTicker />
                </div>

                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-5 leading-[0.95] font-(family-name:--font-calsans)">
                    One bot. Five<br className="hidden sm:block" /> full systems.
                </h1>
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
                    Cyris is an enterprise-scale Discord bot running Economy &amp; RPG, Leveling, Music,
                    Moderation, and global Minigame matchmaking - as five real systems on one shared core,
                    not five toys bolted together.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href={INVITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-950"
                    >
                        <FaDiscord size={15} />
                        Add to Discord
                        <ArrowRightIcon size={14} />
                    </a>
                    <a
                        href={SUPPORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        <FaDiscord size={15} />
                        Support Server
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative z-10 w-full"
            >
                <OrbitConstellation />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <ChevronDownIcon size={18} className="text-zinc-700 animate-bounce" />
            </motion.div>
        </section>
    )
}

function FeatureCard({
    icon: Icon,
    eyebrow,
    title,
    description,
    points,
    delay = 0,
}: {
    icon: IconComponent
    eyebrow: string
    title: string
    description: string
    points: string[]
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay }}
            className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-6 sm:p-8 flex flex-col h-full"
        >
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Icon size={18} className="text-indigo-400" />
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-600 mb-2">{eyebrow}</p>
            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{description}</p>
            <ul className="mt-auto space-y-2.5 pt-5 border-t border-zinc-900">
                {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-zinc-400 text-[13px]">
                        <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        {point}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

function Features() {
    return (
        <section id="ecosystem" className="px-5 sm:px-10 py-24 sm:py-32">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-indigo-400 mb-3">A closer look</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Three systems, worth explaining properly
                    </h2>
                    <p className="text-zinc-500 text-sm mt-3 max-w-md mx-auto">
                        Cyris runs five modules in total - here&apos;s how three of the more
                        involved ones actually work under the hood.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-3 gap-5">
                    <FeatureCard
                        icon={CoinsIcon}
                        eyebrow="Economy"
                        title="Safe-Rollback Betting"
                        description="Wallets, bank storage, a full shop and inventory system, and winner-takes-all bets - engineered so a failed transaction never leaves one side short."
                        points={[
                            "Two-phase debit with automatic refund on failure",
                            "Separate wallet and bank balances, plus daily/weekly/monthly rewards",
                            "Item shop, inventories, and premium codes",
                        ]}
                        delay={0}
                    />
                    <FeatureCard
                        icon={TrendingUpIcon}
                        eyebrow="Progression"
                        title="Rank Cards"
                        description="Every message earns XP. Levels render instantly as a custom-drawn card, generated on demand for every member."
                        points={[
                            "Rendered natively with @napi-rs/canvas, no image API round-trip",
                            "Per-server leveling, on by default",
                            "Configurable level-up announcements and leaderboards",
                        ]}
                        delay={0.08}
                    />
                    <FeatureCard
                        icon={GlobeIcon}
                        eyebrow="Matchmaking"
                        title="Global Queue"
                        description="Queue up and get matched against a real opponent - from your own server or from any server Cyris is in."
                        points={[
                            "Server-only or global queue scope",
                            "Auto-expires after 5 minutes unclaimed",
                            "Optional coin wager on server matches",
                        ]}
                        delay={0.16}
                    />
                </div>
            </div>
        </section>
    )
}

function AllModulesGrid() {
    const modules = [
        {
            icon: CoinsIcon,
            title: "Economy & RPG",
            description: "Wallet, bank, shop, inventory, daily/weekly/monthly rewards, and betting.",
        },
        {
            icon: TrendingUpIcon,
            title: "Leveling",
            description: "Message-based XP, server leaderboards, and generated rank cards.",
        },
        {
            icon: MusicIcon,
            title: "Music",
            description: "Queue, search, lyrics, autoplay, audio filters, and full playback control.",
        },
        {
            icon: ShieldIcon,
            title: "Moderation & Utility",
            description: "Ban, kick, timeout, server config, welcome messages, and info commands.",
        },
        {
            icon: SwordsIcon,
            title: "Minigames",
            description: "Tic-Tac-Toe with challenges, global matchmaking, and a bot opponent.",
        },
    ]

    return (
        <section className="px-5 sm:px-10 py-20 border-t border-zinc-900">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-indigo-400 mb-3">Every module</p>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        All five, in one bot
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-5 gap-4">
                    {modules.map((mod, i) => {
                        const Icon = mod.icon
                        return (
                            <motion.div
                                key={mod.title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-5 flex flex-col gap-3"
                            >
                                <Icon size={16} className="text-indigo-400" />
                                <p className="text-white text-sm font-semibold">{mod.title}</p>
                                <p className="text-zinc-500 text-xs leading-relaxed">{mod.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function MatchmakingDetail() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section id="matchmaking" className="px-5 sm:px-10 py-24 sm:py-32 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-14 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-indigo-400 mb-3">Two scopes, one queue</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                        Play your server. Or play everyone.invite_link
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        <code className="text-zinc-300">/ttt queue</code> defaults to your own server,
                        bet included. Switch to <code className="text-zinc-300">global</code>{' '}and Cyris
                        matches you against the next person waiting anywhere it&apos;s installed - no
                        bet, pure skill.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <ShieldCheckIcon size={15} className="text-indigo-400 shrink-0" />
                            One active queue entry per scope, enforced at the database level
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <ZapIcon size={15} className="text-indigo-400 shrink-0" />
                            Matched instantly if an opponent is already waiting
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-6 sm:p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono text-zinc-600">scope: server</span>
                        <span className="text-xs font-mono text-indigo-400">scope: global</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-zinc-800 bg-black/40 p-4 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300">A</div>
                            <p className="text-[11px] text-zinc-600 text-center">This server only</p>
                        </div>
                        <div className="rounded-xl border border-indigo-500/30 bg-indigo-600/5 p-4 flex flex-col items-center gap-2">
                            <GlobeIcon size={16} className="text-indigo-400" />
                            <p className="text-[11px] text-zinc-500 text-center">Any server Cyris is in</p>
                        </div>
                    </div>
                    <p className="text-zinc-700 text-[11px] font-mono tracking-wide mt-6 text-center">
                        auto-expires · 5:00
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

function EconomyDetail() {
    return (
        <section id="economy" className="px-5 sm:px-10 py-24 sm:py-32 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-14 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="order-2 sm:order-1 rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-6 sm:p-8"
                >
                    <p className="text-[11px] font-mono text-zinc-600 mb-5">on bet settlement</p>
                    <div className="space-y-3">
                        {[
                            { label: "Debit challenger wallet", ok: true },
                            { label: "Debit opponent wallet", ok: true },
                            { label: "Start match", ok: true },
                        ].map((row) => (
                            <div key={row.label} className="flex items-center gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-zinc-400">{row.label}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-3 text-sm pt-2 border-t border-zinc-900 mt-2">
                            <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                                <RotateCcwIcon size={11} className="text-amber-400" />
                            </div>
                            <span className="text-zinc-500">If step 2 fails, step 1 is reversed automatically</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="order-1 sm:order-2"
                >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-indigo-400 mb-3">No half-settled bets</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                        Safe-Rollback, by design.
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        Bets and transfers move coins in two steps. If the second step can&apos;t
                        complete - a balance changed, a write failed - the first step is undone before
                        anyone sees a result. Nobody&apos;s wallet is left down a bet that never happened.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <SparklesIcon size={15} className="text-indigo-400 shrink-0" />
                        Wallet and bank balances tracked separately per user
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function FinalCta() {
    return (
        <section className="px-5 sm:px-10 py-24 sm:py-28 border-t border-zinc-900">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <ActivityIcon size={22} className="text-indigo-500 mx-auto mb-6" />
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Bring the whole system.
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-9 max-w-md mx-auto">
                        Add Cyris and every module is live from the first message - no setup,
                        no configuration required.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={INVITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-950"
                        >
                            <FaDiscord size={15} />
                            Add to Discord
                            <ArrowRightIcon size={14} />
                        </a>
                        <a
                            href={SUPPORT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            <FaDiscord size={15} className="text-indigo-400" />
                            Support Server
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function CyrisFooter() {
    return (
        <footer className="px-5 sm:px-10 py-10 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center overflow-hidden">
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/cyris/icon.png"
                            alt="Cyris logo"
                            width={24} height={24} priority
                        />
                    </div>
                    <span className="text-zinc-500 text-xs">
                        Cyris by{" "}
                        <a href="https://nokarin.xyz" className="text-zinc-400 hover:text-white transition-colors">
                            Nokarin
                        </a>
                    </span>
                </div>

                <div className="flex items-center gap-6 text-xs text-zinc-600">
                    <a href="/projects/cyris/terms" className="hover:text-zinc-400 transition-colors">
                        Terms
                    </a>
                    <a href="/projects/cyris/policy" className="hover:text-zinc-400 transition-colors">
                        Privacy
                    </a>
                    <a
                        href={SUPPORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-400 transition-colors flex items-center gap-1"
                    >
                        <FaDiscord size={12} />
                        Support Server
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default function CyrisClient() {
    return (
        <>
            <GrainOverlay />
            <CyrisHeader invite_link={INVITE_URL} />

            <main className="min-h-screen bg-black text-white overflow-x-hidden">
                <Hero />
                <Features />
                <AllModulesGrid />
                <MatchmakingDetail />
                <EconomyDetail />
                <FinalCta />
                <CyrisFooter />
            </main>
        </>
    )
}