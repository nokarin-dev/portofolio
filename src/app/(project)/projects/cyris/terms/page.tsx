import * as motion from "motion/react-client"
import { ArrowLeftIcon, ShieldIcon } from "lucide-react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Terms of Service | Cyris",
    description: "Terms of Service for Cyris - the all-in-one Discord bot by Nokarin.",
}

const EFFECTIVE_DATE = "July 6, 2026"

interface Section {
    title: string
    body: ReactNode
}

const sections: Section[] = [
    {
        title: "1. Acceptance of Terms",
        body: (
            <p>
                By adding Cyris to your Discord server or using any of its features, you agree to be
                bound by these Terms of Service. If you do not agree, you must remove the bot from your
                server and discontinue use immediately. These terms apply to all users, server
                administrators, and anyone who interacts with Cyris in any capacity.
            </p>
        ),
    },
    {
        title: "2. Description of Service",
        body: (
            <p>
                Cyris is an all-in-one Discord bot providing five modules: server moderation and utility
                (banning, kicking, timeouts, welcome messages, autorole, and server configuration), music
                playback (search, queue, lyrics, autoplay, and audio filters), a virtual coin economy with
                an RPG-style shop and inventory, a message-based leveling system with generated rank cards,
                and Tic-Tac-Toe minigames with matchmaking against other members or across servers. The bot
                is provided free of charge and operated by Nokarin as a personal project. Features may
                change, be limited, expanded, or discontinued at any time without prior notice.
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
                Cyris. By using the bot - including its economy and wagering features described below -
                you represent that you meet these requirements.
            </p>
        ),
    },
    {
        title: "4. Virtual Currency & Wagering",
        body: (
            <div className="space-y-3">
                <p>
                    Cyris includes a virtual coin economy earned through in-bot activity (daily rewards,
                    gameplay, and similar mechanics). Certain features let you wager these coins against
                    another player on the outcome of a Tic-Tac-Toe match:
                </p>
                <ul className="list-none space-y-2 pl-4 border-l border-zinc-800">
                    {[
                        "Coins have no real-world monetary value. They cannot be purchased with real currency, exchanged for real currency, cashed out, or transferred outside of Discord.",
                        "Coins exist solely within Cyris's database and hold no value or utility outside the bot.",
                        "Wagers are opt-in and require both participants to have a sufficient wallet balance at the time the match starts.",
                        "Nokarin is not a gambling operator. These features are entertainment mechanics built on a closed-loop, valueless virtual currency, not a game of real-money chance.",
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
        title: "5. Moderation Features",
        body: (
            <div className="space-y-3">
                <p>
                    Server administrators may configure and use Cyris&apos;s moderation tools, including
                    banning, kicking, timing out members, message clearing, a member verification panel,
                    and a moderation log channel. Cyris executes these actions only when issued by a member
                    with the appropriate Discord permissions in that server; Nokarin does not review,
                    supervise, or take responsibility for individual moderation decisions made by server
                    staff using these tools.
                </p>
                <p>
                    Administrators are responsible for configuring these features (including the moderation
                    log channel, autorole, and verification panel) in a way that complies with Discord&apos;s
                    Terms of Service and Community Guidelines for that server.
                </p>
            </div>
        ),
    },
    {
        title: "6. Music Playback",
        body: (
            <p>
                Cyris can join a server&apos;s voice channel to search for, queue, and play audio at a
                member&apos;s request, including autoplay, lyrics lookup, and audio filters. Music is
                sourced from third-party platforms outside Nokarin&apos;s control; Cyris does not claim
                ownership over any audio played through it, and availability of a given track or source may
                change or be interrupted at any time. You are responsible for ensuring your use of this
                feature complies with the terms of the platform the audio is sourced from.
            </p>
        ),
    },
    {
        title: "7. Permitted Use",
        body: (
            <div className="space-y-3">
                <p>Cyris is intended solely for personal, non-commercial use within Discord servers. You agree not to:</p>
                <ul className="list-none space-y-2 pl-4 border-l border-zinc-800">
                    {[
                        "Attempt to exploit, reverse-engineer, or interfere with the bot's normal operation, including its matchmaking, economy, leveling, music, or moderation systems.",
                        "Use multiple accounts to manipulate matchmaking outcomes, wagers, or leaderboard standing.",
                        "Use automated scripts or self-bots to issue commands to Cyris at an abnormal rate.",
                        "Use Cyris's moderation tools to harass, target, or abuse other members beyond legitimate server moderation.",
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
        title: "8. Data Storage",
        body: (
            <p>
                To provide matchmaking, the economy, leveling, moderation, and server configuration
                features, Cyris stores certain data persistently in a MongoDB database, including your
                Discord user ID, server ID, coin balances and inventory, level/XP progress, active
                matchmaking queue entries, and settings a server administrator has configured (prefix,
                welcome/leave messages, autorole, starboard, verification panel, and moderation log
                channel). This is described in full in our{" "}
                <a
                    href="/projects/cyris/policy"
                    className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                    Privacy Policy
                </a>
                , which forms part of these Terms.
            </p>
        ),
    },
    {
        title: "9. Intellectual Property",
        body: (
            <p>
                Cyris and all associated code, design, and assets are the property of Nokarin. You are
                granted a limited, non-exclusive, non-transferable license to use the bot within Discord.
                You may not copy, modify, distribute, sell, or lease any part of the bot or its underlying
                code without explicit written permission.
            </p>
        ),
    },
    {
        title: "10. Availability & Uptime",
        body: (
            <p>
                Cyris is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. No
                guarantee is made regarding uptime, availability, or uninterrupted service. Maintenance,
                updates, or external service disruptions (including database downtime or third-party music
                source outages) may cause the bot or specific modules to be temporarily unavailable. Nokarin
                bears no liability for losses or inconveniences, including any effect on in-progress
                matches, queued wagers, or interrupted playback, resulting from downtime.
            </p>
        ),
    },
    {
        title: "11. Disclaimer of Warranties",
        body: (
            <p>
                To the maximum extent permitted by applicable law, Cyris is provided without any
                warranties, express or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, or non-infringement. Nokarin does not
                warrant that the bot will meet your requirements, that matchmaking will always find an
                opponent, or that its operation will be error-free.
            </p>
        ),
    },
    {
        title: "12. Limitation of Liability",
        body: (
            <p>
                In no event shall Nokarin be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of or inability to use Cyris - including but not
                limited to loss of virtual coins or items, loss of data, moderation actions taken by server
                staff, or service interruption - even if Nokarin has been advised of the possibility of
                such damages. Because Cyris&apos;s virtual currency has no real-world monetary value, no
                claim for its loss will be treated as a claim for financial damages.
            </p>
        ),
    },
    {
        title: "13. Termination",
        body: (
            <p>
                Nokarin reserves the right to restrict, suspend, or terminate Cyris&apos;s access to any
                server or user at any time, for any reason, without notice. Grounds for termination
                include but are not limited to violation of these terms, abuse of the economy, matchmaking,
                or moderation systems, or actions that may harm other users or third parties.
            </p>
        ),
    },
    {
        title: "14. Changes to Terms",
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
        title: "15. Contact",
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