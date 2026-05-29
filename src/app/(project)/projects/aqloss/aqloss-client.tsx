"use client"

import { useState, useEffect, useRef, useCallback, useId } from "react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import {
    ShieldCheckIcon, MonitorIcon, DownloadIcon, WavesIcon, CpuIcon,
    LayersIcon, ArrowRightIcon, HeadphonesIcon, ActivityIcon, XIcon,
    PackageIcon, ArchiveIcon, BoxIcon, ChevronDownIcon,
    CheckIcon, ZapIcon, ChevronRightIcon, InfoIcon, CopyIcon,
    CheckCircleIcon, ArrowUpRightIcon, ClockIcon, TagIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaAndroid, FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa"
import { RiShiningFill } from "react-icons/ri"
import type { AqlossStats } from "@/lib/aqloss-stats"

// Types
type OS = "windows" | "linux" | "android" | "unknown"
type LinuxPkgFormat = "deb" | "rpm" | "appimage" | null

type DownloadOption = {
    label: string
    description: string
    icon: React.ReactNode
    filename: string
    href: string
    tag?: string
    installHint?: string
    pkgFormat?: LinuxPkgFormat
}

type DownloadTarget = {
    name: string
    icon: React.ReactNode
    os: OS
    options: DownloadOption[]
}

// Data
const DOWNLOAD_TARGETS: DownloadTarget[] = [
    {
        name: "Windows", icon: <FaWindows />, os: "windows",
        options: [
            {
                label: "Installer", description: "Recommended. Installs to Program Files with Start Menu shortcut.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-windows-installer.exe",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-windows-installer.exe",
                tag: "Recommended",
            },
            {
                label: "Portable", description: "No installation needed. Extract and run anywhere.",
                icon: <ArchiveIcon size={16} />, filename: "Aqloss-windows-portable.zip",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-windows-portable.zip",
            },
        ],
    },
    {
        name: "Linux", icon: <FaLinux />, os: "linux",
        options: [
            {
                label: "Installer (.deb)", description: "For Debian, Ubuntu, and derivatives.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-linux-installer.deb",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-linux-installer.deb",
                tag: "Recommended",
                installHint: "sudo dpkg -i Aqloss-linux-installer.deb",
                pkgFormat: "deb",
            },
            {
                label: "Installer (.rpm)", description: "For Fedora, openSUSE, RHEL, and derivatives.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-linux-installer.rpm",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-linux-installer.rpm",
                installHint: "sudo rpm -i Aqloss-linux-installer.rpm",
                pkgFormat: "rpm",
            },
            {
                label: "AppImage", description: "Runs on most distributions without installation.",
                icon: <BoxIcon size={16} />, filename: "Aqloss-linux.AppImage",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-linux.AppImage",
                installHint: "chmod +x Aqloss-linux.AppImage && ./Aqloss-linux.AppImage",
                pkgFormat: "appimage",
            },
            {
                label: "Portable (.tar.gz)", description: "Raw binary archive. Extract and run the included executable.",
                icon: <ArchiveIcon size={16} />, filename: "Aqloss-linux-portable.tar.gz",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-linux-portable.tar.gz",
                installHint: "tar -xzf Aqloss-linux-portable.tar.gz && ./aqloss",
                pkgFormat: null,
            },
        ],
    },
    {
        name: "Android", icon: <FaAndroid />, os: "android",
        options: [
            {
                label: "APK · arm64-v8a", description: "For most modern Android phones (64-bit ARM). If unsure, start here.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-android-arm64.apk",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-android-arm64.apk",
                tag: "Most common",
            },
            {
                label: "APK · armeabi-v7a", description: "For older 32-bit ARM devices.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-android-arm32.apk",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-android-arm32.apk",
            },
            {
                label: "APK · x86_64", description: "For Android emulators and x86_64 devices.",
                icon: <PackageIcon size={16} />, filename: "Aqloss-android-x86_64.apk",
                href: "https://github.com/nokarin-dev/aqloss/releases/latest/download/Aqloss-android-x86_64.apk",
            },
        ],
    },
]

const PLATFORMS = [
    { name: "Windows", icon: <FaWindows />, sub: "WASAPI Exclusive", stable: true, detail: "Bit-perfect output via WASAPI Exclusive Mode - bypasses OS audio mixer entirely when the device supports it." },
    { name: "Linux", icon: <FaLinux />, sub: "CPAL (ALSA / PipeWire)", stable: true, detail: "Uses CPAL for cross-distro compatibility. Audio passes through PipeWire or ALSA depending on your system." },
    { name: "Android", icon: <FaAndroid />, sub: "CPAL (AAudio)", stable: true, detail: "AAudio via CPAL for low-latency output on Android 8.0+. Mixed output through the OS audio stack." },
]

const PLATFORMS_PLANNED = [
    { name: "macOS", icon: <FaApple />, sub: "Planned" },
    { name: "iOS", icon: <FaApple />, sub: "Planned" },
]

const FEATURES = [
    { icon: <WavesIcon size={18} />, title: "Hi-Res Formats", desc: "FLAC, WAV, AIFF, ALAC, MP3, AAC, OGG Vorbis, Opus - decoded up to 32-bit / 384 kHz where your hardware supports it.", extra: "Powered by the Symphonia decoder library in Rust - zero unsafe FFI wrappers, no native codec dependencies.", accentFrom: "from-blue-950/50", border: "hover:border-blue-900/70", iconColor: "group-hover:text-blue-400" },
    { icon: <CpuIcon size={18} />, title: "Rust Audio Engine", desc: "Built on Symphonia and CPAL in Rust. Minimal overhead, predictable latency, memory-safe from the ground up.", extra: "CPAL abstracts over platform audio APIs - the same Rust code drives WASAPI, ALSA, PipeWire, and AAudio.", accentFrom: "from-violet-950/50", border: "hover:border-violet-900/70", iconColor: "group-hover:text-violet-400" },
    { icon: <LayersIcon size={18} />, title: "WASAPI Exclusive", desc: "On compatible Windows hardware, Aqloss bypasses the system mixer entirely for bit-perfect output.", extra: "Falls back to WASAPI Shared automatically if the device doesn't support Exclusive mode - no crashes, no silence.", accentFrom: "from-cyan-950/50", border: "hover:border-cyan-900/70", iconColor: "group-hover:text-cyan-400" },
    { icon: <MonitorIcon size={18} />, title: "Flutter UI", desc: "One codebase across platforms. Not Electron - compiled native via Flutter. Stable on Windows and Linux.", extra: "Flutter renders via Impeller/Skia directly to the OS compositor. No web tech, no JavaScript runtime.", accentFrom: "from-emerald-950/50", border: "hover:border-emerald-900/70", iconColor: "group-hover:text-emerald-400" },
    { icon: <RiShiningFill size={18} />, title: "EQ & Processing", desc: "10-band equalizer, ReplayGain normalization, crossfade, gapless playback, and Last.fm scrobbling.", extra: "All DSP is applied in shared mode only. When WASAPI Exclusive is active, the signal path is untouched.", accentFrom: "from-amber-950/50", border: "hover:border-amber-900/70", iconColor: "group-hover:text-amber-400" },
    { icon: <ShieldCheckIcon size={18} />, title: "No Cloud, No Telemetry", desc: "Open source under GPL-3. No accounts, no tracking, no telemetry. Your library stays on your machine.", extra: "The full source is auditable on GitHub. No bundled analytics, no crash reporters, no hidden network calls.", accentFrom: "from-rose-950/50", border: "hover:border-rose-900/70", iconColor: "group-hover:text-rose-400" },
]

const SPECS = [
    { label: "Max Bit Depth", value: "32-bit float", pct: 100, ok: true },
    { label: "Max Sample Rate", value: "384 kHz", pct: 95, ok: true },
    { label: "DSD Support", value: "Not supported", pct: 0, ok: false },
    { label: "Exclusive Mode", value: "Windows only", pct: 40, ok: true },
    { label: "Shared Mode", value: "Windows · Linux", pct: 65, ok: true },
    { label: "Audio Decode", value: "Rust · Symphonia", pct: 100, ok: true },
    { label: "Output Layer", value: "WASAPI / CPAL", pct: 90, ok: true },
    { label: "License", value: "GPL-3.0", pct: 100, ok: true },
]

const FORMATS_TICKER = ["FLAC", "WAV", "AIFF", "ALAC", "MP3", "AAC", "OGG Vorbis", "Opus", "WavPack", "PCM 32-bit / 384 kHz"]

const FAQ_ITEMS = [
    { q: "Is Aqloss truly bit-perfect?", a: "On Windows with a compatible DAC/driver, yes. WASAPI Exclusive Mode bypasses the OS mixer entirely. On Linux and Android, audio passes through the OS stack (ALSA/PipeWire or AAudio), so some mixing may occur." },
    { q: "Does it support DSD?", a: "Not currently. Symphonia, the Rust decoder library Aqloss is built on, does not yet support DSD (SACD/DSF/DFF). PCM up to 32-bit / 384 kHz is fully supported." },
    { q: "Why is the app unsigned?", a: "Code signing certificates cost money and require a registered legal entity. Aqloss is a free, open-source project — all source code is auditable on GitHub so you can verify it yourself instead of trusting a signature." },
    { q: "Does it send any data over the network?", a: "Only if you enable Last.fm scrobbling, which requires your explicit opt-in and credentials. There is no telemetry, no crash reporting, and no analytics of any kind." },
    { q: "What about macOS and iOS support?", a: "Both are planned. macOS requires Apple Developer Program membership for distribution, and iOS has additional sandbox constraints. Contributions via GitHub are welcome." },
]

// Utilities
function formatDownloads(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toString()
}

function detectLinuxPkgFormat(ua: string): { hint: string | null; pkgFormat: LinuxPkgFormat } {
    if (/fedora/.test(ua)) return { hint: "Fedora", pkgFormat: "rpm" }
    if (/opensuse/.test(ua)) return { hint: "openSUSE", pkgFormat: "rpm" }
    if (/rhel|centos|rocky|alma/.test(ua)) return { hint: "RHEL-based", pkgFormat: "rpm" }
    if (/ubuntu/.test(ua)) return { hint: "Ubuntu", pkgFormat: "deb" }
    if (/debian/.test(ua)) return { hint: "Debian", pkgFormat: "deb" }
    if (/mint/.test(ua)) return { hint: "Mint", pkgFormat: "deb" }
    if (/pop!_os|pop_os/.test(ua)) return { hint: "Pop!_OS", pkgFormat: "deb" }
    return { hint: null, pkgFormat: "appimage" }
}

function detectOS(): { os: OS; hint: string | null; pkgFormat: LinuxPkgFormat } {
    if (typeof navigator === "undefined") return { os: "unknown", hint: null, pkgFormat: null }
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) return { os: "android", hint: null, pkgFormat: null }
    if (/win/.test(ua)) return { os: "windows", hint: null, pkgFormat: null }
    if (/linux/.test(ua)) {
        const { hint, pkgFormat } = detectLinuxPkgFormat(ua)
        return { os: "linux", hint, pkgFormat }
    }
    return { os: "unknown", hint: null, pkgFormat: null }
}

// Hooks
function useDetectedOS() {
    const [result, setResult] = useState<{ os: OS; hint: string | null; pkgFormat: LinuxPkgFormat }>({ os: "unknown", hint: null, pkgFormat: null })
    useEffect(() => { setResult(detectOS()) }, [])
    return result
}

const LS_KEY = "aqloss:linux-pkg-format"

function useLinuxPkgPreference(uaFormat: LinuxPkgFormat) {
    const [saved, setSaved] = useState<LinuxPkgFormat>(null)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        try {
            const v = localStorage.getItem(LS_KEY) as LinuxPkgFormat
            if (v === "deb" || v === "rpm" || v === "appimage") setSaved(v)
        } catch { /* blocked */ }
        setHydrated(true)
    }, [])

    const save = useCallback((fmt: NonNullable<LinuxPkgFormat>) => {
        setSaved(fmt)
        try { localStorage.setItem(LS_KEY, fmt) } catch { /* blocked */ }
    }, [])

    const clear = useCallback(() => {
        setSaved(null)
        try { localStorage.removeItem(LS_KEY) } catch { /* blocked */ }
    }, [])

    if (!hydrated) return { preferred: uaFormat, savedByUser: false, save, clear }
    if (saved) return { preferred: saved, savedByUser: true, save, clear }
    if (uaFormat && uaFormat !== "appimage") return { preferred: uaFormat, savedByUser: false, save, clear }
    return { preferred: null, savedByUser: false, save, clear }
}

function useScrollProgress() {
    const [pct, setPct] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])
    return pct
}

// Animate number counting up
function useCountUp(target: number, duration = 1200) {
    const [value, setValue] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (!started || target === 0) return
        const start = performance.now()
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [started, target, duration])

    return { value, start: () => setStarted(true) }
}

// Sub-components
function ScrollProgress() {
    const pct = useScrollProgress()
    return (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-1000 bg-zinc-950" aria-hidden>
            <div className="h-full bg-white/80 transition-none" style={{ width: `${pct}%` }} />
        </div>
    )
}

function GrainOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-999 opacity-[0.028]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "180px",
            }}
        />
    )
}

function HeroWaveform() {
    const TOTAL = 48
    return (
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 h-36 opacity-[0.045] pointer-events-none overflow-hidden">
            {Array.from({ length: TOTAL }).map((_, i) => {
                const h = 8 + Math.sin(i * 0.55) * 42 + Math.cos(i * 0.3) * 18
                return (
                    <span
                        key={i}
                        className="shrink-0 rounded-t-sm bg-white w-1.5 origin-bottom"
                        style={{
                            height: `${Math.max(8, h)}px`,
                            animation: `heroWave ${1.2 + (i % 7) * 0.18}s ease-in-out infinite alternate`,
                            animationDelay: `${(i % 11) * 0.09}s`,
                        }}
                    />
                )
            })}
            <style>{`@keyframes heroWave { from { transform: scaleY(0.35); } to { transform: scaleY(1); } }`}</style>
        </div>
    )
}

function MagneticButton({ children, className = "", href }: {
    children: React.ReactNode; className?: string; href?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const posRef = useRef({ x: 0, y: 0 })
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const rafRef = useRef<number | null>(null)

    const onMove = useCallback((e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        posRef.current = {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.22,
        }
        if (rafRef.current) return
        rafRef.current = requestAnimationFrame(() => {
            setPos({ ...posRef.current })
            rafRef.current = null
        })
    }, [])

    const onLeave = useCallback(() => {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
        setPos({ x: 0, y: 0 })
    }, [])

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.5 }}
            className="inline-flex"
        >
            <a href={href} className={className}>{children}</a>
        </motion.div>
    )
}

function OSRecommendBadge({ os, hint }: { os: OS; hint: string | null }) {
    if (os === "unknown") return null
    const label = os === "windows" ? "Windows" : os === "android" ? "Android" : hint ? `Linux · ${hint} detected` : "Linux"
    const icon = os === "windows" ? <FaWindows size={11} /> : os === "android" ? <FaAndroid size={11} /> : <FaLinux size={11} />
    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-[11px] text-zinc-500 border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 rounded-full mb-4"
            aria-label={`Detected OS: ${label}`}
        >
            <span className="text-zinc-600">{icon}</span>
            <span>{label} detected</span>
            <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
            <a href="#download" className="text-zinc-400 hover:text-white transition underline underline-offset-2">See your build ↓</a>
        </motion.div>
    )
}

// Live Stats Bar
interface LiveStatsBannerProps {
    stats: AqlossStats
}

function LiveStatsBanner({ stats }: LiveStatsBannerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    const totalCount = useCountUp(stats.totalDownloads, 1400)
    const ghCount = useCountUp(stats.githubDownloads, 1200)
    const flatCount = useCountUp(stats.flathubDownloads, 1200)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true)
                    totalCount.start()
                    ghCount.start()
                    flatCount.start()
                    obs.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-auto mt-10"
        >
            <div className="grid grid-cols-3 divide-x divide-zinc-900 rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-sm overflow-hidden">
                {/* Total */}
                <div className="flex flex-col items-center gap-1 py-4 px-4">
                    <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                        {stats.totalDownloads > 0 ? formatDownloads(totalCount.value) : "—"}
                    </span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Total downloads</span>
                </div>

                {/* GitHub */}
                <div className="flex flex-col items-center gap-1 py-4 px-4">
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-300 tabular-nums tracking-tight">
                        {stats.githubDownloads > 0 ? formatDownloads(ghCount.value) : "—"}
                    </span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">GitHub releases</span>
                </div>

                {/* Flathub */}
                <div className="flex flex-col items-center gap-1 py-4 px-4">
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-300 tabular-nums tracking-tight">
                        {stats.flathubDownloads > 0 ? formatDownloads(flatCount.value) : "—"}
                    </span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Flathub</span>
                </div>
            </div>

            {/* version + changelog link */}
            <div className="flex items-center justify-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                    <TagIcon size={10} />
                    <span className="font-mono">v{stats.version}</span>
                    {stats.publishedAt && (
                        <>
                            <span className="text-zinc-800">·</span>
                            <ClockIcon size={10} />
                            <span>
                                {new Date(stats.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </>
                    )}
                </div>
                <span className="text-zinc-800">·</span>
                <Link
                    href="/projects/aqloss/changelog"
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                    Changelog
                    <ArrowUpRightIcon size={10} />
                </Link>
            </div>
        </motion.div>
    )
}

// Feature Card
function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
    const [open, setOpen] = useState(false)
    const id = useId()
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            onClick={() => setOpen(v => !v)}
            className={`relative p-5 rounded-2xl border border-zinc-900 bg-zinc-950/60 ${f.border} transition-all duration-300 overflow-hidden group cursor-pointer select-none`}
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-controls={id}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(v => !v) } }}
        >
            <div className={`absolute inset-0 bg-linear-to-br ${f.accentFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-zinc-700 transition-all duration-300 ${f.iconColor}`}>
                        {f.icon}
                    </div>
                    <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}
                        className="text-zinc-700 group-hover:text-zinc-500 transition-colors mt-1" aria-hidden>
                        <ChevronRightIcon size={14} />
                    </motion.div>
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            id={id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="mt-3 pt-3 border-t border-zinc-900">
                                <p className="text-xs text-zinc-600 leading-relaxed">{f.extra}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

// Platform Card
function PlatformCard({ p, i }: { p: typeof PLATFORMS[0]; i: number }) {
    const [tip, setTip] = useState(false)
    const tipId = useId()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 transition group text-center"
        >
            <span className="text-2xl text-zinc-400 group-hover:text-zinc-200 transition" aria-hidden>{p.icon}</span>
            <div>
                <p className="font-semibold text-sm text-white">{p.name}</p>
                <p className="text-[11px] text-zinc-600 font-mono mt-0.5">{p.sub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium tracking-wide uppercase">
                <CheckIcon size={10} className="stroke-[2.5]" aria-hidden />
                Stable
            </div>
            <button
                onMouseEnter={() => setTip(true)}
                onMouseLeave={() => setTip(false)}
                onFocus={() => setTip(true)}
                onBlur={() => setTip(false)}
                onClick={(e) => { e.stopPropagation(); setTip(v => !v) }}
                className="absolute top-3 right-3 text-zinc-800 hover:text-zinc-500 transition focus:outline-none focus:text-zinc-400"
                aria-label={`Audio API details for ${p.name}`}
                aria-describedby={tip ? tipId : undefined}
            >
                <InfoIcon size={13} />
            </button>
            <AnimatePresence>
                {tip && (
                    <motion.div
                        id={tipId}
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-52 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-left z-20 pointer-events-none shadow-xl"
                    >
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{p.detail}</p>
                        <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0"
                            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #27272a" }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// Spec Card
function SpecCard({ s, i, active, onEnter, onLeave }: {
    s: typeof SPECS[0]; i: number; active: boolean; onEnter: () => void; onLeave: () => void
}) {
    const [animated, setAnimated] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true) }, { threshold: 0.3 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.045 }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onFocus={onEnter}
            onBlur={onLeave}
            tabIndex={0}
            className={`relative p-4 rounded-xl border transition-all duration-200 cursor-default overflow-hidden focus:outline-none focus:ring-1 focus:ring-zinc-700 ${active ? "border-zinc-700 bg-zinc-900" : "border-zinc-900 bg-zinc-950/60"}`}
        >
            <p className={`text-[10px] uppercase tracking-[0.18em] mb-1.5 transition-colors ${active ? "text-zinc-500" : "text-zinc-700"}`}>{s.label}</p>
            <p className={`font-semibold text-sm font-mono mb-3 transition-colors ${!s.ok ? "text-zinc-700" : active ? "text-white" : "text-zinc-300"}`}>{s.value}</p>
            <div className="h-0.5 rounded-full bg-zinc-900 overflow-hidden" role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100} aria-label={s.label}>
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${s.ok ? "bg-zinc-600" : "bg-zinc-800"}`}
                    style={{ width: animated ? `${s.pct}%` : "0%", transitionDelay: `${i * 60}ms` }}
                />
            </div>
        </motion.div>
    )
}

// Format Ticker
function FormatTicker() {
    const [paused, setPaused] = useState(false)
    const items = [...FORMATS_TICKER, ...FORMATS_TICKER, ...FORMATS_TICKER]
    return (
        <div
            className="overflow-hidden border-y border-zinc-900 py-3 relative cursor-default"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Supported audio formats"
            role="marquee"
        >
            <div aria-hidden className="absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-black to-transparent pointer-events-none" />
            <div aria-hidden className="absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-black to-transparent pointer-events-none" />
            <motion.div
                className="flex gap-3 w-max"
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                style={{ animationPlayState: paused ? "paused" : "running" }}
            >
                {items.map((f, i) => (
                    <span
                        key={i}
                        className={`shrink-0 text-xs font-mono border px-3 py-1 rounded-full transition-colors duration-200 ${paused ? "text-zinc-400 border-zinc-700" : "text-zinc-700 border-zinc-900"}`}
                    >
                        {f}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// FAQ
function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null)
    return (
        <section id="faq" className="px-6 py-24 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-12">
                <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Common questions</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FAQ.</h2>
            </motion.div>
            <div className="flex flex-col gap-2" role="list">
                {FAQ_ITEMS.map((item, i) => {
                    const isOpen = openIdx === i
                    const panelId = `faq-panel-${i}`
                    const triggerId = `faq-trigger-${i}`
                    return (
                        <motion.div
                            key={i}
                            role="listitem"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${isOpen ? "border-zinc-700 bg-zinc-900/60" : "border-zinc-900 bg-zinc-950/60"}`}
                        >
                            <button
                                id={triggerId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpenIdx(isOpen ? null : i)}
                                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus:ring-inset focus:ring-1 focus:ring-zinc-700 group"
                            >
                                <span className={`text-sm font-medium transition-colors ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                                    {item.q}
                                </span>
                                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden className="shrink-0 text-zinc-700">
                                    <ChevronDownIcon size={14} />
                                </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={triggerId}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-5 text-sm text-zinc-500 leading-relaxed border-t border-zinc-800 pt-3">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

// Copy Button
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const copy = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch { /* blocked */ }
    }, [text])
    return (
        <button
            onClick={copy}
            className="shrink-0 p-1 rounded-md text-zinc-700 hover:text-zinc-300 hover:bg-zinc-800 transition focus:outline-none focus:ring-1 focus:ring-zinc-600"
            aria-label={copied ? "Copied!" : "Copy install command"}
        >
            {copied ? <CheckCircleIcon size={12} className="text-emerald-500" /> : <CopyIcon size={12} />}
        </button>
    )
}

// Download Modal
function DownloadModal({ target, onClose, detectedOS, linuxPreference }: {
    target: DownloadTarget
    onClose: () => void
    detectedOS: OS
    linuxPreference: ReturnType<typeof useLinuxPkgPreference>
}) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { onClose(); return }
            if (e.key === "Tab" && dialogRef.current) {
                const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (e.shiftKey) {
                    if (document.activeElement === first) { e.preventDefault(); last.focus() }
                } else {
                    if (document.activeElement === last) { e.preventDefault(); first.focus() }
                }
            }
        }
        window.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        setTimeout(() => closeButtonRef.current?.focus(), 50)
        return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
    }, [onClose])

    const isCurrentOS = target.os === detectedOS
    const { preferred: linuxPkgFormat, savedByUser, save: savePkgFormat, clear: clearPkgFormat } = linuxPreference

    const recommendedIdx = (() => {
        if (target.os === "linux" && linuxPkgFormat) {
            const byFormat = target.options.findIndex(o => o.pkgFormat === linuxPkgFormat)
            if (byFormat !== -1) return byFormat
        }
        return target.options.findIndex(o => o.tag)
    })()

    const showDistropicker = target.os === "linux" && linuxPkgFormat === null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden />

            <motion.div
                ref={dialogRef}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden border border-zinc-800"
                style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #111 100%)" }}
            >
                <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-zinc-900">
                    <div aria-hidden className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 text-base">
                        {target.icon}
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-0.5">Download for</p>
                        <p id="modal-title" className="text-white font-semibold text-sm leading-none">{target.name}</p>
                    </div>
                    {isCurrentOS && (
                        <span className="text-[10px] text-emerald-600 border border-emerald-900/60 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" aria-hidden />
                            Your OS
                        </span>
                    )}
                    {target.os === "linux" && linuxPkgFormat && (
                        <button onClick={clearPkgFormat} className="text-[10px] text-zinc-700 hover:text-zinc-400 transition underline underline-offset-2 focus:outline-none" aria-label="Change Linux package format preference">change</button>
                    )}
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-zinc-600"
                        aria-label="Close download modal"
                    >
                        <XIcon size={13} />
                    </button>
                </div>

                <AnimatePresence>
                    {showDistropicker && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="mx-3 mb-1 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                                <p className="text-[11px] text-zinc-500 mb-2.5 leading-relaxed">Your distro wasn't detected. Pick your package format to get the right recommendation:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {([
                                        { fmt: "deb", label: ".deb", sub: "Ubuntu / Debian" },
                                        { fmt: "rpm", label: ".rpm", sub: "Fedora / openSUSE" },
                                        { fmt: "appimage", label: "AppImage", sub: "Any distro" },
                                    ] as const).map(({ fmt, label, sub }) => (
                                        <button
                                            key={fmt}
                                            onClick={() => savePkgFormat(fmt)}
                                            className="flex-1 min-w-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-400 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-zinc-500"
                                            aria-label={`Use ${label} packages`}
                                        >
                                            <span className="text-xs font-semibold font-mono">{label}</span>
                                            <span className="text-[10px] text-zinc-600">{sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-3 flex flex-col gap-2">
                    {target.options.map((opt, i) => (
                        <motion.div key={opt.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className={`rounded-xl border transition ${i === recommendedIdx ? "border-zinc-700 bg-zinc-900/60" : "border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/60"}`}
                        >
                            <a href={opt.href} className="group flex items-center gap-4 px-4 py-3.5" aria-label={`Download ${opt.label} for ${target.name}`}>
                                <span aria-hidden className="text-zinc-600 group-hover:text-zinc-300 transition shrink-0">{opt.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">{opt.label}</span>
                                        {i === recommendedIdx && target.os === "linux" && linuxPkgFormat && opt.pkgFormat === linuxPkgFormat ? (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                                {savedByUser ? "Your choice" : "For your distro"}
                                            </span>
                                        ) : i === recommendedIdx && opt.tag ? (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                                {opt.tag}
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{opt.description}</p>
                                    <p className="text-[10px] text-zinc-700 font-mono mt-1">{opt.filename}</p>
                                </div>
                                <DownloadIcon size={13} aria-hidden className="text-zinc-700 group-hover:text-zinc-300 transition shrink-0" />
                            </a>
                            {opt.installHint && (
                                <div className="mx-4 mb-3 flex items-center gap-2 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2">
                                    <code className="flex-1 text-[10px] text-zinc-600 font-mono truncate">{opt.installHint}</code>
                                    <CopyButton text={opt.installHint} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-[11px] text-zinc-700 pb-4 px-5">
                    All builds are unsigned. You may need to allow untrusted sources.
                </p>
            </motion.div>
        </div>
    )
}

// Main Page
interface AqlossPageClientProps {
    stats: AqlossStats
}

export default function AqlossPageClient({ stats }: AqlossPageClientProps) {
    const [activeSpec, setActiveSpec] = useState<number | null>(null)
    const [downloadTarget, setDownloadTarget] = useState<DownloadTarget | null>(null)
    const { os: detectedOS, hint: osHint, pkgFormat: uaFormat } = useDetectedOS()
    const linuxPreference = useLinuxPkgPreference(uaFormat)

    const sortedTargets = [...DOWNLOAD_TARGETS].sort((a, b) => {
        if (a.os === detectedOS) return -1
        if (b.os === detectedOS) return 1
        return 0
    })

    return (
        <div className="min-h-screen bg-black text-white font-(--font-inter) selection:bg-white/20">
            <GrainOverlay />
            <ScrollProgress />

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
                <div aria-hidden className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
                <div aria-hidden className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-105 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
                <HeroWaveform />
                <div aria-hidden className="absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-black to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 text-center max-w-3xl"
                >
                    {/* badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 border border-zinc-800 rounded-full px-4 py-1.5 mb-4 bg-zinc-950/60 backdrop-blur-md"
                    >
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/aqloss/og.png"
                            alt="Aqloss logo"
                            width={14} height={14} priority
                        />
                        <span className="text-xs text-zinc-400 font-medium tracking-wide">Aqloss</span>
                        <span className="w-px h-4 bg-zinc-800" aria-hidden />
                        <span className="text-[10px] text-zinc-600 font-mono">v{stats.version}</span>
                        <span className="w-px h-4 bg-zinc-800" aria-hidden />
                        <span className="text-[10px] text-zinc-600 font-mono">Open Source · GPL-3.0</span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-7">
                        Audio,<br /><span className="text-zinc-500">uncompromised.</span>
                    </h1>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto mb-10">
                        An open-source music player with a Rust audio engine. WASAPI Exclusive on Windows for bit-perfect output. FLAC, ALAC, WAV and more, up to 32-bit&thinsp;/&thinsp;384&thinsp;kHz.
                    </p>

                    <div className="flex flex-row gap-3 justify-center flex-wrap">
                        <MagneticButton
                            href="#download"
                            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-100 transition text-sm shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                        >
                            <DownloadIcon size={15} aria-hidden />
                            Download Free
                        </MagneticButton>
                        <MagneticButton
                            href="#features"
                            className="flex items-center gap-2 border border-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white hover:bg-zinc-900/50 transition text-sm backdrop-blur-sm"
                        >
                            <ActivityIcon size={15} aria-hidden />
                            See Features
                        </MagneticButton>
                    </div>

                    {/* platform pills */}
                    <div className="flex flex-wrap gap-2 justify-center mt-8" role="list" aria-label="Supported platforms">
                        {PLATFORMS.map((p, i) => (
                            <motion.span
                                key={p.name}
                                role="listitem"
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 + i * 0.07 }}
                                className="flex items-center gap-1.5 text-xs text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full hover:border-zinc-600 hover:text-zinc-200 transition cursor-default"
                            >
                                <span className="text-zinc-500" aria-hidden>{p.icon}</span>
                                {p.name}
                                <span className="w-1 h-1 rounded-full bg-emerald-600" aria-label="stable" />
                            </motion.span>
                        ))}
                        {PLATFORMS_PLANNED.map((p) => (
                            <span key={p.name} role="listitem" className="text-xs text-zinc-700 border border-zinc-900 px-3 py-1 rounded-full">
                                {p.name}<span className="ml-1.5 text-[10px] text-zinc-800">{p.sub}</span>
                            </span>
                        ))}
                    </div>

                    {/* OS detect badge */}
                    <div className="flex justify-center mt-5">
                        <OSRecommendBadge os={detectedOS} hint={osHint} />
                    </div>
                </motion.div>

                {/* app screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full mt-16 max-w-5xl"
                >
                    <div className="rounded-sm sm:rounded-lg lg:rounded-xl overflow-hidden border border-zinc-900 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
                        <Image
                            src="/projects/aqloss/preview.png"
                            alt="Aqloss app interface showing the music player"
                            width={1499} height={812}
                            className="w-full object-cover object-top h-44 sm:h-72 lg:h-130"
                            priority
                        />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black rounded-xl pointer-events-none" />

                    {/* stat badges */}
                    <div className="absolute bottom-6 inset-x-0 flex gap-3 flex-wrap justify-center px-4">
                        {[
                            { value: "384 kHz", label: "Max sample rate", delay: 0.7 },
                            { value: "32-bit", label: "Bit depth", delay: 0.8 },
                            { value: "Rust", label: "Audio engine", delay: 0.9 },
                        ].map(({ value, label, delay }) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -2, scale: 1.04 }}
                                className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl border border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md cursor-default"
                            >
                                <span className="font-bold text-white tracking-tight">{value}</span>
                                <span className="text-[10px] text-zinc-600 tracking-widest uppercase">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Live download stats */}
                <div className="relative z-10 w-full px-0 sm:px-6 max-w-5xl">
                    <LiveStatsBanner stats={stats} />
                </div>

                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    className="absolute bottom-7 left-1/2 -translate-x-1/2 text-zinc-700"
                    aria-hidden
                >
                    <ChevronDownIcon size={20} />
                </motion.div>
            </section>

            {/* Format Ticker */}
            <FormatTicker />

            {/* Features */}
            <section id="features" className="px-6 py-28 max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-4">
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">What it does</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-lg">Built around the audio,<br />not around the marketing.</h2>
                </motion.div>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-xs text-zinc-700 mb-12 flex items-center gap-1.5">
                    <ChevronRightIcon size={11} className="shrink-0" aria-hidden />
                    Click any card to expand details
                </motion.p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
                </div>
            </section>

            {/* Platforms */}
            <section id="platforms" className="relative px-6 py-24 border-y border-zinc-900 overflow-hidden">
                <div aria-hidden className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: "radial-gradient(circle at 60% 50%, #fff 0%, transparent 60%)" }} />
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-14 text-center">
                        <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Platform support</p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Where it runs today.</h2>
                        <p className="text-zinc-500 mt-3 text-sm leading-relaxed max-w-md mx-auto">
                            Windows and Linux are the actively maintained targets. Hover the <InfoIcon size={11} className="inline mb-0.5" aria-label="info" /> icon for audio API details.
                        </p>
                    </motion.div>
                    <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto">
                        {PLATFORMS.map((p, i) => <PlatformCard key={p.name} p={p} i={i} />)}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5 justify-center">
                        {PLATFORMS_PLANNED.map((p) => (
                            <span key={p.name} className="text-xs text-zinc-700 border border-zinc-900 px-4 py-1.5 rounded-full font-mono">
                                {p.name} — {p.sub}
                            </span>
                        ))}
                    </div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 max-w-lg mx-auto">
                        <div className="flex gap-2 p-3.5 rounded-xl bg-zinc-950 border border-zinc-900" role="note">
                            <ZapIcon size={14} className="text-amber-700 shrink-0 mt-0.5" aria-hidden />
                            <p className="text-xs text-zinc-600 leading-relaxed">
                                WASAPI Exclusive (bit-perfect) is available on Windows only when the audio device and driver support it. On Linux, audio goes through the OS mixer via CPAL.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Specs */}
            <section id="specs" className="px-6 py-28 max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-14">
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Under the hood</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical specifications.</h2>
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {SPECS.map((s, i) => (
                        <SpecCard key={s.label} s={s} i={i}
                            active={activeSpec === i}
                            onEnter={() => setActiveSpec(i)}
                            onLeave={() => setActiveSpec(null)} />
                    ))}
                </div>
            </section>

            {/* Philosophy */}
            <section className="relative px-6 py-24 border-y border-zinc-900 overflow-hidden">
                <div aria-hidden className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: "radial-gradient(circle at 40% 60%, #fff 0%, transparent 55%)" }} />
                <div className="max-w-3xl mx-auto text-center relative">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div className="inline-flex w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 items-center justify-center mb-8 mx-auto">
                            <HeadphonesIcon size={22} className="text-zinc-500" aria-hidden />
                        </div>
                        <blockquote className="text-2xl sm:text-3xl font-light text-zinc-300 leading-relaxed">
                            &ldquo;The signal path should do as little as possible between the file and your ears — and be honest about what it does.&rdquo;
                        </blockquote>
                        <div className="flex items-center justify-center gap-2 mt-8" aria-hidden>
                            <div className="h-px w-8 bg-zinc-800" />
                            <p className="text-xs text-zinc-700 tracking-widest uppercase">The Aqloss philosophy</p>
                            <div className="h-px w-8 bg-zinc-800" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* Download */}
            <section id="download" className="px-6 py-28 max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="mb-14">
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Get started</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Download Aqloss.</h2>
                    <p className="text-zinc-500 mt-3 text-sm">Free and open source. No account required.</p>
                    {detectedOS !== "unknown" && (
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            className="text-xs text-zinc-600 mt-2 flex items-center gap-1.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" aria-hidden />
                            Your platform is highlighted below
                        </motion.p>
                    )}
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sortedTargets.map((target, i) => {
                        const isDetected = target.os === detectedOS
                        return (
                            <motion.button
                                key={target.name}
                                onClick={() => setDownloadTarget(target)}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.97 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className={`group flex items-center gap-4 p-5 rounded-2xl border bg-zinc-950/60 transition-colors text-left relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-zinc-600 ${isDetected ? "border-zinc-700 bg-zinc-900/40 ring-1 ring-zinc-800" : "border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/50"}`}
                                aria-label={`Download Aqloss for ${target.name}${isDetected ? " (your platform)" : ""}`}
                            >
                                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)" }} />
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition text-lg shrink-0" aria-hidden>
                                    {target.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-white text-sm">{target.name}</span>
                                        {isDetected && (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">Your OS</span>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-zinc-600 mt-0.5">
                                        {target.options.length} {target.options.length === 1 ? "option" : "options"} available
                                    </div>
                                </div>
                                <div aria-hidden className="w-7 h-7 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-zinc-400 group-hover:border-zinc-700 group-hover:bg-zinc-800 transition">
                                    <DownloadIcon size={12} />
                                </div>
                            </motion.button>
                        )
                    })}

                    {PLATFORMS_PLANNED.map((p, i) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (DOWNLOAD_TARGETS.length + i) * 0.07 }}
                            className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-900/60 bg-zinc-950/20 cursor-not-allowed"
                            aria-label={`${p.name} — ${p.sub}`}
                        >
                            <div aria-hidden className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0" />
                            <div>
                                <div className="font-semibold text-zinc-700 text-sm">{p.name}</div>
                                <div className="text-[11px] text-zinc-800 mt-0.5">{p.sub}</div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.a
                        href="https://github.com/nokarin-dev/Aqloss"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.42 }}
                        className="group flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    >
                        <div aria-hidden className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition shrink-0">
                            <FaGithub size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-white text-sm">View on GitHub</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">Open source · GPL-3.0</div>
                        </div>
                        <ArrowRightIcon size={14} aria-hidden className="text-zinc-700 group-hover:text-zinc-400 transition group-hover:translate-x-0.5" />
                    </motion.a>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-16 border-t border-zinc-900">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2.5 mb-5">
                            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <Image className="w-6 h-6 rounded-md" src="/projects/aqloss/og.png" alt="Aqloss logo" width={15} height={15} priority />
                            </div>
                            <span className="text-white font-semibold text-sm">Aqloss</span>
                        </div>
                        <p className="text-zinc-600 text-sm">Open source music player · Rust engine · GPL-3.0</p>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <Link href="/projects/aqloss/changelog" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Changelog</Link>
                            <span className="text-zinc-800">·</span>
                            <Link href="/projects/aqloss/roadmap" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Roadmap</Link>
                            <span className="text-zinc-800">·</span>
                            <a href="https://github.com/nokarin-dev/Aqloss" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">GitHub</a>
                        </div>
                        <p className="text-zinc-700 text-xs mt-4">
                            A project by{" "}
                            <a href="https://nokarin.xyz" className="text-zinc-500 hover:text-zinc-300 transition underline underline-offset-2">nokarin</a>
                        </p>
                    </motion.div>
                </div>
            </footer>

            <AnimatePresence>
                {downloadTarget && (
                    <DownloadModal
                        target={downloadTarget}
                        onClose={() => setDownloadTarget(null)}
                        detectedOS={detectedOS}
                        linuxPreference={linuxPreference}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}