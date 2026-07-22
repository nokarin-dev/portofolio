"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import * as motion from "motion/react-client"
import ThemeToggle from "./theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Activity", href: "/#activity" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]
const SECTION_IDS = ["about", "projects", "activity", "blog", "contact"] as const

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teardown = useCallback(() => {
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null }
  }, [])

  useEffect(() => {
    teardown(); setOpen(false)
    if (!isHome) {
      const match = navLinks.find((l) => l.href === pathname)
      setActive(match ? match.href.replace("/#", "").replace("/", "") : "")
      return
    }
    setActive("")
    const setup = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (entry.target.id === "hero") setActive("")
          else setActive(entry.target.id)
        })
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 })
      const hero = document.getElementById("hero")
      if (hero) observer.observe(hero)
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
      observerRef.current = observer
    }
    const t = setTimeout(setup, 100)
    return () => { clearTimeout(t); teardown() }
  }, [pathname, isHome, teardown])

  const isLinkActive = (link: (typeof navLinks)[0]) => link.href.startsWith("/#") ? active === link.href.replace("/#", "") : pathname === link.href

  return (
    <header className="fixed w-full top-0 z-50 px-4 pt-4 sm:pt-6" role="banner">
      <div className={cn(
        "hidden sm:flex flex-row items-center justify-between p-1.5 rounded-full max-w-fit mx-auto transition-all duration-500",
        scrolled
          ? "bg-glass border border-glass-border backdrop-blur-xl [-webkit-backdrop-filter:blur(16px)] shadow-sm"
          : "bg-transparent border border-transparent"
      )}>
        <nav className="flex flex-row items-center gap-1 px-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const linkActive = isLinkActive(link)
            return (
              <a key={link.label} href={link.href} aria-current={linkActive ? "page" : undefined}
                className={cn(
                  "relative px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-colors duration-300",
                  linkActive ? "text-foreground font-medium" : "text-muted hover:text-foreground"
                )}
              >
                {linkActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-glass border border-glass-border backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>
        <div className="pl-2 border-l border-glass-border ml-1"><ThemeToggle /></div>
      </div>

      <div className={cn(
        "sm:hidden flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-500",
        scrolled || open
          ? "bg-glass border border-glass-border backdrop-blur-xl [-webkit-backdrop-filter:blur(16px)]"
          : "bg-transparent border border-transparent"
      )}>
        <span className="text-foreground font-bold text-sm tracking-widest uppercase font-mono">Nokarin.</span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} className="text-muted hover:text-foreground transition-colors">
            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="sm:hidden mt-3 flex flex-col gap-1 bg-background/90 border border-glass-border rounded-2xl p-2 backdrop-blur-2xl [-webkit-backdrop-filter:blur(24px)]"
        >
          {navLinks.map((link) => {
            const linkActive = isLinkActive(link)
            return (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                className={cn(
                  "text-xs font-mono uppercase tracking-widest px-5 py-4 rounded-xl transition-all",
                  linkActive
                    ? "text-foreground bg-glass border border-glass-border"
                    : "text-muted hover:text-foreground hover:bg-glass"
                )}
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