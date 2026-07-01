import * as motion from "motion/react-client"
import { ArrowLeftIcon, ShieldIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Cyris",
    description: "Terms of Service for Cyris - the Discord music bot by Nokarin.",
}

const EFFECTIVE_DATE = "July 1, 2026"

interface Section {
    title: string
    body: React.ReactNode
}

const sections: Section[] = [
    {
        title: "1. Acceptance of Terms",
        body: (
            <p>
                By adding Cyris to your Discord server or using any of its features, you agree to be bound
                by these Terms of Service. If you do not agree, you must remove the bot from your server
                and discontinue use immediately. These terms apply to all users, server administrators, and
                anyone who interacts with Cyris in any capacity.
            </p>
        ),
    },
    {
        title: "2. Description of Service",
        body: (
            <p>
                Cyris is a Discord bot that provides music playback, queue management, and related features
                within Discord voice channels. The bot is provided free of charge and is operated by
                Nokarin as a personal project. Features may change, be limited, or be discontinued at any
                time without prior notice.
            </p>
        ),
    },
    {
        title: "3. Eligibility",
        body: (
            <p>
                You must comply with Discord&apos;s{" "}
                <a
                    href="https://discord.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                    Terms of Service
                </a>{" "}
                and be at least 13 years of age (or the minimum age required in your jurisdiction) to use
                Cyris. By using the bot, you represent that you meet these requirements.
            </p>
        ),
    },
    {
        title: "4. Permitted Use",
        body: (
            <div className="space-y-3">
                <p>Cyris is intended solely for personal, non-commercial use within Discord servers. You agree not to:</p>
                <ul className="list-none space-y-2 pl-4 border-l border-zinc-800">
                    {[
                        "Use the bot to stream or distribute copyrighted content in violation of applicable law.",
                        "Attempt to exploit, reverse-engineer, or interfere with the bot's normal operation.",
                        "Use automated scripts or bots to issue commands to Cyris at an abnormal rate.",
                        "Use Cyris in any way that violates Discord's Terms of Service or Community Guidelines.",
                        "Attempt to overwhelm or degrade the service for other users (abuse, spam).",
                    ].map((item) => (
                        <li key={item} className="text-zinc-400 text-sm flex gap-3">
                            <span className="text-zinc-600 mt-0.5 shrink-0">-</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
    {
        title: "5. Third-Party Services",
        body: (
            <p>
                Cyris retrieves audio streams and metadata from third-party platforms including YouTube and
                Spotify. Use of Cyris does not grant you any rights to content on those platforms beyond
                what is already permitted under their respective terms of service. Nokarin is not
                affiliated with, endorsed by, or in partnership with YouTube, Spotify, or any other
                third-party platform used by the bot.
            </p>
        ),
    },
    {
        title: "6. Intellectual Property",
        body: (
            <p>
                Cyris and all associated code, design, and assets are the property of Nokarin. You are
                granted a limited, non-exclusive, non-transferable license to use the bot within Discord.
                You may not copy, modify, distribute, sell, or lease any part of the bot or its
                underlying code without explicit written permission.
            </p>
        ),
    },
    {
        title: "7. Availability & Uptime",
        body: (
            <p>
                Cyris is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. No
                guarantee is made regarding uptime, availability, or uninterrupted service. Maintenance,
                updates, or external service disruptions may cause the bot to be temporarily unavailable.
                Nokarin bears no liability for losses or inconveniences resulting from downtime.
            </p>
        ),
    },
    {
        title: "8. Disclaimer of Warranties",
        body: (
            <p>
                To the maximum extent permitted by applicable law, Cyris is provided without any warranties,
                express or implied, including but not limited to warranties of merchantability, fitness for
                a particular purpose, or non-infringement. Nokarin does not warrant that the bot will meet
                your requirements or that its operation will be error-free.
            </p>
        ),
    },
    {
        title: "9. Limitation of Liability",
        body: (
            <p>
                In no event shall Nokarin be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of or inability to use Cyris - including but not
                limited to loss of data, loss of profits, or service interruption - even if Nokarin has
                been advised of the possibility of such damages.
            </p>
        ),
    },
    {
        title: "10. Termination",
        body: (
            <p>
                Nokarin reserves the right to restrict, suspend, or terminate Cyris&apos;s access to any
                server or user at any time, for any reason, without notice. Grounds for termination
                include but are not limited to violation of these terms, abuse of the service, or actions
                that may harm other users or third parties.
            </p>
        ),
    },
    {
        title: "11. Changes to Terms",
        body: (
            <p>
                These Terms of Service may be updated at any time. Continued use of Cyris after changes
                are posted constitutes your acceptance of the revised terms. The effective date at the top
                of this page reflects the most recent revision. It is your responsibility to review these
                terms periodically.
            </p>
        ),
    },
    {
        title: "12. Contact",
        body: (
            <p>
                For questions, concerns, or reports regarding these terms, reach out via the{" "}
                <a
                    href="https://discord.gg/SPttF24Wjp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                    Cyris support server
                </a>{" "}
                or contact Nokarin directly at{" "}
                <a
                    href="mailto:contact@nokarin.xyz"
                    className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                    contact@nokarin.xyz
                </a>
                .
            </p>
        ),
    },
]

export default function CyrisTermsPage() {
    return (
        <main className="min-h-screen bg-black text-white px-5 sm:px-10 pt-28 pb-32">
            <div className="max-w-2xl mx-auto">
                {/* back */}
                <a
                    href="/projects/cyris"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
                >
                    <ArrowLeftIcon size={14} />
                    Back to Cyris
                </a>

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className="inline-flex items-center gap-2 text-zinc-600 mb-4">
                        <ShieldIcon size={14} />
                        <p className="text-[11px] tracking-[0.2em] uppercase">Cyris</p>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                        Please read these terms carefully before using Cyris. Effective{" "}
                        <span className="text-zinc-300">{EFFECTIVE_DATE}</span>.
                    </p>
                </motion.div>

                {/* sections */}
                <div className="space-y-10">
                    {sections.map((section, i) => (
                        <motion.section
                            key={section.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 * i }}
                        >
                            <h2 className="text-sm font-semibold text-zinc-200 mb-3">
                                {section.title}
                            </h2>
                            <div className="text-zinc-500 text-sm leading-relaxed">
                                {section.body}
                            </div>
                            {i < sections.length - 1 && (
                                <div className="mt-10 border-t border-zinc-900" />
                            )}
                        </motion.section>
                    ))}
                </div>

                {/* footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <p className="text-zinc-600 text-xs">
                        Last updated: {EFFECTIVE_DATE}
                    </p>
                    <a
                        href="/projects/cyris/policy"
                        className="text-zinc-500 hover:text-white text-xs transition-colors"
                    >
                        Privacy Policy →
                    </a>
                </motion.div>

            </div>
        </main>
    )
}