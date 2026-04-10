"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export default function Typewriter({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
}: TypewriterProps) {
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
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx((c) => c + 1)
        }, typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), pauseDuration)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx((c) => c - 1)
        }, deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setPhraseIdx((p) => (p + 1) % phrases.length)
      }
    }
  }, [charIdx, deleting, pausing, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className="text-zinc-400">
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-zinc-400 ml-0.5 animate-pulse align-middle" />
    </span>
  )
}
