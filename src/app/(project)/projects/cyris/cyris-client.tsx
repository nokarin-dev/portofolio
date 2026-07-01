"use client"

import { useState, useEffect } from "react"
import * as motion from "motion/react-client"
import {
    MusicIcon, ArrowRightIcon, ChevronDownIcon, MenuIcon, XIcon,
} from "lucide-react"
import { FaDiscord } from "react-icons/fa"
import Image from "next/image"

const INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1519991195005095966&permissions=8&scope=bot%20applications.commands"
const SUPPORT_URL = "https://discord.gg/SPttF24Wjp"


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

function CyrisHeader() {
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
                <a href="/projects/cyris" className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                        <Image
                            className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                            src="/projects/cyris/icon.png"
                            alt="Cyris logo"
                            width={12} height={12} priority
                        />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight">Cyris</span>
                </a>

                <a
                    href={INVITE_URL}
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
                    <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                        <MusicIcon size={12} className="text-white" />
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
        </header>
    )
}

export default function CyrisClient() {
    return (
        <>
            <GrainOverlay />
            <CyrisHeader />

            <main className="min-h-screen bg-black text-white overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-5 text-center pt-20">
                    {/* Ambient glow */}
                    <div
                        aria-hidden
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full opacity-20 blur-[120px] pointer-events-none"
                        style={{ background: "radial-gradient(ellipse, #4f46e5 0%, transparent 70%)" }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-5 leading-none">
                            Under Construction
                        </h1>
                        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
                            The website under construction and will be available soon. In the meantime, you can invite Cyris to your Discord server or join the support server for assistance.
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

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <ChevronDownIcon size={18} className="text-zinc-700 animate-bounce" />
                    </motion.div>
                </section>

                <section className="px-5 sm:px-10 py-28">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                                Ready with cyris?
                            </h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-9 max-w-md mx-auto">
                                Add Cyris to your server in one click. No configuration required -
                                just invite and run <code className="text-zinc-400">/help</code>.
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

                {/* ── Footer ── */}
                <footer className="px-5 sm:px-10 py-10 border-t border-zinc-900">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center">
                                <Image
                                    className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800"
                                    src="/projects/cyris/icon.png"
                                    alt="Cyris logo"
                                    width={12} height={12} priority
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

            </main>
        </>
    )
}