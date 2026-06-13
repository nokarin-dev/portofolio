"use client"

import { useState, useEffect } from "react"
import { MenuIcon, XIcon, DownloadIcon } from "lucide-react"
import * as motion from "motion/react-client"
import { FilmIcon } from "lucide-react"
import Image from "next/image"

const NAV = [
    { label: "Features", href: "/projects/frameextractor#features" },
    { label: "Stack", href: "/projects/frameextractor#stack" },
    { label: "Build", href: "/projects/frameextractor#build" },
    { label: "FAQ", href: "/projects/frameextractor#faq" },
]

export default function FrameExtractorHeader() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const check = () => setScrolled(window.scrollY > 40)
        check()
        window.addEventListener("scroll", check, { passive: true })
        return () => window.removeEventListener("scroll", check)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            {/* Desktop */}
            <div
                className={`hidden sm:flex items-center justify-between px-5 py-2.5 rounded-2xl max-w-4xl mx-auto transition-all duration-300 ${scrolled
                    ? "backdrop-blur-md bg-black/70 border border-zinc-800/70 shadow-lg shadow-black/40"
                    : "border border-transparent"
                    }`}
            >
                <a href="/projects/frameextractor" className="flex items-center gap-2.5 group">
                    <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition">
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/frameextractor/icon.png"
                            alt="FrameExtractor logo"
                            width={10}
                            height={10}
                            priority
                        />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight">FrameExtractor</span>
                </a>

                <nav className="flex items-center gap-1 text-sm">
                    {NAV.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-3.5 py-1.5 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-900 transition text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a
                    href="#download"
                    className="flex items-center gap-1.5 bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-zinc-200 transition"
                >
                    <DownloadIcon size={13} />
                    Download
                </a>
            </div>

            {/* Mobile */}
            <div
                className={`sm:hidden flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${scrolled || open
                    ? "backdrop-blur-md bg-black/80 border border-zinc-800/70"
                    : "border border-transparent"
                    }`}
            >
                <a href="/projects/frameextractor" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <FilmIcon size={13} />
                    </div>
                    <span className="text-white font-semibold text-sm">FrameExtractor</span>
                </a>
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="text-zinc-400 hover:text-white transition"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16 }}
                    className="sm:hidden mt-2 flex flex-col gap-1 backdrop-blur-md bg-black/90 border border-zinc-800/70 rounded-2xl p-3"
                >
                    {NAV.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 px-4 py-2.5 rounded-xl transition"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#download"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 justify-center bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-200 transition mt-1"
                    >
                        <DownloadIcon size={13} />
                        Download
                    </a>
                </motion.div>
            )}
        </header>
    )
}