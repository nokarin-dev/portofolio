"use client"

import { useEffect, useRef, useState } from "react"
import * as motion from "motion/react-client"

interface Stat {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Passion for Code" },
]

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 1400
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeInOut" }}
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col items-center sm:items-start gap-1"
        >
          <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </span>
          <span className="text-xs sm:text-sm text-zinc-500">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
