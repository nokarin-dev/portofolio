"use client"

import { useState, useEffect } from "react"
import { MenuIcon, XIcon, DownloadIcon } from "lucide-react"
import * as motion from "motion/react-client"
import Image from "next/image"

const NAV = [
    { label: "Features", href: "#features" },
    { label: "Platforms", href: "#platforms" },
    { label: "Specs", href: "#specs" },
    { label: "Download", href: "#download" },
]

export default function AqlossHeader() {
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
                {/* Logo */}
                <a href="/projects/aqloss" className="flex items-center gap-2.5 group">
                    <Image
                        className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                        src="/projects/aqloss/og.png"
                        alt="Aqloss logo"
                        width={32}
                        height={32}
                        priority
                    />
                    <span className="text-white font-semibold text-sm tracking-tight">Aqloss</span>
                </a>

                {/* Nav */}
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

                {/* CTA */}
                <div className="flex items-center gap-2">
                    <a
                        href="#download"
                        className="flex items-center gap-1.5 bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-zinc-200 transition"
                    >
                        <DownloadIcon size={13} />
                        Download
                    </a>
                </div>
            </div>

            {/* Mobile */}
            <div
                className={`sm:hidden flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${scrolled || open
                    ? "backdrop-blur-md bg-black/80 border border-zinc-800/70"
                    : "border border-transparent"
                    }`}
            >
                <a href="/projects/aqloss" className="flex items-center gap-2">
                    <Image
                        className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                        src="/projects/aqloss/og.png"
                        alt="Aqloss logo"
                        width={32}
                        height={32}
                    />
                    <span className="text-white font-semibold text-sm">Aqloss</span>
                </a>
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="text-zinc-400 hover:text-white transition"
                    aria-label="Toggle menu"
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