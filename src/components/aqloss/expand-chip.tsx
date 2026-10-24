"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, useReducedMotion } from "motion/react"
import * as motion from "motion/react-client"
import { XIcon } from "lucide-react"

const spring = { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 }
const INSET_X = 0.03
const INSET_Y = 0.035
const MARGIN = 20
const OPEN_HEADER_H = 72

const glass =
  "border border-white/20 bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xl backdrop-saturate-150"

type ExpandChipProps = {
  label: string
  side: "left" | "right"
  open: boolean
  onOpen: () => void
  onClose: () => void
  children: React.ReactNode
}

export default function ExpandChip({
  label,
  side,
  open,
  onOpen,
  onClose,
  children,
}: ExpandChipProps) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const sizerRef = useRef<HTMLSpanElement>(null)
  const [vw, setVw] = useState(0)
  const [vh, setVh] = useState(0)
  const [chip, setChip] = useState({ w: 112, h: 36 })

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
      if (!sizerRef.current) return
      const r = sizerRef.current.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) {
        setChip({ w: Math.ceil(r.width), h: Math.ceil(r.height) })
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [label])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const t = reduce ? { duration: 0 } : spring
  const fade = reduce ? { duration: 0 } : { duration: 0.22, ease: "easeOut" as const }
  const panelW = Math.max(vw * (1 - INSET_X * 2), chip.w)
  const panelH = Math.max(vh * (1 - INSET_Y * 2), chip.h)
  const panelX = vw * INSET_X
  const panelY = vh * INSET_Y
  const chipX = side === "left" ? MARGIN : Math.max(MARGIN, vw - MARGIN - chip.w)
  const chipY = Math.max(MARGIN, vh - MARGIN - chip.h)
  const titleId = `${label}-dialog-title`

  const sizer = (
    <span
      ref={sizerRef}
      aria-hidden
      className="pointer-events-none invisible fixed px-4 py-2 text-sm font-medium whitespace-nowrap border"
    >
      {label}
    </span>
  )

  if (vw === 0) {
    return (
      <>
        {sizer}
        <button
          type="button"
          onClick={onOpen}
          className={`fixed bottom-5 z-20 rounded-full px-4 py-2 text-sm font-medium text-white/90 ${glass} ${
            side === "left" ? "left-5" : "right-5"
          }`}
        >
          {label}
        </button>
      </>
    )
  }

  return (
    <>
      {sizer}
      <AnimatePresence>
        {open && (
          <motion.button
            key="backdrop"
            type="button"
            aria-label={`Close ${label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.25 }}
            className="fixed inset-0 z-40 cursor-default bg-black/45"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <motion.div
        role={open ? "dialog" : "button"}
        aria-modal={open || undefined}
        aria-label={open ? undefined : label}
        aria-labelledby={open ? titleId : undefined}
        tabIndex={open ? -1 : 0}
        initial={false}
        animate={{
          x: open ? panelX : chipX,
          y: open ? panelY : chipY,
          width: open ? panelW : chip.w,
          height: open ? panelH : chip.h,
          borderRadius: open ? 28 : 20,
        }}
        transition={t}
        style={{ originX: 0, originY: 0 }}
        onClick={open ? undefined : onOpen}
        onKeyDown={
          open
            ? undefined
            : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onOpen()
                }
              }
        }
        className={`fixed top-0 left-0 overflow-hidden ${glass} ${
          open ? "z-50 cursor-default" : "z-20 cursor-pointer"
        }`}
      >
        <motion.div
          className="relative flex shrink-0 items-center px-4"
          initial={false}
          animate={{ height: open ? OPEN_HEADER_H : chip.h }}
          transition={t}
        >
          <h2 id={titleId} className="whitespace-nowrap text-sm font-medium text-white/90">
            {label}
          </h2>
          <AnimatePresence>
            {open && (
              <motion.button
                key="close"
                ref={closeRef}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
                onClick={onClose}
                aria-label={`Close ${label}`}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <XIcon size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div
              key="body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { ...fade, delay: reduce ? 0 : 0.18 } }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.1 } }}
              className="aqloss-scroll absolute inset-x-0 bottom-0 overflow-y-auto overscroll-contain px-5 pt-1 pb-5"
              style={{ top: OPEN_HEADER_H }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
