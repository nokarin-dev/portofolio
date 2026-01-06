"use client"

import Particle from "@/components/particle"
import * as motion from "motion/react-client"

export default function Home() {
  return (
    <>
      <div className="flex flex-col relative items-center justify-center w-full h-192 bg-linear-to-tl from-black via-zinc-600/20 to-black shadow-2xl shadow-zinc-800/50 border-b border-zinc-900 z-10">
        <Particle
          className="absolute inset-0"
          quantity={100}
        />
        <motion.h1
          initial={{ opacity: 0, filter: "blur(4px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-6xl lg:text-9xl font-extrabold text-white mb-10"
        >
          nokarin
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
          className="text-sm text-zinc-500">
          I'm full-stack website developers, and making another stuff too.
        </motion.h2>
      </div>

      {/* About Me */}
      <div id="about" className="flex flex-col py-20 items-center lg:max-w-7xl mx-auto px-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4 text-white">
          ABOUT ME
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, translateY: 20 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-center text-zinc-400">
          Hi, I'm Rio — or Nokarin online. I'm a full-stack web developer from Indonesia with experience building modern and scalable web applications. Outside of web development, I also create and explore other types of projects, including desktop apps, tools, game-related utilities, and various experimental tech ideas.
        </motion.p>

        <div className="flex flex-col mt-20 items-center w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="text-4xl font-semibold text-zinc-300">Tech Stack
          </motion.p>

          <div className="flex flex-col lg:flex-row relative gap-x-20 gap-y-20 lg:gap-y-0 mt-10 justify-center items-center w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="flex flex-col relative drop-shadow-xl w-full overflow-hidden bg-zinc-900 items-center border border-zinc-600 p-10 rounded-lg">
              <img
                src="https://skillicons.dev/icons?i=java,js,ts,py,html,css,react,cpp,cs&perline=8"
                alt="Tech Stack Icons"
                draggable="false"
                className="z-2"
              />
              <div className="absolute flex items-center justify-center text-white z-1 opacity-90 rounded-xl inset-0.5 bg-zinc-900" />
              <div className="absolute w-140 h-40 bg-sky-600/80 blur-[100px] -left-1/2 -top-1/2"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="flex flex-col relative drop-shadow-xl w-full overflow-hidden bg-zinc-900 items-center border border-zinc-600 p-10 rounded-lg">
              <img
                src="https://skillicons.dev/icons?i=github,git,vscode,idea,rider,npm,gradle,tailwindcss,nodejs,express,mysql,mongodb,laravel,discordjs,figma&perline=8"
                alt="Tech Stack Icons"
                draggable="false"
                className="z-2"
              />
              <div className="absolute flex items-center justify-center text-white z-1 opacity-90 rounded-xl inset-0.5 bg-zinc-900" />
              <div className="absolute w-140 h-40 bg-violet-800/80 blur-[100px] left-1/2 top-1/2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="flex flex-col items-center justify-center bg-zinc-950 py-20 shadow-2xl shadow-zinc-800/50 border-t border-zinc-800">
        <motion.h4
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-white">
          MY PROJECTS
        </motion.h4>

        <motion.p
          initial={{ opacity: 0, translateY: 40 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="text-center my-60 text-6xl font-bold text-white"
        >
          UNDER CONSTRUCTION
        </motion.p>
        {/*
        <div className="grid lg:grid-cols-3 justify-between items-center lg:gap-x-20 max-w-7xl px-15 pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="relative flex w-full flex-col rounded-xl bg-linear-to-br from-zinc-950 to-zinc-900 bg-clip-border text-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 my-10"
          >
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
              <div
                className="absolute inset-0 bg-linear-to-r bg-black"></div>
              <div className="absolute inset-0 bg-size[20px_20px] animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">

              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-zinc-300 antialiased group-hover:text-blue-600 transition-colors duration-300">
                Discord-RPC
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-zinc-400 antialiased" >
                Discord-RPC is a powerful library developed by Strivo Development that enables developers to seamlessly integrate Rich Presence functionality into Discord applications.
              </p>
            </div>
            <div className="p-6 pt-0">
              <a href="https://github.com/strivo-dev/discord-rpc" className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-linear-to-r bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5">
                <span className="relative flex items-center gap-2">
                  Github
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"></path>
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="relative flex w-full flex-col rounded-xl bg-linear-to-br bg-zinc-900 bg-clip-border text-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 my-10"
          >
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
              <div
                className="absolute inset-0 bg-linear-to-r bg-black"></div>
              <div className="absolute inset-0 bg-size[20px_20px] animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">

              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-zinc-300 antialiased group-hover:text-blue-600 transition-colors duration-300">
                wleowleowleo
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-zinc-400 antialiased" >
                wleowleowleo
              </p>
            </div>
            <div className="p-6 pt-0">
              <button className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-linear-to-r bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5">
                <span className="relative flex items-center gap-2">
                  Github
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"></path>
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="relative flex w-full flex-col rounded-xl bg-linear-to-bl from-zinc-950 to-zinc-900 bg-clip-border text-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 my-10"
          >
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
              <div
                className="absolute inset-0 bg-linear-to-r bg-black"></div>
              <div className="absolute inset-0 bg-size[20px_20px] animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">

              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-zinc-300 antialiased group-hover:text-blue-600 transition-colors duration-300">
                wleowleowleo
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-zinc-400 antialiased" >
                wleowleowleo
              </p>
            </div>
            <div className="p-6 pt-0">
              <button className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-linear-to-r bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5">
                <span className="relative flex items-center gap-2">
                  Github
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"></path>
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>
      </div> */}
    </div >
    </>
  );
}
