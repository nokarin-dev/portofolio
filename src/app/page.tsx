"use client"

import Particle from "@/components/particle"
import { BadgeQuestionMarkIcon, Code2Icon, StarsIcon, ArrowUpRightIcon, LockIcon } from "lucide-react";
import * as motion from "motion/react-client"
import Image from "next/image";

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
];

const projects = [
  {
    name: "FrameExtractor",
    tech: "Flutter · Dart",
    href: "https://github.com/nokarin-dev/FrameExtractor",
    image: "https://github.com/user-attachments/assets/d458829a-c268-4590-911e-1e00fc964312?raw=true",
  },
  {
    name: "HorizonUI",
    tech: "Java · Gradle",
    href: "https://github.com/nokarin-dev/HorizonUI",
    image: "https://github.com/nokarin-dev/horizonui/blob/main/assets/HorizonUI_Banner.png?raw=true",
  },
  {
    name: "Lancer",
    tech: "React · TailwindCSS · Motion · FastAPI",
    href: null,
    image: null,
  },
  {
    name: "Celeris",
    tech: "React · TailwindCSS · Motion · Next-Auth",
    href: null,
    image: null,
  },
];

export default function Home() {
  return (
    <>
      {/* Particle Background */}
      <Particle className="absolute inset-0" quantity={100} />

      {/* Content */}
      <section className="relative flex flex-col items-center justify-center w-full min-h-screen bg-linear-to-tl from-black via-zinc-600/20 to-black border-b border-zinc-900">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-white mb-4 tracking-tight"
        >
          nokarin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          className="text-sm sm:text-base text-zinc-500 text-center px-6 tracking-tight"
        >
          Full-stack web developer · building modern &amp; scalable apps
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-3 px-6"
        >
          <a
            href="#about"
            className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-600 hover:text-white transition-all"
          >
            About me
          </a>
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all"
          >
            View projects
          </a>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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

      {/* About */}
      <section id="about" className="py-24 sm:py-32 px-5 sm:px-10 max-w-7xl mx-auto">
        {/* heading row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 w-full">
          <motion.h3
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="text-3xl sm:text-4xl font-extrabold text-white shrink-0"
          >
            ABOUT ME
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, translateX: 20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="text-zinc-400 leading-relaxed sm:max-w-lg text-sm sm:text-base"
          >
            Hi, I&apos;m Rio - also known as Nokarin. I&apos;m a full-stack web developer from
            Indonesia with experience building modern and scalable web applications. Outside
            of web dev I also create apps, tools, game utilities, and various experimental
            tech ideas.
          </motion.p>
        </div>

        {/* stack */}
        <div className="mt-20 w-full">
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.8, margin: "-80px" }}
            className="flex items-center gap-3 mb-10"
          >
            <Code2Icon color="white" size={20} />
            <h4 className="text-xl font-bold text-white">MY STACK</h4>
          </motion.div>

          <div className="flex flex-col gap-12">
            {stackCategories.map((cat) => (
              <div key={cat.label} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-5 text-white">
                {/* category label */}
                <motion.p
                  initial={{ opacity: 0, translateY: 10 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  viewport={{ amount: 0.5, margin: "-60px" }}
                  className="sm:col-span-5 text-xl font-extrabold text-zinc-400 sm:text-white"
                >
                  {cat.label}
                </motion.p>

                {/* items */}
                <div className="sm:col-span-7 flex flex-wrap gap-x-8 gap-y-4">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.icon}
                      initial={{ opacity: 0, translateY: 16 }}
                      whileInView={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: "easeInOut" }}
                      viewport={{ amount: 0.5, margin: "-60px" }}
                      className="flex items-center gap-3 text-lg"
                    >
                      <Image
                        src={`https://skillicons.dev/icons?i=${item.icon}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        unoptimized
                      />
                      <span>{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="bg-zinc-950 py-24 sm:py-32 border-t border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 w-full text-white">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5, margin: "-80px" }}
            className="flex items-center gap-3 mb-12"
          >
            <StarsIcon color="white" size={20} />
            <h5 className="text-xl font-bold">MY PROJECTS</h5>
          </motion.div>

          {/* list */}
          <div className="flex flex-col w-full">
            {projects.map((project, i) => {
              const Inner = (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-zinc-900 transition-colors p-4 sm:p-5 rounded-xl">
                  <motion.div
                    initial={{ opacity: 0, translateX: -20 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    viewport={{ amount: 0.4, margin: "-70px" }}
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-2xl sm:text-4xl">{project.name}</p>
                      {project.href && (
                        <ArrowUpRightIcon size={20} className="text-zinc-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{project.tech}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, translateX: 20 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    viewport={{ amount: 0.4, margin: "-70px" }}
                    className="shrink-0"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full sm:w-80 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full sm:w-80 h-24 bg-zinc-800 rounded-xl">
                        <LockIcon color="gray" size={28} />
                      </div>
                    )}
                  </motion.div>
                </div>
              );

              return (
                <div key={i} className="border-b border-zinc-800 py-2">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {Inner}
                    </a>
                  ) : (
                    <div>{Inner}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-10 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} nokarin. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://github.com/nokarin-dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}