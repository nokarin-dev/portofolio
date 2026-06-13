"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import {
    DownloadIcon, FilmIcon, ImageIcon, SlidersHorizontalIcon,
    ZapIcon, ChevronDownIcon, CopyIcon, CheckCircleIcon,
    PackageIcon, ArchiveIcon, BoxIcon,
    ScrollTextIcon, GitBranchIcon, XIcon, ChevronRightIcon,
    ArrowRightIcon,
    TagIcon,
    ClockIcon,
    ArrowUpRightIcon,
} from "lucide-react"
import { FaGithub, FaWindows, FaLinux, FaAndroid } from "react-icons/fa"
import { SiYoutube, SiFlutter, SiFfmpeg } from "react-icons/si"
import type { FrameExtractorStats } from "@/lib/frameextractor-stats"
import Image from "next/image"
import Link from "next/link"

// Types
type OS = "windows" | "linux" | "android" | "unknown"
type LinuxPkg = "deb" | "rpm" | "appimage" | "portable" | null

type DownloadOption = {
    label: string
    filename: string
    href: string
    icon: React.ReactNode
    note: string
    tag?: string
    hint?: string
    pkg?: LinuxPkg
}

type DownloadTarget = {
    os: OS
    name: string
    icon: React.ReactNode
    options: DownloadOption[]
}

// Data
const BASE_DL = "https://github.com/nokarin-dev/FrameExtractor/releases/latest/download"

const DOWNLOAD_TARGETS: DownloadTarget[] = [
    {
        os: "windows",
        name: "Windows",
        icon: <FaWindows />,
        options: [
            {
                label: "Installer",
                filename: "FrameExtractor-windows-installer.exe",
                href: `${BASE_DL}/FrameExtractor-windows-installer.exe`,
                icon: <PackageIcon size={15} />,
                note: "Installs with Start Menu shortcut",
                tag: "Recommended",
            },
            {
                label: "Portable",
                filename: "FrameExtractor-windows-portable.zip",
                href: `${BASE_DL}/FrameExtractor-windows-portable.zip`,
                icon: <ArchiveIcon size={15} />,
                note: "Extract and run anywhere",
            },
        ],
    },
    {
        os: "linux",
        name: "Linux",
        icon: <FaLinux />,
        options: [
            {
                label: "Installer (.deb)",
                filename: "FrameExtractor-linux-installer.deb",
                href: `${BASE_DL}/FrameExtractor-linux-installer.deb`,
                icon: <PackageIcon size={15} />,
                note: "Ubuntu, Debian, Mint",
                tag: "Recommended",
                hint: "sudo dpkg -i FrameExtractor-linux-installer.deb",
                pkg: "deb",
            },
            {
                label: "Installer (.rpm)",
                filename: "FrameExtractor-linux-installer.rpm",
                href: `${BASE_DL}/FrameExtractor-linux-installer.rpm`,
                icon: <PackageIcon size={15} />,
                note: "Fedora, openSUSE, RHEL",
                hint: "sudo rpm -i FrameExtractor-linux-installer.rpm",
                pkg: "rpm",
            },
            {
                label: "AppImage",
                filename: "FrameExtractor-linux.AppImage",
                href: `${BASE_DL}/FrameExtractor-linux.AppImage`,
                icon: <BoxIcon size={15} />,
                note: "Runs on most distros without install",
                hint: "chmod +x FrameExtractor-linux.AppImage && ./FrameExtractor-linux.AppImage",
                pkg: "appimage",
            },
            {
                label: "Portable (.tar.gz)",
                filename: "FrameExtractor-linux-portable.tar.gz",
                href: `${BASE_DL}/FrameExtractor-linux-portable.tar.gz`,
                icon: <ArchiveIcon size={15} />,
                note: "Extract and run the binary",
                hint: "tar -xzf FrameExtractor-linux-portable.tar.gz && ./FrameExtractor",
                pkg: "portable",
            },
        ],
    },
    {
        os: "android",
        name: "Android",
        icon: <FaAndroid />,
        options: [
            {
                label: "APK · arm64-v8a",
                filename: "FrameExtractor-android-arm64.apk",
                href: `${BASE_DL}/FrameExtractor-android-arm64.apk`,
                icon: <PackageIcon size={15} />,
                note: "Most modern phones (64-bit ARM)",
                tag: "Most common",
            },
            {
                label: "APK · armeabi-v7a",
                filename: "FrameExtractor-android-arm32.apk",
                href: `${BASE_DL}/FrameExtractor-android-arm32.apk`,
                icon: <PackageIcon size={15} />,
                note: "Older 32-bit ARM devices",
            },
            {
                label: "APK · x86_64",
                filename: "FrameExtractor-android-x86_64.apk",
                href: `${BASE_DL}/FrameExtractor-android-x86_64.apk`,
                icon: <PackageIcon size={15} />,
                note: "Emulators and Chromebooks",
            },
        ],
    },
]

const FEATURES = [
    {
        icon: <FilmIcon size={17} />,
        title: "Local video extraction",
        desc: "Pick any local video file and extract frames by precise start and end timestamps.",
        extra: "Supports any container FFmpeg handles - MP4, MKV, AVI, MOV, WebM, and more.",
        color: "text-sky-400",
        glow: "from-sky-950/50",
        border: "hover:border-sky-900/60",
        iconHover: "group-hover:text-sky-400",
    },
    {
        icon: <SiYoutube size={15} />,
        title: "YouTube URL support",
        desc: "Paste a YouTube link, pick your quality, and extract frames directly.",
        extra: "No manual download step. yt-dlp streams the video to FFmpeg in real time.",
        color: "text-red-400",
        glow: "from-red-950/50",
        border: "hover:border-red-900/60",
        iconHover: "group-hover:text-red-400",
    },
    {
        icon: <SlidersHorizontalIcon size={17} />,
        title: "Adjustable FPS",
        desc: "1 to 60 frames per second. Pull one frame every few seconds or every single frame.",
        extra: "Combined with time range controls, you can extract exactly what you need from a specific window.",
        color: "text-violet-400",
        glow: "from-violet-950/50",
        border: "hover:border-violet-900/60",
        iconHover: "group-hover:text-violet-400",
    },
    {
        icon: <ImageIcon size={17} />,
        title: "PNG, JPG, WebP, BMP",
        desc: "Four output formats with quality and scale controls before extraction starts.",
        extra: "PNG for lossless frames. JPG or WebP when file size matters. BMP if you need raw bitmap output.",
        color: "text-emerald-400",
        glow: "from-emerald-950/50",
        border: "hover:border-emerald-900/60",
        iconHover: "group-hover:text-emerald-400",
    },
    {
        icon: <ScrollTextIcon size={17} />,
        title: "Live process log",
        desc: "Watch FFmpeg and yt-dlp output stream in real time as extraction runs.",
        extra: "Copy the full log to clipboard in one click. Useful for debugging failed extractions.",
        color: "text-amber-400",
        glow: "from-amber-950/50",
        border: "hover:border-amber-900/60",
        iconHover: "group-hover:text-amber-400",
    },
    {
        icon: <ZapIcon size={17} />,
        title: "Batteries included",
        desc: "FFmpeg and yt-dlp are bundled inside the app. No PATH fiddling, no manual setup.",
        extra: "The prepare script downloads and bundles the correct binaries for each platform at build time.",
        color: "text-rose-400",
        glow: "from-rose-950/50",
        border: "hover:border-rose-900/60",
        iconHover: "group-hover:text-rose-400",
    },
]

const BUILD_STEPS = [
    { cmd: "git clone -b flutter https://github.com/nokarin-dev/FrameExtractor.git", comment: "# flutter branch" },
    { cmd: "cd FrameExtractor && flutter pub get", comment: "# dependencies" },
    { cmd: "python3 scripts/prepare_binaries.py --platform windows linux", comment: "# bundle FFmpeg + yt-dlp" },
    { cmd: "flutter run -d linux", comment: "# run" },
]

const BUILD_TARGETS = [
    { platform: "Windows · installer", cmd: "flutter build windows --release --dart-define=PORTABLE=false" },
    { platform: "Windows · portable", cmd: "flutter build windows --release --dart-define=PORTABLE=true" },
    { platform: "Linux · installer", cmd: "flutter build linux --release --dart-define=PORTABLE=false" },
    { platform: "Linux · portable", cmd: "flutter build linux --release --dart-define=PORTABLE=true" },
    { platform: "Android · split APK", cmd: "flutter build apk --release --split-per-abi" },
]

const FAQ = [
    {
        q: "Do I need to install FFmpeg or yt-dlp separately?",
        a: "No. Both are bundled inside the app. You don't touch PATH, you don't configure anything. Just open FrameExtractor and start extracting.",
    },
    {
        q: "What video formats are supported?",
        a: "Anything FFmpeg handles - MP4, MKV, AVI, MOV, WebM, and more. For YouTube, yt-dlp handles format selection automatically based on your quality pick.",
    },
    {
        q: "Why Flutter and not Electron?",
        a: "Electron ships a full Chromium instance. Flutter compiles to native code - smaller binary, no browser overhead, consistent rendering on Windows, Linux, and Android from a single codebase.",
    },
    {
        q: "Is the APK signed?",
        a: "The APK is unsigned, so you'll need to enable 'Install unknown apps' in your Android settings. All source is auditable on GitHub.",
    },
    {
        q: "Why GPL-3.0?",
        a: "FFmpeg and yt-dlp are GPL-licensed, so any bundled distribution inherits that. The full source is on GitHub.",
    },
]

// Helpers
function detectOS(): OS {
    if (typeof navigator === "undefined") return "unknown"
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) return "android"
    if (/win/.test(ua)) return "windows"
    if (/linux/.test(ua)) return "linux"
    return "unknown"
}

function useDetectedOS() {
    const [os, setOS] = useState<OS>("unknown")
    useEffect(() => setOS(detectOS()), [])
    return os
}

function useCountUp(target: number, duration = 1400) {
    const [val, setVal] = useState(0)
    const [go, setGo] = useState(false)
    useEffect(() => {
        if (!go || !target) return
        const t0 = performance.now()
        const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
            if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [go, target, duration])
    return { val, start: () => setGo(true) }
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
            aria-label={copied ? "Copied!" : "Copy command"}
        >
            {copied
                ? <CheckCircleIcon size={12} className="text-emerald-500" />
                : <CopyIcon size={12} />
            }
        </button>
    )
}

function formatDownloads(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toString()
}

// Feature card with expand
function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
    const [open, setOpen] = useState(false)
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
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(v => !v) } }}
        >
            <div className={`absolute inset-0 bg-linear-to-br ${f.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-zinc-700 transition-all duration-300 ${f.iconHover}`}>
                        {f.icon}
                    </div>
                    <motion.div
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-700 group-hover:text-zinc-500 transition-colors mt-1"
                        aria-hidden
                    >
                        <ChevronRightIcon size={14} />
                    </motion.div>
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{f.desc}</p>
                <AnimatePresence>
                    {open && (
                        <motion.div
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

// Download modal
function DownloadModal({
    target,
    detectedOS,
    onClose,
}: {
    target: DownloadTarget
    detectedOS: OS
    onClose: () => void
}) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { onClose(); return }
            if (e.key === "Tab" && dialogRef.current) {
                const els = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
                const first = els[0]; const last = els[els.length - 1]
                if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
                else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
            }
        }
        window.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        setTimeout(() => closeRef.current?.focus(), 50)
        return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
    }, [onClose])

    const isCurrentOS = target.os === detectedOS
    const recommendedIdx = target.options.findIndex(o => o.tag)

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
                {/* header */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-zinc-900">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 text-base" aria-hidden>
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
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-zinc-600"
                        aria-label="Close"
                    >
                        <XIcon size={13} />
                    </button>
                </div>

                {/* options */}
                <div className="p-3 flex flex-col gap-2">
                    {target.options.map((opt, i) => (
                        <motion.div
                            key={opt.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className={`rounded-xl border transition ${i === recommendedIdx ? "border-zinc-700 bg-zinc-900/60" : "border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/60"}`}
                        >
                            <a
                                href={opt.href}
                                className="group flex items-center gap-4 px-4 py-3.5"
                                aria-label={`Download ${opt.label} for ${target.name}`}
                            >
                                <span className="text-zinc-600 group-hover:text-zinc-300 transition shrink-0" aria-hidden>{opt.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">{opt.label}</span>
                                        {opt.tag && (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                                {opt.tag}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{opt.note}</p>
                                    <p className="text-[10px] text-zinc-700 font-mono mt-1 truncate">{opt.filename}</p>
                                </div>
                                <DownloadIcon size={13} className="text-zinc-700 group-hover:text-zinc-300 transition shrink-0" aria-hidden />
                            </a>
                            {opt.hint && (
                                <div className="mx-4 mb-3 flex items-center gap-2 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2">
                                    <code className="flex-1 text-[10px] text-zinc-600 font-mono truncate">{opt.hint}</code>
                                    <CopyButton text={opt.hint} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {target.os === "android" && (
                    <p className="text-center text-[11px] text-zinc-700 pb-4 px-5">
                        APKs are unsigned - enable "Install unknown apps" in Android settings.
                    </p>
                )}
            </motion.div>
        </div>
    )
}

// FAQ section
function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null)
    return (
        <section id="faq" className="px-6 py-24 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="mb-12"
            >
                <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Common questions</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FAQ.</h2>
            </motion.div>
            <div className="flex flex-col gap-2" role="list">
                {FAQ.map((item, i) => {
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

// Main
export default function FrameExtractorClient({ stats }: { stats: FrameExtractorStats }) {
    const detectedOS = useDetectedOS()
    const [dlTarget, setDlTarget] = useState<DownloadTarget | null>(null)
    const [buildIdx, setBuildIdx] = useState(0)
    const statsRef = useRef<HTMLDivElement>(null)

    const totalCount = useCountUp(stats.totalDownloads, 1400)
    const ghCount = useCountUp(stats.githubDownloads, 1200)
    const flatCount = useCountUp(stats.flathubDownloads, 1200)

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                totalCount.start();
                ghCount.start();
                flatCount.start();
                obs.disconnect()
            }
        }, { threshold: 0.4 })
        if (statsRef.current) obs.observe(statsRef.current)
        return () => obs.disconnect()
    }, [])

    const sortedTargets = [...DOWNLOAD_TARGETS].sort((a) => (a.os === detectedOS ? -1 : 1))

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            <GrainOverlay />
            <ScrollProgress />

            {/* ── Hero ── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                    }}
                />
                <div
                    aria-hidden
                    className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-105 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.055) 0%, transparent 70%)" }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 text-center max-w-3xl"
                >
                    {/* badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 border border-zinc-800 rounded-full px-4 py-1.5 mb-4 bg-zinc-950/60 backdrop-blur-md"
                    >
                        <Image
                            className="w-5 h-5 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/frameextractor/icon.png"
                            alt="FrameExtractor logo"
                            width={10}
                            height={10}
                            priority
                        />
                        <span className="text-xs text-zinc-400 font-medium tracking-wide">FrameExtractor</span>
                        <span className="w-px h-4 bg-zinc-800" aria-hidden />
                        <span className="text-[10px] text-zinc-600 font-mono">v{stats.version}</span>
                        <span className="w-px h-4 bg-zinc-800" aria-hidden />
                        <span className="text-[10px] text-zinc-600 font-mono">Open Source · GPL-3.0</span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-7">
                        Effortless video<br />
                        <span className="text-zinc-500">frame extraction.</span>
                    </h1>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto mb-10">
                        Cross-platform video frame extractor built with Flutter. Local files and YouTube URLs, powered by FFmpeg and yt-dlp - everything bundled, nothing to configure.
                    </p>

                    <div className="flex flex-row gap-3 justify-center flex-wrap">
                        <a
                            href="#download"
                            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-100 transition text-sm shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                        >
                            <DownloadIcon size={15} aria-hidden />
                            Download Free
                        </a>
                        <a
                            href="https://github.com/nokarin-dev/FrameExtractor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white hover:bg-zinc-900/50 transition text-sm backdrop-blur-sm"
                        >
                            <FaGithub size={14} aria-hidden />
                            GitHub
                        </a>
                    </div>

                    {/* platform pills */}
                    <div className="flex flex-wrap gap-2 justify-center mt-8" role="list" aria-label="Supported platforms">
                        {[
                            { icon: <FaWindows size={11} />, label: "Windows" },
                            { icon: <FaLinux size={11} />, label: "Linux" },
                            { icon: <FaAndroid size={11} />, label: "Android" },
                        ].map(({ icon, label }) => (
                            <motion.span
                                key={label}
                                role="listitem"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                className="flex items-center gap-1.5 text-xs text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full hover:border-zinc-600 hover:text-zinc-200 transition cursor-default"
                            >
                                <span className="text-zinc-500" aria-hidden>{icon}</span>
                                {label}
                                <span className="w-1 h-1 rounded-full bg-emerald-600" aria-label="stable" />
                            </motion.span>
                        ))}
                    </div>

                    {/* OS detect hint */}
                    {detectedOS !== "unknown" && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 text-[11px] text-zinc-500 border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 rounded-full mt-5"
                        >
                            <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                            {detectedOS === "windows" ? "Windows" : detectedOS === "android" ? "Android" : "Linux"} detected
                            <a href="#download" className="text-zinc-400 hover:text-white transition underline underline-offset-2">See your build ↓</a>
                        </motion.div>
                    )}
                </motion.div>

                {/* stats */}
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="relative z-10 w-full max-w-3xl mx-auto mt-14"
                >
                    <div className="grid grid-cols-3 divide-x divide-zinc-900 rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-sm overflow-hidden">
                        {/* Total */}
                        <div className="flex flex-col items-center gap-1 py-4 px-4">
                            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                                {stats.totalDownloads > 0 ? formatDownloads(totalCount.val) : "—"}
                            </span>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Total downloads</span>
                        </div>

                        {/* GitHub */}
                        <div className="flex flex-col items-center gap-1 py-4 px-4">
                            <span className="text-2xl sm:text-3xl font-bold text-zinc-300 tabular-nums tracking-tight">
                                {stats.githubDownloads > 0 ? formatDownloads(ghCount.val) : "—"}
                            </span>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">GitHub releases</span>
                        </div>

                        {/* Flathub */}
                        <div className="flex flex-col items-center gap-1 py-4 px-4">
                            <span className="text-2xl sm:text-3xl font-bold text-zinc-300 tabular-nums tracking-tight">
                                {stats.flathubDownloads > 0 ? formatDownloads(flatCount.val) : "—"}
                            </span>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Flathub</span>
                        </div>
                    </div>
                    {stats.publishedAt && (
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
                    )}
                </motion.div>

                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    className="absolute bottom-7 left-1/2 -translate-x-1/2 text-zinc-700"
                    aria-hidden
                >
                    <ChevronDownIcon size={20} />
                </motion.div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="px-6 py-28 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="mb-4"
                >
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">What it does</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-lg">
                        Simple controls.<br />Precise output.
                    </h2>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-xs text-zinc-700 mb-12 flex items-center gap-1.5"
                >
                    <ChevronRightIcon size={11} className="shrink-0" aria-hidden />
                    Click any card to expand details
                </motion.p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
                </div>
            </section>

            {/* ── Stack ── */}
            <section id="stack" className="border-y border-zinc-900 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-14 text-center"
                    >
                        <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Under the hood</p>
                        <h2 className="text-3xl font-bold tracking-tight">Built on solid foundations.</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                        {[
                            {
                                name: "Flutter 3.22",
                                role: "Cross-platform UI",
                                icon: <SiFlutter size={16} />,
                                note: "One codebase for Windows, Linux, and Android. Not Electron - compiled native.",
                                accent: "group-hover:text-sky-400",
                            },
                            {
                                name: "FFmpeg",
                                role: "Video decode & frame output",
                                icon: <SiFfmpeg size={16} />,
                                note: "Bundled inside the app. Handles every container and codec. No manual install.",
                                accent: "group-hover:text-emerald-400",
                            },
                            {
                                name: "yt-dlp",
                                role: "YouTube downloader",
                                icon: <ScrollTextIcon size={16} />,
                                note: "Bundled alongside FFmpeg. Picks the right quality, streams to FFmpeg, done.",
                                accent: "group-hover:text-red-400",
                            },
                        ].map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group p-5 rounded-2xl border border-zinc-900 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-900/40 transition-all cursor-default"
                            >
                                <div className={`w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 ${t.accent} group-hover:border-zinc-700 transition mb-4`}>
                                    {t.icon}
                                </div>
                                <p className="text-sm font-semibold text-white mb-0.5">{t.name}</p>
                                <p className="text-[10px] text-zinc-600 mb-3 uppercase tracking-wide">{t.role}</p>
                                <p className="text-xs text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">{t.note}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Build from source ── */}
            <section id="build" className="px-6 py-24 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Build from source</p>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Requires Flutter 3.22+.</h2>
                    <p className="text-zinc-500 text-sm">FFmpeg and yt-dlp are fetched and bundled via the prepare script. Python 3.8+ required for that step.</p>
                </motion.div>

                {/* clone & run */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden mb-4"
                    style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #111 100%)" }}
                >
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-900 bg-black/40">
                        <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-zinc-800" />)}
                        </div>
                        <span className="text-[10px] text-zinc-700 font-mono ml-2">bash</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2.5">
                        {BUILD_STEPS.map((s, i) => (
                            <div key={i} className="flex items-center gap-3 group">
                                <span className="text-zinc-800 text-[10px] font-mono select-none w-3">{i + 1}</span>
                                <code className="flex-1 text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition break-all">{s.cmd}</code>
                                <span className="text-[10px] font-mono text-zinc-800 shrink-0 hidden sm:block">{s.comment}</span>
                                <CopyButton text={s.cmd} />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* release builds */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-zinc-900 bg-zinc-950/60 overflow-hidden"
                >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900 flex-wrap">
                        <PackageIcon size={12} className="text-zinc-600" />
                        <span className="text-xs text-zinc-500">Release builds</span>
                        <div className="ml-auto flex gap-1 flex-wrap">
                            {BUILD_TARGETS.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => setBuildIdx(i)}
                                    className={`text-[9px] px-2 py-0.5 rounded-md transition ${buildIdx === i ? "bg-zinc-800 text-zinc-300" : "text-zinc-700 hover:text-zinc-400"}`}
                                >
                                    {t.platform}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={buildIdx}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-3 group"
                            >
                                <code className="flex-1 text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition break-all">
                                    {BUILD_TARGETS[buildIdx].cmd}
                                </code>
                                <CopyButton text={BUILD_TARGETS[buildIdx].cmd} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </section>

            {/* ── Download ── */}
            <section id="download" className="px-6 py-28 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="mb-14"
                >
                    <p className="text-xs tracking-[0.22em] uppercase text-zinc-600 mb-3">Get started</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Download FrameExtractor.</h2>
                    <p className="text-zinc-500 mt-3 text-sm">Free and open source. No account required.</p>
                    {detectedOS !== "unknown" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
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
                                onClick={() => setDlTarget(target)}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.97 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className={`group flex items-center gap-4 p-5 rounded-2xl border bg-zinc-950/60 transition-colors text-left relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-zinc-600 ${isDetected ? "border-zinc-700 bg-zinc-900/40 ring-1 ring-zinc-800" : "border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/50"}`}
                                aria-label={`Download FrameExtractor for ${target.name}${isDetected ? " (your platform)" : ""}`}
                            >
                                <div
                                    aria-hidden
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)" }}
                                />
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition text-lg shrink-0" aria-hidden>
                                    {target.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-white text-sm">{target.name}</span>
                                        {isDetected && (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-900/60 px-1.5 py-0.5 rounded-full">
                                                Your OS
                                            </span>
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

                    <motion.a
                        href="https://github.com/nokarin-dev/FrameExtractor/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.97 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        className="group flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    >
                        <div aria-hidden className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition shrink-0">
                            <FaGithub size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-white text-sm">View on GitHub</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">Source code · releases · issues</div>
                        </div>
                        <ArrowRightIcon size={14} aria-hidden className="text-zinc-700 group-hover:text-zinc-400 transition group-hover:translate-x-0.5" />
                    </motion.a>
                </div>
            </section>

            {/* ── FAQ ── */}
            <FAQSection />

            {/* ── Footer ── */}
            <footer className="px-6 py-16 border-t border-zinc-900">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2.5 mb-5">
                            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <Image
                                    className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                                    src="/projects/frameextractor/icon.png"
                                    alt="FrameExtractor logo"
                                    width={10}
                                    height={10}
                                    priority
                                />
                            </div>
                            <span className="text-white font-semibold text-sm">FrameExtractor</span>
                        </div>
                        <p className="text-zinc-600 text-sm">Cross-platform video frame extractor · Flutter · FFmpeg · yt-dlp · GPL-3.0</p>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <a
                                href="https://github.com/nokarin-dev/FrameExtractor/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors flex items-center gap-1"
                            >
                                <GitBranchIcon size={10} /> Releases
                            </a>
                            <span className="text-zinc-800">·</span>
                            <a
                                href="https://github.com/nokarin-dev/FrameExtractor/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors"
                            >
                                Issues
                            </a>
                            <span className="text-zinc-800">·</span>
                            <a href="https://nokarin.xyz" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">
                                nokarin.xyz
                            </a>
                        </div>
                        <p className="text-zinc-700 text-xs mt-4">
                            A project by{" "}
                            <a href="https://nokarin.xyz" className="text-zinc-500 hover:text-zinc-300 transition underline underline-offset-2">
                                nokarin
                            </a>
                        </p>
                    </motion.div>
                </div>
            </footer>

            {/* Download modal */}
            <AnimatePresence>
                {dlTarget && (
                    <DownloadModal
                        target={dlTarget}
                        detectedOS={detectedOS}
                        onClose={() => setDlTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}