"use client"

import { useEffect, useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 dark:bg-zinc-900 dark:border-zinc-700 backdrop-blur-sm text-white hover:bg-white/20 dark:hover:bg-zinc-800 transition-colors shadow-lg"
        >
          <ArrowUpIcon size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
