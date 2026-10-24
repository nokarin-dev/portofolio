"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FaAndroid, FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa"
import type { AqlossStats } from "@/lib/aqloss-stats"
import type { ChangelogRelease } from "@/lib/aqloss-changelog"
import type { RoadmapMilestone, RoadmapStatus } from "@/lib/aqloss-roadmap"
import ExpandChip from "@/components/aqloss/expand-chip"

type OS = "windows" | "linux" | "android" | "ios" | "macos" | "unknown"
type LinuxPkgFormat = "deb" | "rpm" | "appimage" | null
type Panel = "changelog" | "roadmap" | null

type DownloadOption = {
    label: string
    href: string
    pkgFormat?: LinuxPkgFormat
    primary?: boolean
}

type Platform = {
    name: string
    os: OS
    icon: React.ReactNode
    note?: string
    options: DownloadOption[]
}

const GH = "https://github.com/nokarin-dev/Aqloss"
const LATEST = `${GH}/releases/latest/download`
const NIGHTLY = `${GH}/releases/download/nightly`
const FLATHUB = "https://flathub.org/apps/xyz.nokarin.aqloss"

const PLATFORMS: Platform[] = [
    {
        name: "Windows",
        os: "windows",
        icon: <FaWindows />,
        note: "Unsigned. SmartScreen: More info, then Run anyway.",
        options: [
            { label: "Installer", href: `${LATEST}/Aqloss-windows-installer.exe`, primary: true },
            { label: "Portable", href: `${LATEST}/Aqloss-windows-portable.zip` },
        ],
    },
    {
        name: "Linux",
        os: "linux",
        icon: <FaLinux />,
        options: [
            { label: ".deb", href: `${LATEST}/Aqloss-linux-installer.deb`, pkgFormat: "deb", primary: true },
            { label: ".rpm", href: `${LATEST}/Aqloss-linux-installer.rpm`, pkgFormat: "rpm" },
            { label: "AppImage", href: `${LATEST}/Aqloss-x86_64.AppImage`, pkgFormat: "appimage" },
            { label: "tarball", href: `${LATEST}/Aqloss-linux-portable.tar.gz` },
        ],
    },
    {
        name: "Android",
        os: "android",
        icon: <FaAndroid />,
        options: [
            { label: "arm64", href: `${LATEST}/Aqloss-android-arm64.apk`, primary: true },
            { label: "arm32", href: `${LATEST}/Aqloss-android-arm32.apk` },
            { label: "x86_64", href: `${LATEST}/Aqloss-android-x86_64.apk` },
        ],
    },
    {
        name: "macOS",
        os: "macos",
        icon: <FaApple />,
        note: "Unsigned nightly. Gatekeeper: right-click, Open.",
        options: [
            { label: "DMG", href: `${NIGHTLY}/Aqloss-macos.dmg`, primary: true },
            { label: "Portable", href: `${NIGHTLY}/Aqloss-macos-portable.zip` },
        ],
    },
    {
        name: "iOS",
        os: "ios",
        icon: <FaApple />,
        note: "Unsigned nightly. Sideload only.",
        options: [{ label: "IPA", href: `${NIGHTLY}/Aqloss-ios.ipa`, primary: true }],
    },
]

const STATUS_LABEL: Record<RoadmapStatus, string> = {
    done: "Done",
    "in-progress": "In progress",
    planned: "Planned",
    backlog: "Backlog",
}

function detectLinuxPkg(ua: string): LinuxPkgFormat {
    if (/fedora|opensuse|rhel|centos|rocky|alma/.test(ua)) return "rpm"
    if (/ubuntu|debian|mint|pop!_os|pop_os/.test(ua)) return "deb"
    return "appimage"
}

function detectOS(): { os: OS; linuxPkg: LinuxPkgFormat } {
    if (typeof navigator === "undefined") return { os: "unknown", linuxPkg: null }
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) return { os: "android", linuxPkg: null }
    if (/iphone|ipod/.test(ua)) return { os: "ios", linuxPkg: null }
    if (/ipad/.test(ua) || (/macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
        return { os: "ios", linuxPkg: null }
    }
    if (/win/.test(ua)) return { os: "windows", linuxPkg: null }
    if (/mac/.test(ua)) return { os: "macos", linuxPkg: null }
    if (/linux/.test(ua)) return { os: "linux", linuxPkg: detectLinuxPkg(ua) }
    return { os: "unknown", linuxPkg: null }
}

function primaryOption(p: Platform, linuxPkg: LinuxPkgFormat): DownloadOption {
    if (p.os === "linux" && linuxPkg) {
        const match = p.options.find((o) => o.pkgFormat === linuxPkg)
        if (match) return match
    }
    return p.options.find((o) => o.primary) ?? p.options[0]
}

function formatDay(iso: string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [y, m, d] = iso.split("-")
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`
}

function parsePanel(value: string | null): Panel {
    if (value === "changelog" || value === "roadmap") return value
    return null
}

export default function AqlossPageClient({
    stats,
    changelog,
    roadmap,
}: {
    stats: AqlossStats
    changelog: ChangelogRelease[]
    roadmap: RoadmapMilestone[]
}) {
    const searchParams = useSearchParams()
    const [panel, setPanelState] = useState<Panel>(() => parsePanel(searchParams.get("panel")))
    const [{ os, linuxPkg }, setDetected] = useState<{ os: OS; linuxPkg: LinuxPkgFormat }>({
        os: "unknown",
        linuxPkg: null,
    })

    useEffect(() => {
        setDetected(detectOS())
    }, [])

    useEffect(() => {
        const onPop = () => {
            setPanelState(parsePanel(new URLSearchParams(window.location.search).get("panel")))
        }
        window.addEventListener("popstate", onPop)
        return () => window.removeEventListener("popstate", onPop)
    }, [])

    const setPanel = useCallback((next: Panel) => {
        setPanelState(next)
        const url = next ? `/projects/aqloss?panel=${next}` : "/projects/aqloss"
        window.history.replaceState(window.history.state, "", url)
    }, [])

    return (
        <div className="relative h-dvh overflow-hidden bg-[#060608] text-white">
            <div className="flex h-full flex-col items-center justify-center px-5 pb-20">
                <Image
                    src="/projects/aqloss/icon.png"
                    alt=""
                    width={56}
                    height={56}
                    className="mb-5 h-14 w-14 rounded-2xl"
                    priority
                />
                <h1 className="mb-2 text-4xl font-semibold tracking-tight">Aqloss</h1>
                <p className="mb-10 text-sm text-zinc-500">Made by me :3 · v{stats.version}</p>

                <ul className="flex max-w-xl flex-wrap justify-center gap-2">
                    {PLATFORMS.map((p) => {
                        const main = primaryOption(p, linuxPkg)
                        const rest = p.options.filter((o) => o !== main)
                        const yours = p.os === os
                        return (
                            <li key={p.name} className="w-38">
                                <a
                                    href={main.href}
                                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm ${yours
                                        ? "border-white/35 bg-white/10"
                                        : "border-white/10 bg-white/4 hover:border-white/20"
                                        }`}
                                >
                                    <span aria-hidden>{p.icon}</span>
                                    {p.name}
                                </a>
                                {rest.length > 0 && (
                                    <p className="mt-1.5 text-center text-[11px] leading-relaxed text-zinc-600">
                                        {rest.map((o, i) => (
                                            <span key={o.label}>
                                                {i > 0 && " · "}
                                                <a href={o.href} className="hover:text-zinc-400">
                                                    {o.label}
                                                </a>
                                            </span>
                                        ))}
                                        {p.os === "linux" && (
                                            <>
                                                {" · "}
                                                <a href={FLATHUB} className="hover:text-zinc-400">
                                                    Flathub
                                                </a>
                                            </>
                                        )}
                                    </p>
                                )}
                            </li>
                        )
                    })}
                </ul>

                <p className="mt-4 max-w-md text-center text-[11px] leading-relaxed text-zinc-600">
                    Windows, Linux, and Android are stable. macOS and iOS still not.
                </p>

                <a
                    href={GH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                    <FaGithub aria-hidden />
                    Source code
                </a>
            </div>

            <ExpandChip
                label="Changelog"
                side="left"
                open={panel === "changelog"}
                onOpen={() => setPanel("changelog")}
                onClose={() => setPanel(null)}
            >
                <ChangelogBody releases={changelog} />
            </ExpandChip>
            <ExpandChip
                label="Roadmap"
                side="right"
                open={panel === "roadmap"}
                onOpen={() => setPanel("roadmap")}
                onClose={() => setPanel(null)}
            >
                <RoadmapBody milestones={roadmap} />
            </ExpandChip>
        </div>
    )
}

function ChangelogBody({ releases }: { releases: ChangelogRelease[] }) {
    if (releases.length === 0) {
        return <p className="text-sm text-zinc-500">No releases yet.</p>
    }
    return (
        <ol className="flex flex-col gap-6">
            {releases.map((release, i) => (
                <li key={release.version}>
                    <Link href={`/projects/aqloss/changelog/v${release.version}`} className="group block">
                        <p className="mb-1 font-mono text-sm text-white">
                            v{release.version}
                            {i === 0 && <span className="ml-2 text-[10px] uppercase tracking-wide text-zinc-500">Latest</span>}
                        </p>
                        <p className="text-[11px] text-zinc-600">{formatDay(release.date)}</p>
                        {release.summary && (
                            <p
                                className="mt-2 text-sm leading-relaxed text-zinc-400"
                                dangerouslySetInnerHTML={{ __html: release.summary }}
                            />
                        )}
                    </Link>
                </li>
            ))}
        </ol>
    )
}

function RoadmapBody({ milestones }: { milestones: RoadmapMilestone[] }) {
    if (milestones.length === 0) {
        return <p className="text-sm text-zinc-500">Roadmap is empty.</p>
    }
    return (
        <div className="flex flex-col gap-8">
            {milestones.map((milestone) => (
                <section key={milestone.title}>
                    <p className="mb-1 font-mono text-sm text-white">{milestone.title}</p>
                    <p className="mb-3 text-[11px] text-zinc-500">
                        {STATUS_LABEL[milestone.status]} · {milestone.subtitle}
                    </p>
                    <ul className="flex flex-col gap-3">
                        {milestone.items.map((item) => (
                            <li key={item.title}>
                                <p className={`text-sm ${item.status === "done" ? "text-zinc-500 line-through" : "text-zinc-200"}`}>
                                    {item.title}
                                </p>
                                <p className="text-xs leading-relaxed text-zinc-500">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}
