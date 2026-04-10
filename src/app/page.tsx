"use client"

import Particle from "@/components/particle"
import Typewriter from "@/components/typewriter"
import StatsCounter from "@/components/stats-counter"
import GithubStats from "@/components/github-stats"
import SkillBars from "@/components/skill-bars"
import ProjectImage from "@/components/project-image"
import {
  Code2Icon,
  StarsIcon,
  ArrowUpRightIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  BookOpenIcon,
  BarChart2Icon,
} from "lucide-react"
import * as motion from "motion/react-client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { blogPosts } from "@/lib/blog"

const stackCategories = [
  {
    label: "FRONTEND",
    items: [
      { icon: "js", name: "JavaScript" },
      { icon: "ts", name: "TypeScript" },
      { icon: "react", name: "React" },
      { icon: "nextjs", name: "Next.js" },
      { icon: "tailwindcss", name: "Tailwind CSS" },
    ],
  },
  {
    label: "BACKEND",
    items: [
      { icon: "nodejs", name: "Node.js" },
      { icon: "expressjs", name: "Express.js" },
      { icon: "fastapi", name: "FastAPI" },
      { icon: "laravel", name: "Laravel" },
    ],
  },
  {
    label: "DATABASE",
    items: [
      { icon: "mysql", name: "MySQL" },
      { icon: "mongodb", name: "MongoDB" },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { icon: "vscode", name: "VS Code" },
      { icon: "idea", name: "IntelliJ IDEA" },
      { icon: "rider", name: "Rider" },
      { icon: "git", name: "Git" },
      { icon: "docker", name: "Docker" },
    ],
  },
  {
    label: "OTHER",
    items: [
      { icon: "flutter", name: "Flutter" },
      { icon: "dart", name: "Dart" },
      { icon: "python", name: "Python" },
      { icon: "java", name: "Java" },
      { icon: "gradle", name: "Gradle" },
      { icon: "kotlin", name: "Kotlin" },
    ],
  },
]

const projects = [
  {
    name: "FrameExtractor",
    tech: "Flutter · Dart",
    desc: "A mobile app to extract individual frames from video files.",
    href: "https://github.com/nokarin-dev/FrameExtractor",
    image: "https://github.com/user-attachments/assets/d458829a-c268-4590-911e-1e00fc964312?raw=true",
    status: "public",
  },
  {
    name: "HorizonUI",
    tech: "Java · Gradle",
    desc: "A custom UI framework and component library for Java/Gradle projects.",
    href: "https://github.com/nokarin-dev/HorizonUI",
    image: "https://github.com/nokarin-dev/horizonui/blob/main/assets/HorizonUI_Banner.png?raw=true",
    status: "public",
  },
  {
    name: "Lancer",
    tech: "React · TailwindCSS · Motion · FastAPI",
    desc: "A full-stack web application - coming soon.",
    href: null,
    image: null,
    status: "private",
  },
  {
    name: "Celeris",
    tech: "React · TailwindCSS · Motion · Next-Auth",
    desc: "A modern auth-powered web app - coming soon.",
    href: null,
    image: null,
    status: "private",
  },
]

export default function Home() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true)
    } catch {
      setSendError("Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden border-b border-zinc-900"
        aria-label="Hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,120,120,0.15),transparent)]" />
        <Particle className="absolute inset-0" quantity={120} />

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.92 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative flex flex-col items-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            role="status"
            aria-label="Currently open to work"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-medium mb-2"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to work
          </motion.div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-white tracking-tight">
            nokarin
          </h1>

          <div className="text-sm sm:text-base text-zinc-400 tracking-tight h-6" aria-live="polite">
            <Typewriter
              phrases={[
                "Full-stack web developer",
                "Building modern & scalable apps",
                "Based in Indonesia 🇮🇩",
                "Open to collaborations",
              ]}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3 px-6 z-1"
        >
          <a href="#about" className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-500 hover:text-white transition-all">
            About me
          </a>
          <a href="#projects" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all">
            View projects
          </a>
          <a href="#contact" className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-500 hover:text-white transition-all">
            Contact
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          aria-hidden="true"
          className="absolute bottom-8 flex flex-col items-center gap-1 text-zinc-600 text-xs"
        >
          <span>scroll</span>
          <motion.div
            animate={{ translateY: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-6 bg-zinc-600"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-b border-zinc-900" aria-label="Quick stats">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16">
          <StatsCounter />
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="py-24 sm:py-32 px-5 sm:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8 w-full">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="text-3xl sm:text-4xl font-extrabold text-white shrink-0"
          >
            ABOUT ME
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, translateX: 20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex flex-col gap-4 sm:max-w-lg"
          >
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Hi, I&apos;m <span className="text-white font-semibold">Rio</span> - also known as{" "}
              <span className="text-white font-semibold">Nokarin</span>. I&apos;m a full-stack web
              developer from Indonesia with experience building modern and scalable web applications.
              Outside of web dev I also create apps, tools, game utilities, and various experimental
              tech ideas.
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <MapPinIcon size={14} aria-hidden="true" />
                <span>Indonesia</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/nokarin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub: nokarin-dev"
                  className="flex items-center gap-2 text-zinc-400 fill-zinc-400 hover:fill-white hover:text-white text-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30" aria-hidden="true">
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  <span>nokarin-dev</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skill bars */}
        <div className="mt-20 w-full">
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex items-center gap-3"
          >
            <BarChart2Icon className="text-white" size={20} aria-hidden="true" />
            <h3 className="text-xl font-bold text-white">SKILL LEVELS</h3>
          </motion.div>
          <SkillBars />
        </div>

        {/* Stack icons */}
        <div className="mt-24 w-full">
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex items-center gap-3 mb-12"
          >
            <Code2Icon className="text-white" size={20} aria-hidden="true" />
            <h3 className="text-xl font-bold text-white">MY STACK</h3>
          </motion.div>

          <div className="flex flex-col gap-14">
            {stackCategories.map((cat) => (
              <div key={cat.label} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-5 text-white">
                <motion.p
                  initial={{ opacity: 0, translateY: 10 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  viewport={{ amount: 0.5, margin: "-60px" }}
                  className="sm:col-span-5 text-lg font-extrabold text-zinc-500 sm:text-zinc-300 uppercase tracking-widest"
                >
                  {cat.label}
                </motion.p>
                <div className="sm:col-span-7 flex flex-wrap gap-x-8 gap-y-5">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.icon}
                      initial={{ opacity: 0, translateY: 16 }}
                      whileInView={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: "easeInOut" }}
                      viewport={{ amount: 0.5, margin: "-40px" }}
                      className="flex items-center gap-3 text-base group hover:scale-105 transition-transform duration-500"
                    >
                      <Image
                        src={`https://skillicons.dev/icons?i=${item.icon}`}
                        alt={item.name}
                        width={40}
                        height={40}
                        unoptimized
                        className="transition-transform group-hover:scale-110"
                      />
                      <span className="text-zinc-300 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" aria-labelledby="projects-heading" className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 w-full text-white">
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex items-center gap-3 mb-4"
          >
            <StarsIcon className="text-white" size={20} aria-hidden="true" />
            <h2 id="projects-heading" className="text-xl font-bold">MY PROJECTS</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="text-zinc-500 text-sm mb-14 ml-8"
          >
            A selection of things I&apos;ve built
          </motion.p>

          <div className="flex flex-col w-full">
            {projects.map((project, i) => {
              const Inner = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeInOut" }}
                  viewport={{ amount: 0.5, margin: "-60px" }}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 p-5 rounded-xl transition-colors duration-500 hover:bg-zinc-900/50"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <p className="font-extrabold text-2xl sm:text-4xl tracking-tight">{project.name}</p>
                      {project.status === "public" ? (
                        <ArrowUpRightIcon size={18} className="text-zinc-500 shrink-0 mt-1" aria-hidden="true" />
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500 mt-1">private</span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{project.tech}</p>
                    <p className="text-sm text-zinc-400 max-w-sm">{project.desc}</p>
                  </div>
                  <div className="shrink-0">
                    {project.image ? (
                      <ProjectImage src={project.image} alt={`${project.name} preview`} className="w-full sm:w-80" />
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-80 h-28 bg-zinc-900 rounded-xl border border-zinc-800" aria-label="Preview not available">
                        <LockIcon size={22} className="text-zinc-600" aria-hidden="true" />
                        <span className="text-zinc-600 text-xs">Coming soon</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
              return (
                <div key={i} className="border-b border-zinc-800/60 py-1">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`}>
                      {Inner}
                    </a>
                  ) : <div>{Inner}</div>}
                </div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <a
              href="https://github.com/nokarin-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View more projects on GitHub"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 fill-zinc-300 text-sm hover:fill-white hover:border-zinc-400 hover:text-white transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30" aria-hidden="true">
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
              <span>See more on GitHub</span>
              <ArrowUpRightIcon size={14} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* GitHub Stats */}
      <GithubStats />

      {/* Blog preview */}
      <section id="blog" aria-labelledby="blog-heading" className="py-24 sm:py-32 px-5 sm:px-10 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex items-center gap-3 mb-4"
          >
            <BookOpenIcon className="text-white" size={20} aria-hidden="true" />
            <h2 id="blog-heading" className="text-xl font-bold text-white">LATEST POSTS</h2>
          </motion.div>
          <p className="text-zinc-500 text-sm mb-12 ml-8">Thoughts on web dev, tools, and tech</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ amount: 0.5, margin: "-40px" }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group flex flex-col gap-3 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all h-full">
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-zinc-200 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-800">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-400 hover:text-white transition-all group"
            >
              <BookOpenIcon size={14} aria-hidden="true" />
              <span>All posts</span>
              <ArrowUpRightIcon size={14} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="py-24 sm:py-32 px-5 sm:px-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, translateX: -20 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <MailIcon className="text-white" size={20} aria-hidden="true" />
                  <h2 id="contact-heading" className="text-xl font-bold text-white">GET IN TOUCH</h2>
                </div>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
                  Have a project in mind, or just want to say hi? I&apos;m always open to new opportunities and collaborations.
                </p>
                <div className="mt-8 flex flex-col gap-3 text-sm fill-zinc-500 text-zinc-500">
                  <a href="https://github.com/nokarin-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub: nokarin-dev" className="flex items-center gap-3 hover:fill-white hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30" aria-hidden="true">
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                    <span>github.com/nokarin-dev</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPinIcon size={16} aria-hidden="true" />
                    <span>Indonesia</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, translateX: 20 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex-1"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center gap-4 h-full min-h-60 rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center"
                >
                  <div className="text-3xl" aria-hidden="true">✉️</div>
                  <p className="text-white font-semibold text-lg">Message sent!</p>
                  <p className="text-zinc-500 text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Rio"
                        aria-required="true"
                        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@email.com"
                        aria-required="true"
                        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hey, I'd love to work with you on..."
                      rows={5}
                      aria-required="true"
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                    />
                  </div>
                  {sendError && <p role="alert" className="text-red-400 text-xs">{sendError}</p>}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={sending}
                    aria-label="Send message"
                    className="flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors self-end disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SendIcon size={15} aria-hidden="true" />
                    {sending ? "Sending…" : "Send message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-8 px-5 sm:px-10" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-zinc-600 fill-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} nokarin. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://github.com/nokarin-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:text-white hover:fill-white transition flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30" aria-hidden="true">
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
              GitHub
            </a>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
          </div>
        </div>
      </footer>
    </>
  )
}