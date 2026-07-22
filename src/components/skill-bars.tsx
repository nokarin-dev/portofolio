"use client"

import { useRef, useEffect, useState } from "react"
import * as motion from "motion/react-client"

interface Skill { name: string; level: number }

const skillGroups: { label: string; skills: Skill[] }[] = [
  { label: "Frontend", skills: [{ name: "React / Next.js", level: 90 }, { name: "TypeScript", level: 90 }, { name: "Tailwind CSS", level: 90 }, { name: "Motion / Animations", level: 60 }] },
  { label: "Backend", skills: [{ name: "Node.js / Express", level: 80 }, { name: "FastAPI / Python", level: 80 }, { name: "Laravel / PHP", level: 40 }] },
  { label: "Systems & Other", skills: [{ name: "Flutter / Dart", level: 65 }, { name: "Java / Kotlin", level: 80 }, { name: "Docker / DevOps", level: 70 }] },
]

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setAnimated(true) }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: "easeOut" }} viewport={{ once: true, margin: "-30px" }} className="flex flex-col gap-2.5">
      <div className="flex justify-between items-end">
        <span className="text-sm text-foreground font-light tracking-wide">{skill.name}</span>
        <span className="text-[10px] text-muted font-mono tracking-widest">{skill.level}%</span>
      </div>
      <div className="h-0.5 bg-glass-border w-full overflow-hidden">
        <motion.div className="h-full bg-foreground relative" initial={{ width: 0 }} animate={{ width: animated ? `${skill.level}%` : 0 }} transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </motion.div>
  )
}

export default function SkillBars() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 mt-4">
      {skillGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-7">
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest border-b border-glass-border pb-2">{group.label}</p>
          <div className="flex flex-col gap-5">
            {group.skills.map((skill, i) => <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />)}
          </div>
        </div>
      ))}
    </div>
  )
}