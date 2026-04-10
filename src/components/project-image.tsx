"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* skeleton */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-zinc-800 animate-pulse rounded-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-700/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {!error ? (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
          className="w-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-28 bg-zinc-900 text-zinc-600 text-xs">
          Failed to load
        </div>
      )}
    </div>
  )
}
