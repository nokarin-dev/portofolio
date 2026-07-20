"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as motion from "motion/react-client"
import { useMotionValue, useSpring, useTransform } from "motion/react"
import {
  Code2Icon,
  ArrowUpRightIcon,
  LockIcon,
  SendIcon,
} from "lucide-react"

import Particle from "@/components/particle"
import Typewriter from "@/components/typewriter"
import StatsCounter from "@/components/stats-counter"
import GithubStats from "@/components/github-stats"
import SkillBars from "@/components/skill-bars"
import ProjectImage from "@/components/project-image"
import { blogPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

const GithubSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedinSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const stackCategories = [
  {
    label: "Frontend",
    items: [
      { icon: "js", name: "JavaScript" },
      { icon: "ts", name: "TypeScript" },
      { icon: "react", name: "React" },
      { icon: "nextjs", name: "Next.js" },
      { icon: "tailwindcss", name: "Tailwind CSS" },
    ],
  },
  {
    label: "Backend",
    items: [
      { icon: "nodejs", name: "Node.js" },
      { icon: "expressjs", name: "Express.js" },
      { icon: "fastapi", name: "FastAPI" },
      { icon: "laravel", name: "Laravel" },
      { icon: "python", name: "Python" },
    ],
  },
  {
    label: "Database & Tools",
    items: [
      { icon: "mysql", name: "MySQL" },
      { icon: "mongodb", name: "MongoDB" },
      { icon: "docker", name: "Docker" },
      { icon: "git", name: "Git" },
      { icon: "vscode", name: "VSCode" },
      { icon: "idea", name: "IntelliJ IDEA" },
      { icon: "figma", name: "Figma" },
    ],
  },
  {
    label: "Systems & Apps",
    items: [
      { icon: "flutter", name: "Flutter" },
      { icon: "dart", name: "Dart" },
      { icon: "rust", name: "Rust" },
      { icon: "java", name: "Java" },
      { icon: "cpp", name: "CPP" },
      { icon: "cs", name: "CSharp" },
    ],
  },
]

const projects = [
  {
    name: "Cyris",
    tech: ["JavaScript", "ExpressJS", "DiscordJS"],
    desc: "Cyris is engineered for enterprise scale Discord servers. Five powerful systems sharing one robust core. No clutter, just performance.",
    href: "https://cyris.nokarin.xyz",
    image: '/projects/cyris/banner.png',
    status: "public",
    featured: true,
  },
  {
    name: "Aqloss",
    tech: ["Flutter", "Dart", "Rust"],
    desc: "Cross-platform music player architected strictly for bit-perfect, lossless, and hi-res audio playback.",
    href: "/projects/aqloss",
    image: "https://github.com/nokarin-dev/Aqloss/blob/main/assets/banner/github_banner.png?raw=true",
    status: "public",
    featured: true,
  },
  {
    name: "HorizonUI",
    tech: ["Java", "Gradle"],
    desc: "Brings a modern, clean, and highly customizable glassmorphic user interface to Minecraft with animated backgrounds.",
    href: "https://github.com/nokarin-dev/HorizonUI",
    image: "https://github.com/nokarin-dev/horizonui/blob/main/assets/HorizonUI_Banner.png?raw=true",
    status: "public",
    featured: false,
  },
  {
    name: "FrameExtractor",
    tech: ["Flutter", "Dart", "Python", "ffmpeg", "yt-dlp"],
    desc: "Modern, cross-platform video frame extractor with a clean GUI. Engineered for high-precision local extraction and direct YouTube processing.",
    href: "https://github.com/nokarin-dev/FrameExtractor",
    image: "https://github.com/user-attachments/assets/d458829a-c268-4590-911e-1e00fc964312?raw=true",
    status: "public",
    featured: false,
  },
]

const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
)

function ProjectCard({ project, index }: { project: any, index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width; const height = rect.height
    const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5); y.set(mouseY / height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const CardInner = () => (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col h-full rounded-2xl overflow-hidden",
        "bg-white/2 backdrop-blur-xl border border-white/5",
        "hover:bg-white/4 hover:border-white/10 transition-all duration-500",
        project.featured && "md:col-span-2 md:flex-row md:items-center"
      )}
    >
      <div className={cn("flex flex-col flex-1 p-8 md:p-10 z-10", project.featured && "md:w-1/2")}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-2xl tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            {project.name}
          </h3>
          {project.status === "public" ? (
            <ArrowUpRightIcon size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full bg-white/3 text-zinc-500 border border-white/5">
              <LockIcon size={10} /> Private
            </div>
          )}
        </div>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 font-light">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[11px] uppercase tracking-wider font-mono px-3 py-1.5 rounded-md bg-white/3 text-zinc-300 border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={cn(
        "shrink-0 z-10 flex items-center justify-center",
        project.featured
          ? "w-full md:w-1/2 h-64 md:h-full p-8 pt-0 md:p-10 md:pl-0"
          : "w-full h-50 p-8 pt-0 md:p-10 md:pt-0"
      )}>
        {project.image ? (
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/5 relative shadow-2xl">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <ProjectImage src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 w-full h-full bg-white/1 rounded-xl border border-white/5">
            <LockIcon size={24} className="text-zinc-700" />
            <span className="text-zinc-600 text-xs font-mono tracking-widest uppercase">Internal Build</span>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ perspective: "1000px" }}
      className={cn(project.featured && "md:col-span-2")}
    >
      {project.href ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-2xl">
          <CardInner />
        </a>
      ) : <CardInner />}
    </motion.div>
  )
}

export default function Home() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      setSendError("All fields are required."); return;
    }
    setSending(true); setSendError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true); setFormState({ name: "", email: "", message: "" })
    } catch { setSendError("Transmission failed. Please try again.") }
    finally { setSending(false) }
  }

  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="bg-black text-zinc-300 selection:bg-white/20 `select`ion:text-white min-h-screen">
      <NoiseOverlay />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/2 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/2 rounded-full blur-[100px]" />
      </div>

      <section id="hero" className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden z-10">
        <Particle className="absolute inset-0 opacity-50" quantity={120} ease={80} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center px-5"
        >
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none mb-6">
            nokarin
          </h1>

          <div className="text-base sm:text-lg text-zinc-400 font-light tracking-wide h-8 max-w-2xl" aria-live="polite">
            <Typewriter
              phrases={[
                "Full-stack engineering & system architecture.",
                "Crafting modern UIs with pixel-perfect precision.",
                "Specializing in Next.js, Flutter, and Rust.",
                "Building tools for the modern developer.",
              ]}
            />
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-5 px-6 font-mono uppercase tracking-widest text-xs">
            <a href="#projects" className="px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors duration-300">
              Explore Work
            </a>
            <a href="#contact" className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors duration-300">
              Initialize Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 text-zinc-600"
        >
          <div className="w-px h-12 bg-linear-to-b from-zinc-800 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [-24, 48] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-6 bg-white absolute top-0"
            />
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16">
          <StatsCounter />
        </div>
      </section>

      <section id="about" className="py-32 px-5 sm:px-10 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-600 block"></span> About
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Engineering <br /> <span className="text-zinc-500">Digital Reality.</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg font-light mb-8">
              Hi, I&apos;m Nokarin. I specialize in bridging the gap between highly complex backend systems and intuitive, glassmorphic front-end experiences.
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg font-light">
              Currently based in <span className="text-white">Indonesia</span>, my focus lies in crafting scalable web applications, robust desktop tools, and experimenting with systems programming.
            </p>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6">
              <a href="https://github.com/nokarin-dev" target="_blank" aria-label="GitHub" className="text-zinc-500 hover:text-white transition-colors p-3 rounded-full bg-white/2 border border-white/5 hover:bg-white/5">
                <GithubSVG className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/nokarin" target="_blank" aria-label="LinkedIn" className="text-zinc-500 hover:text-white transition-colors p-3 rounded-full bg-white/2 border border-white/5 hover:bg-white/5">
                <LinkedinSVG className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}
              className="p-8 sm:p-10 rounded-2xl bg-white/2 backdrop-blur-xl border border-white/5"
            >
              <h4 className="text-lg font-semibold text-white mb-8">Technical Mastery</h4>
              <SkillBars />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true, margin: "-100px" }}
              className="p-8 sm:p-10 rounded-2xl bg-white/2 backdrop-blur-xl border border-white/5"
            >
              <h4 className="text-lg font-semibold text-white mb-10">Arsenal</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {stackCategories.map((cat) => (
                  <div key={cat.label} className="flex flex-col gap-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                      {cat.label}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {cat.items.map((item) => (
                        <div key={item.icon} className="group relative flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-white/8 group-hover:border-white/20 group-hover:-translate-y-1">
                            <Image
                              src={`https://skillicons.dev/icons?i=${item.icon}`}
                              alt={item.name} width={24} height={24} unoptimized
                              className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            />
                          </div>
                          <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 text-[10px] text-zinc-400 font-mono tracking-wider transition-opacity whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-600 block"></span> Portfolio
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Selected Works
              </h3>
            </div>
            <a
              href="https://github.com/nokarin-dev?tab=repositories" target="_blank"
              className="group flex items-center gap-3 pb-2 border-b border-white/20 text-zinc-300 hover:text-white hover:border-white transition-all text-sm font-mono uppercase tracking-widest"
            >
              View Archive <ArrowUpRightIcon size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <GithubStats />
      </section>

      <section id="blog" className="py-32 px-5 sm:px-10 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-zinc-600 block"></span> Journal
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Recent Writing</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true, margin: "-50px" }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full group outline-none">
                <article className="flex flex-col h-full p-8 rounded-2xl bg-white/2 backdrop-blur-xl border border-white/5 hover:bg-white/4 hover:border-white/20 transition-all duration-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-xl leading-snug mb-3 group-hover:text-zinc-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed flex-1 mb-8">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-600 uppercase tracking-widest pt-4 border-t border-white/5">
                    <span>{post.readTime}</span>
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-32 px-5 sm:px-10 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
          >
            <Code2Icon className="mx-auto text-zinc-600 mb-6" size={32} />
            <h3 className="text-5xl font-bold text-white tracking-tight mb-6">Initiate Sequence.</h3>
            <p className="text-zinc-400 text-lg font-light mb-16 max-w-xl mx-auto">
              Whether it's a complex system architecture or a modern UI build, my inbox is always open for new opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}
            className="rounded-3xl bg-white/2 backdrop-blur-2xl border border-white/5 p-8 md:p-12 text-left shadow-2xl relative overflow-hidden"
          >
            {sent ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl mb-6">✓</div>
                <h4 className="text-2xl font-bold text-white mb-2">Transmission Successful</h4>
                <p className="text-zinc-400 font-mono text-sm">Awaiting manual response from Nokarin.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Subject Name</label>
                    <input
                      id="name" type="text" required value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-base placeholder:text-zinc-700 focus:outline-none focus:border-white transition-colors"
                      placeholder="A"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Return Address</label>
                    <input
                      id="email" type="email" required value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="bg-transparent border-b border-white/10 pb-3 text-white text-base placeholder:text-zinc-700 focus:outline-none focus:border-white transition-colors"
                      placeholder="a@example.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Payload</label>
                  <textarea
                    id="message" required rows={4} value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="bg-transparent border-b border-white/10 pb-3 text-white text-base placeholder:text-zinc-700 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Describe your vision..."
                  />
                </div>

                {sendError && <p className="text-red-400 text-xs font-mono">{sendError}</p>}

                <button
                  type="submit" disabled={sending}
                  className="group flex items-center justify-center gap-3 bg-white text-black font-semibold text-sm px-8 py-4 rounded-lg hover:bg-zinc-200 transition-all disabled:opacity-50 self-end mt-4"
                >
                  {sending ? "TRANSMITTING..." : "EXECUTE"}
                  {!sending && <SendIcon size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 bg-black py-10 px-5 sm:px-10 text-xs font-mono uppercase tracking-widest text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} NOKARIN.</p>
          <div className="flex gap-8">
            <a href="https://linkedin.com/in/nokarin" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
              <LinkedinSVG className="w-4 h-4" /> Link
            </a>
            <a href="https://github.com/nokarin-dev" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
              <GithubSVG className="w-4 h-4" /> Source
            </a>
            <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}