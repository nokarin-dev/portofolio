"use client"

import { useEffect, useRef, useState } from "react"
import * as motion from "motion/react-client"

interface Stat { value: number; suffix?: string; label: string }
const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 10, suffix: "+", label: "Projects Deployed" },
  { value: 10, suffix: "+", label: "Core Technologies" },
  { value: 100, suffix: "%", label: "Commitment" },
]

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true; let start = 0; const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * value))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}<span className="text-muted">{suffix}</span></span>
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x-0 md:divide-x divide-glass-border">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, filter: "blur(4px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }} viewport={{ once: true, margin: "-40px" }} className="flex flex-col items-center md:items-start px-0 md:px-8 first:pl-0">
          <span className="text-5xl lg:text-7xl font-bold tracking-tighter text-foreground tabular-nums leading-none mb-3">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted max-w-30 text-center md:text-left">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  )
}