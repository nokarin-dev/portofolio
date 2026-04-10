"use client"

import { useState, useEffect } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import * as motion from "motion/react-client"
import ThemeToggle from "./theme-toggle"

const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Activity", href: "/#activity" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
]

export default function Header() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState("")
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const sectionIds = ["about", "projects", "activity", "blog", "contact"]
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id)
                })
            },
            { rootMargin: "-40% 0px -50% 0px" }
        )
        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    return (
        <header className="fixed w-full top-0 z-50 px-4 pt-4" role="banner">
            {/* Desktop */}
            <div
                className={`hidden sm:flex flex-row items-center justify-center gap-1 p-2 rounded-full max-w-120 mx-auto transition-all duration-300 ${scrolled
                        ? "backdrop-blur-md border border-zinc-700/60 bg-black/60 shadow-lg shadow-black/30"
                        : "border border-transparent bg-transparent"
                    }`}
            >
                <nav className="flex flex-row gap-x-1 text-sm" aria-label="Main navigation">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace("/#", "").replace("/", "")
                        const isActive = active === sectionId
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`relative px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ${isActive && scrolled ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className={`${scrolled && isActive ? "bg-zinc-800" : "bg-transparent"} absolute inset-0 rounded-full`}
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                    />
                                )}
                                {link.label}
                            </a>
                        )
                    })}
                </nav>
                <div className="ml-2">
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile */}
            <div
                className={`sm:hidden flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${scrolled || open
                        ? "backdrop-blur-md border border-zinc-700/60 bg-black/60"
                        : "border border-transparent"
                    }`}
            >
                <span className="text-white font-bold text-sm tracking-tight">nokarin</span>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="text-zinc-400 hover:text-white transition"
                    >
                        {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="sm:hidden mt-2 flex flex-col gap-1 backdrop-blur-md bg-black/90 border border-zinc-700/60 rounded-2xl p-3"
                    role="menu"
                >
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace("/#", "").replace("/", "")
                        const isActive = active === sectionId
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                role="menuitem"
                                className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${isActive
                                        ? "text-white bg-zinc-800"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                    }`}
                            >
                                {link.label}
                            </a>
                        )
                    })}
                </motion.div>
            )}
        </header>
    )
}