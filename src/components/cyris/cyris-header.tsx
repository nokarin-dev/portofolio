"use client"

import { useState, useEffect } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { FaDiscord } from "react-icons/fa"
import { motion as m, AnimatePresence } from "motion/react"

export default function CyrisHeader({ invite_link }: { invite_link: any }) {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const check = () => setScrolled(window.scrollY > 40)
        check()
        window.addEventListener("scroll", check, { passive: true })
        return () => window.removeEventListener("scroll", check)
    }, [])

    const navLinks = [
        { label: "Ecosystem", href: "#ecosystem" },
        { label: "Matchmaking", href: "#matchmaking" },
        { label: "Economy", href: "#economy" },
        { label: "Terms", href: "/projects/cyris/terms" },
        { label: "Privacy", href: "/projects/cyris/policy" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            {/* Desktop */}
            <div
                className={`hidden sm:flex items-center justify-between px-5 py-2.5 rounded-2xl max-w-4xl mx-auto transition-all duration-300 ${scrolled
                    ? "backdrop-blur-md bg-black/70 border border-zinc-800/70 shadow-lg shadow-black/40"
                    : "border border-transparent"
                    }`}
            >
                <a href="/projects/cyris" className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center overflow-hidden">
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/cyris/icon.png"
                            alt="Cyris logo"
                            width={24} height={24} priority
                        />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight">Cyris</span>
                </a>

                <nav className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-zinc-500 hover:text-white text-[13px] font-medium transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a
                    href={invite_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-full font-medium transition-colors"
                >
                    <FaDiscord size={13} />
                    Add to Discord
                </a>
            </div>

            {/* Mobile */}
            <div className="sm:hidden flex items-center justify-between px-4 py-3">
                <a href="/projects/cyris" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center overflow-hidden">
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/cyris/icon.png"
                            alt="Cyris logo"
                            width={24} height={24} priority
                        />
                    </div>
                    <span className="text-white font-semibold text-sm">Cyris</span>
                </a>
                <button
                    onClick={() => setOpen((o) => !o)}
                    className="text-zinc-400 hover:text-white transition-colors p-1"
                    aria-label="Toggle menu"
                >
                    {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <m.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="sm:hidden mx-4 mt-2 rounded-2xl border border-zinc-800/70 bg-black/90 backdrop-blur-md overflow-hidden"
                    >
                        <nav className="flex flex-col divide-y divide-zinc-900">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-3.5 text-zinc-300 text-sm font-medium hover:bg-zinc-900/60 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={invite_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3.5 text-indigo-400 text-sm font-semibold hover:bg-zinc-900/60 transition-colors flex items-center gap-2"
                            >
                                <FaDiscord size={13} />
                                Add to Discord
                            </a>
                        </nav>
                    </m.div>
                )}
            </AnimatePresence>
        </header>
    )
}