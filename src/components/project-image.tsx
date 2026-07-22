"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function ProjectImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div className={`relative overflow-hidden rounded-xl ${className} bg-glass`}>
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div key="skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-glass overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-glass-hover to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>
      {!error ? (
        <motion.img src={src} alt={alt} onLoad={() => setLoaded(true)} onError={() => { setError(true); setLoaded(true) }} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-muted text-[10px] font-mono uppercase tracking-widest">Image_Load_Failed</div>
      )}
    </div>
  )
}