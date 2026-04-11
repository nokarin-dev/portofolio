"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [opacity, setOpacity] = useState(1)
  const prevPathRef = useRef(pathname)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    clearTimer()
    timerRef.current = setTimeout(() => setOpacity(0), 60)
    return clearTimer
  }, [])

  useEffect(() => {
    if (pathname === prevPathRef.current) return
    prevPathRef.current = pathname

    clearTimer()
    setOpacity(1)
    timerRef.current = setTimeout(() => setOpacity(0), 260)
    return clearTimer
  }, [pathname])

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          opacity,
          pointerEvents: opacity > 0.05 ? "all" : "none",
          transition: `opacity ${opacity === 1 ? "120ms" : "420ms"} ease`,
          willChange: "opacity",
        }}
      />
      {children}
    </>
  )
}
