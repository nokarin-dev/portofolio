"use client"

import { useState } from "react"
import * as motion from "motion/react-client"
import {
    ShieldCheckIcon,
    MonitorIcon,
    DownloadIcon,
    ChevronDownIcon,
    WavesIcon,
    CpuIcon,
    LayersIcon,
    ArrowRightIcon,
    HeadphonesIcon,
    ActivityIcon,
} from "lucide-react"
import Image from "next/image"
import {
    FaAndroid,
    FaApple,
    FaLinux,
    FaWindows
} from "react-icons/fa"
import { RiShiningFill } from "react-icons/ri"

const PLATFORMS = [
    { name: "Windows", icon: <FaWindows />, sub: "WASAPI Exclusive" },
    { name: "macOS", icon: <FaApple />, sub: "CoreAudio" },
    { name: "Linux", icon: <FaLinux />, sub: "PipeWire / ALSA" },
    { name: "Android", icon: <FaAndroid />, sub: "AAudio" },
    { name: "iOS", icon: <FaApple />, sub: "AVAudio" },
]

const FEATURES = [
    {
        icon: <WavesIcon size={20} />,
        title: "Hi-Res Audio",
        desc: "Native support up to 32-bit/384kHz. DSD64, DSD128, DSD256. Your DAC, fully unleashed.",
    },
    {
        icon: <CpuIcon size={20} />,
        title: "Rust Audio Engine",
        desc: "Built from scratch in Rust. Near-zero latency, minimal CPU overhead, rock-solid stability.",
    },
    {
        icon: <LayersIcon size={20} />,
        title: "Exclusive Mode",
        desc: "Bypasses the system mixer entirely on all platforms. Direct hardware access, always.",
    },
    {
        icon: <MonitorIcon size={20} />,
        title: "Cross-Platform Native",
        desc: "A single codebase, five platforms. Not Electron. Not a web app. Truly native everywhere.",
    },
    {
        icon: <RiShiningFill size={20} />,
        title: "Modern UI, Classic Soul",
        desc: "A sleek, intuitive interface that puts your music first. No clutter, no distractions, just pure listening pleasure.",
    },
    {
        icon: <ShieldCheckIcon size={20} />,
        title: "No Cloud, No Telemetry",
        desc: "Your music stays yours. No accounts, no tracking, no nonsense.",
    },
]

const SPECS = [
    { label: "Max Sample Rate", value: "384 kHz" },
    { label: "Bit Depth", value: "32-bit float" },
    { label: "DSD Support", value: "DSD64-DSD256" },
    { label: "Output API", value: "WASAPI / CoreAudio / PipeWire" },
    { label: "Mobile Output", value: "AAudio / AVAudio" },
    { label: "Engine", value: "Rust (CPAL)" },
    { label: "Latency", value: "< 5 ms" },
    { label: "License", value: "Open Source" },
]

export default function AqlossPage() {
    const [activeSpec, setActiveSpec] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-black text-white font-(--font-inter) selection:bg-white/20">
            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
                />
                {/* Radial glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full opacity-10"
                    style={{ background: "radial-gradient(ellipse, #ffffff 0%, transparent 70%)" }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 text-center max-w-3xl py-20"
                >
                    <h1 className="text-5xl sm:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
                        Lossless
                        <br />
                        <span className="text-zinc-500">everywhere.</span>
                    </h1>

                    <p className="text-zinc-400 leading-relaxed max-w-xl mx-auto mb-10">
                        A cross-platform music player engineered for bit-perfect audio. FLAC, DSD, hi-res, decoded exactly as recorded on every device you own.
                    </p>

                    <div className="flex flex-row gap-3 justify-center">
                        <a href="#download" className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-200 transition text-sm">
                            <DownloadIcon size={16} />
                            Download Free
                        </a>
                        <a href="#features" className="flex items-center gap-2 border border-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-full hover:border-zinc-500 hover:text-white transition text-sm">
                            <ActivityIcon size={16} />
                            See Features
                        </a>
                    </div>

                    {/* Platform badges */}
                    <div className="flex flex-wrap gap-2 justify-center mt-8">
                        {PLATFORMS.map((p) => (
                            <span key={p.name} className="flex flex-row items-center gap-2 text-xs text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                                {p.icon} {p.name}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full mt-10 max-w-6xl"
                >
                    <Image
                        src="/projects/aqloss/preview.png"
                        alt="Aqloss app preview"
                        width={1499}
                        height={812}
                        className="rounded-sm sm:rounded-lg lg:rounded-xl object-cover object-top h-50 sm:h-70 lg:h-130"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black"></div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700"
                >
                    <ChevronDownIcon size={22} />
                </motion.div>
            </section>

            {/* Features */}
            <section id="features" className="px-6 py-24 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-3">What makes it different</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for those who hear the difference.</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:border-zinc-700 transition group"
                        >
                            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-4 group-hover:text-white transition">
                                {f.icon}
                            </div>
                            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Platform section */}
            <section id="platforms" className="px-6 py-20 border-y border-zinc-900">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-3">One app, every platform</p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Native. Not wrapped.</h2>
                        <p className="text-zinc-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
                            Each platform uses its dedicated low-level audio API. No emulation, no compatibility layer.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-5 gap-3">
                        {PLATFORMS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.06 }}
                                className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:border-zinc-700 transition text-center"
                            >
                                <span className="text-3xl">{p.icon}</span>
                                <span className="font-medium text-sm text-white">{p.name}</span>
                                <span className="text-[11px] text-zinc-600 font-mono">{p.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech specs */}
            <section id="specs" className="px-6 py-24 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-3">Under the hood</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical specifications.</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SPECS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.05 }}
                            onMouseEnter={() => setActiveSpec(i)}
                            onMouseLeave={() => setActiveSpec(null)}
                            className={`p-4 rounded-xl border transition cursor-default ${activeSpec === i ? "border-zinc-600 bg-zinc-900" : "border-zinc-900 bg-zinc-950/50"}`}
                        >
                            <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="font-semibold text-white text-sm font-mono">{s.value}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Philosophy strip */}
            <section className="px-6 py-20 bg-zinc-950 border-y border-zinc-900">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <HeadphonesIcon size={32} className="mx-auto mb-6 text-zinc-600" />
                        <blockquote className="text-2xl sm:text-3xl font-light text-zinc-300 leading-relaxed">
                            "Every sample, every waveform, every microsecond of silence, delivered without compromise."
                        </blockquote>
                        <p className="text-zinc-600 text-sm mt-6">The Aqloss philosophy</p>
                    </motion.div>
                </div>
            </section>

            {/* Download */}
            <section id="download" className="px-6 py-24 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-3">Get started</p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Download Aqloss.</h2>
                    <p className="text-zinc-500 mt-4 text-sm">Free and open source. No account required.</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PLATFORMS.map((p, i) => (
                        <motion.a
                            key={p.name}
                            href="#"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.07 }}
                            className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-900 hover:border-zinc-600 bg-zinc-950/50 hover:bg-zinc-900/50 transition group"
                        >
                            <span className="text-3xl">{p.icon}</span>
                            <div className="flex-1">
                                <div className="font-semibold text-white text-sm">{p.name}</div>
                                <div className="text-[11px] text-zinc-600 mt-0.5">Coming soon</div>
                            </div>
                            <ArrowRightIcon size={14} className="text-zinc-700 group-hover:text-zinc-400 transition group-hover:translate-x-0.5" />
                        </motion.a>
                    ))}
                    {/* GitHub */}
                    <motion.a
                        href="https://github.com/nokarin-dev/Aqloss"
                        target="_blank"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.35 }}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-900 transition group col-span-full sm:col-span-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30" aria-hidden="true" className="fill-zinc-400">
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                        </svg>
                        <div className="flex-1">
                            <div className="font-semibold text-white text-sm">View on GitHub</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">Open source · GPL-3.0</div>
                        </div>
                        <ArrowRightIcon size={14} className="text-zinc-600 group-hover:text-zinc-300 transition" />
                    </motion.a>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="px-6 py-20 border-t border-zinc-900">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Image
                                src="/projects/aqloss/og.png"
                                alt="Aqloss logo"
                                width={32}
                                height={32}
                            />
                            <span className="text-white font-semibold">Aqloss</span>
                        </div>
                        <p className="text-zinc-600 text-sm">
                            Lossless everywhere. · Built with Rust · Open Source
                        </p>
                        <p className="text-zinc-700 text-xs mt-3">
                            A project by{" "}
                            <a href="https://nokarin.xyz" className="text-zinc-500 hover:text-zinc-300 transition underline underline-offset-2">
                                nokarin
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}