"use client"

import { SunIcon, MoonIcon } from "lucide-react"
import * as motion from "motion/react-client"
import { useTheme } from "./theme-provider"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <motion.button onClick={toggle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Toggle Theme" className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-glass border border-transparent hover:border-glass-border text-muted hover:text-foreground transition-all">
      <motion.div key={theme} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3, type: "spring", stiffness: 200 }}>
        {theme === "dark" ? <SunIcon size={14} /> : <MoonIcon size={14} />}
      </motion.div>
    </motion.button>
  )
}