"use client"

import { useRef, useEffect, useState } from "react"
import * as motion from "motion/react-client"

interface Skill {
  name: string
  level: number
  color: string
}

const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90, color: "#61dafb" },
      { name: "TypeScript", level: 90, color: "#3178c6" },
      { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
      { name: "Motion / Animations", level: 60, color: "#ff6b6b" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js / Express", level: 80, color: "#68a063" },
      { name: "FastAPI / Python", level: 80, color: "#009688" },
      { name: "Laravel / PHP", level: 40, color: "#f05340" },
    ],
  },
  {
    label: "Other",
    skills: [
      { name: "Flutter / Dart", level: 65, color: "#54c5f8" },
      { name: "Java / Kotlin", level: 80, color: "#b07219" },
      { name: "Docker / DevOps", level: 70, color: "#2496ed" },
    ],
  },
]

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeInOut" }}
      viewport={{ amount: 0.5, margin: "-30px" }}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-300 font-medium">{skill.name}</span>
        <span className="text-xs text-zinc-500 tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillBars() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
      {skillGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-5">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {group.label}
          </p>
          {group.skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 0.07} />
          ))}
        </div>
      ))}
    </div>
  )
}
