"use client"

import { useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import * as motion from "motion/react-client"

const navLinks = [
    { label: "About Me", href: "/#about" },
    { label: "My Projects", href: "/#projects" },
    { label: "Contact", href: "#" },
]

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed w-full top-0 z-50 px-4 pt-4">
            {/* Desktop nav */}
            <div className="hidden sm:flex flex-row items-center justify-center p-3 backdrop-blur-sm border border-zinc-700/60 rounded-full max-w-lg mx-auto bg-black/30">
                <nav className="flex flex-row gap-x-6 text-zinc-400 font-medium text-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            className="hover:text-white transition"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Mobile nav */}
            <div className="sm:hidden flex items-center justify-between px-4 py-3 backdrop-blur-sm border border-zinc-700/60 rounded-2xl bg-black/40">
                <span className="text-white font-bold text-sm">nokarin</span>
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    className="text-zinc-400 hover:text-white transition"
                >
                    {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, translateY: -8 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.2 }}
                    className="sm:hidden mt-2 flex flex-col gap-1 backdrop-blur-sm bg-black/80 border border-zinc-700/60 rounded-2xl p-3"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-zinc-300 hover:text-white text-sm font-medium px-3 py-2 rounded-xl hover:bg-zinc-800 transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </header>
    )
}