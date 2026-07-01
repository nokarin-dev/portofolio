import * as motion from "motion/react-client"
import { ArrowLeftIcon, LockIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Cyris",
    description: "Privacy Policy for Cyris - what data is collected, how it's used, and how to request deletion.",
}

const EFFECTIVE_DATE = "July 1, 2026"

interface Section {
    title: string
    body: React.ReactNode
}

const sections: Section[] = [
    {
        title: "1. Overview",
        body: (
            <p>
                This Privacy Policy explains what information Cyris collects, how it is used, and the
                choices you have regarding your data. Nokarin is committed to handling your data
                responsibly and transparently. Cyris is designed to collect the absolute minimum
                information necessary to function.
            </p>
        ),
    },
    {
        title: "2. Information We Collect",
        body: (
            <div className="space-y-4">
                <p>Cyris collects and temporarily processes the following data during operation:</p>

                <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">User IDs</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Your Discord user ID is stored temporarily in-memory to attribute song
                            requests to the requester within the queue display. This data is never
                            persisted to a database and is discarded when the bot leaves a voice channel.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Guild (Server) IDs</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Guild IDs are used to manage per-server queue state in memory. Like user IDs,
                            this data is not persisted and is cleared when playback ends or the bot disconnects.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Command Content</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Search queries and song URLs passed to Cyris are processed to fulfill your
                            request and are not logged or stored. They may be forwarded to third-party
                            services (YouTube, Spotify, Genius) solely to retrieve the requested content.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "3. Information We Do NOT Collect",
        body: (
            <div className="space-y-2">
                <p className="mb-3">Cyris does not collect, store, or process the following:</p>
                <ul className="list-none space-y-2 pl-4 border-l border-zinc-800">
                    {[
                        "Message content beyond direct bot commands.",
                        "Voice audio, recordings, or transcriptions.",
                        "Personal information such as names, email addresses, or IP addresses.",
                        "Server member lists or role data.",
                        "Usage analytics, behavioural data, or activity logs.",
                        "Payment information of any kind.",
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
        title: "4. How We Use Your Information",
        body: (
            <p>
                The limited data Cyris handles is used exclusively to provide the requested service -
                playing music, displaying queue information, and attributing track requests within a
                session. No data is sold, rented, shared with advertisers, or used for any commercial
                purpose whatsoever.
            </p>
        ),
    },
    {
        title: "5. Third-Party Services",
        body: (
            <div className="space-y-3">
                <p>
                    To retrieve audio streams, metadata, and lyrics, Cyris forwards search queries and
                    URLs to the following third-party services. Each operates under its own privacy policy:
                </p>
                <ul className="list-none space-y-2 pl-4 border-l border-zinc-800">
                    {[
                        { name: "YouTube", url: "https://policies.google.com/privacy" },
                        { name: "Spotify", url: "https://www.spotify.com/legal/privacy-policy/" },
                        { name: "Genius", url: "https://genius.com/static/privacy" },
                    ].map(({ name, url }) => (
                        <li key={name} className="text-zinc-400 text-sm flex gap-3">
                            <span className="text-zinc-600 mt-0.5 shrink-0">-</span>
                            <span>
                                {name} -{" "}
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="text-zinc-500 text-sm">
                    Nokarin has no control over and assumes no responsibility for the data practices of
                    these third-party services.
                </p>
            </div>
        ),
    },
    {
        title: "6. Data Retention",
        body: (
            <p>
                Cyris operates statelessly with respect to persistent storage. All in-memory session data
                (user IDs, guild IDs, queue state) is automatically purged when a playback session ends
                - either when the queue is exhausted, the bot is disconnected from a voice channel, or
                the bot process restarts. There is no database; there is nothing to delete.
            </p>
        ),
    },
    {
        title: "7. Data Security",
        body: (
            <p>
                Because Cyris does not persist any personal data to disk or a database, the attack
                surface for data exposure is minimal. Communication between Cyris and Discord is handled
                over Discord&apos;s encrypted WebSocket gateway. Communication with third-party APIs
                (YouTube, Spotify, Genius) occurs over HTTPS.
            </p>
        ),
    },
    {
        title: "8. Children's Privacy",
        body: (
            <p>
                Cyris is not directed at children under the age of 13. We do not knowingly collect any
                information from children. If you believe a child has provided personal data through use
                of this bot, please contact us and the relevant session data will be confirmed as
                non-persistent and already discarded.
            </p>
        ),
    },
    {
        title: "9. Your Rights",
        body: (
            <div className="space-y-3">
                <p>
                    Depending on your jurisdiction, you may have the right to access, correct, or request
                    deletion of personal data held about you. Because Cyris holds no persistent personal
                    data, these rights are satisfied by design.
                </p>
                <p>
                    If you are located in the European Economic Area (EEA), you have rights under the
                    General Data Protection Regulation (GDPR). If you are a California resident, you have
                    rights under the California Consumer Privacy Act (CCPA). In both cases, the absence of
                    persistent data storage means there is no stored personal data to act upon.
                </p>
            </div>
        ),
    },
    {
        title: "10. Changes to This Policy",
        body: (
            <p>
                This Privacy Policy may be updated from time to time. The effective date at the top of
                this page will reflect any changes. Continued use of Cyris after updates are posted
                constitutes acceptance of the revised policy. Material changes will be announced in
                the Cyris support server where possible.
            </p>
        ),
    },
    {
        title: "11. Contact",
        body: (
            <p>
                For any questions, concerns, or requests related to this Privacy Policy, please reach
                out via the{" "}
                <a
                    href="https://discord.gg/SPttF24Wjp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                    Cyris support server
                </a>{" "}
                or contact Nokarin at{" "}
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

export default function CyrisPolicyPage() {
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
                        <LockIcon size={14} />
                        <p className="text-[11px] tracking-[0.2em] uppercase">Cyris</p>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                        What data Cyris collects, how it&apos;s used, and your rights. Effective{" "}
                        <span className="text-zinc-300">{EFFECTIVE_DATE}</span>.
                    </p>
                </motion.div>

                {/* tldr callout */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mb-12 rounded-lg border border-zinc-800 bg-zinc-950/60 px-5 py-4"
                >
                    <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-600 mb-2">TL;DR</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        Cyris stores nothing. User IDs and queue data live in memory only for the duration
                        of a session and are discarded the moment playback ends. No database, no logs,
                        no analytics.
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
                        href="/projects/cyris/terms"
                        className="text-zinc-500 hover:text-white text-xs transition-colors"
                    >
                        Terms of Service →
                    </a>
                </motion.div>

            </div>
        </main>
    )
}