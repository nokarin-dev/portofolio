"use client"

import { useEffect, useState } from "react"

export default function Typewriter({ phrases, typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2500 }: { phrases: string[], typingSpeed?: number, deletingSpeed?: number, pauseDuration?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [pausing, setPausing] = useState(false)

  useEffect(() => {
    if (pausing) return

    const current = phrases[phraseIdx]

    if (!deleting) {
      if (charIdx < current.length) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx((c) => c + 1) }, typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), pauseDuration)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1) }, deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setDeleting(false); setPhraseIdx((p) => (p + 1) % phrases.length)
      }
    }
  }, [charIdx, deleting, pausing, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return <span className="text-muted">{displayed}<span className="inline-block w-px h-[1.1em] bg-foreground ml-0.5 animate-pulse align-middle" /></span>
}