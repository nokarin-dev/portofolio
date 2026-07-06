import * as motion from "motion/react-client"
import { ArrowLeftIcon, LockIcon } from "lucide-react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Privacy Policy | Cyris",
    description: "Privacy Policy for Cyris - what data is stored, how it's used, and how to request deletion.",
}

const EFFECTIVE_DATE = "July 6, 2026"

interface Section {
    title: string
    body: ReactNode
}

const sections: Section[] = [
    {
        title: "1. Overview",
        body: (
            <p>
                This Privacy Policy explains what information Cyris stores, how it is used, and the
                choices you have regarding your data. Nokarin is committed to handling your data
                responsibly and transparently. Cyris uses a MongoDB database to persistently store the
                information described below, only to the extent required to provide its moderation,
                economy, leveling, music, and matchmaking features.
            </p>
        ),
    },
    {
        title: "2. Information We Store",
        body: (
            <div className="space-y-4">
                <p>To function, Cyris persistently stores the following data in its database:</p>

                <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Discord User ID</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Your numeric Discord user ID is stored to attribute your coin balance,
                            inventory, level/XP progress, and matchmaking queue entries to you. This is an
                            identifier, not your Discord username, avatar, or any other profile
                            information - none of which Cyris stores.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Discord Server (Guild) ID</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Used to keep leveling progress, server-scoped matchmaking, and server
                            configuration (prefix, welcome messages, moderation settings) separate between
                            servers.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Server Configuration & Moderation Settings</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Settings a server administrator configures: the command prefix, welcome/leave
                            channel and message text, autorole, starboard threshold, the member verification
                            panel, and the moderation log channel used to record moderation actions. This is
                            server-level configuration, not personal data about individual members.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Economy & Inventory Data</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            Wallet and bank coin balances, your shop inventory (items and quantities owned),
                            cooldown timestamps (e.g. for daily rewards), and premium code status, where
                            applicable.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">XP & Leveling Data</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            XP and level per server, used to determine your rank and to render your rank
                            card image on request.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
                        <p className="text-zinc-300 text-xs font-medium mb-1">Global Matchmaking Queue</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            While you are queued for a match - server-scoped or global - Cyris stores your
                            user ID, the queue scope, the channel and message the queue entry belongs to,
                            and any coin wager tied to it, so an opponent can be matched against you. This
                            entry is temporary; see Section 6 for how long it is kept.
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
                        "The content of your regular messages. Only the command text you send to Cyris is read, and only to parse the command itself.",
                        "Voice audio, recordings, or transcriptions - including from music playback sessions.",
                        "Personal information such as your real name, email address, or IP address.",
                        "Payment or financial information. Cyris's coin economy is a virtual, in-bot currency with no real-world monetary value and no connection to any payment method.",
                        "Analytics, behavioral tracking, or advertising identifiers.",
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
                The data described above is used exclusively to operate Cyris&apos;s features: applying
                moderation settings a server administrator has configured, settling wagers correctly,
                keeping your economy balance and level progress persistent between sessions, matching you
                with an opponent through the matchmaking queue, and rendering your rank card. Nokarin does
                not sell, rent, trade, or share this data with advertisers or any third party for marketing
                purposes, and does not use it for any purpose beyond operating the bot.
            </p>
        ),
    },
    {
        title: "5. Image Generation (Rank Cards)",
        body: (
            <p>
                Rank cards are generated on demand using the <code>@napi-rs/canvas</code> library, which
                draws the image directly from the level/XP data already stored (see Section 2) together
                with your Discord avatar and display name at the moment the card is requested. This
                rendering happens locally within Cyris&apos;s own process - no image is sent to a
                third-party service to be generated, and generated card images themselves are not stored;
                a new one is drawn each time the command is used.
            </p>
        ),
    },
    {
        title: "6. Data Retention",
        body: (
            <div className="space-y-3">
                <p>
                    Economy, leveling, inventory, and server configuration data - including moderation
                    settings - is retained for as long as Cyris remains in your server or you continue
                    using the bot, so that your progress, balance, and configuration persist correctly
                    between sessions.
                </p>
                <p>
                    Global matchmaking queue entries are temporary: an entry is automatically and
                    permanently deleted by the database after 5 minutes if no opponent is found, or
                    immediately once a match starts or you leave the queue.
                </p>
                <p>
                    If Cyris is removed from your server, that server&apos;s configuration and server-scoped
                    data are no longer used by the bot. You may request full deletion of your data at any
                    time - see Section 8.
                </p>
            </div>
        ),
    },
    {
        title: "7. Data Security",
        body: (
            <p>
                Data is stored in a MongoDB database accessed only by Cyris&apos;s own backend. Communication
                between Cyris and Discord is handled over Discord&apos;s encrypted WebSocket gateway and
                HTTPS API. Access to the database is restricted to the bot&apos;s operator; it is never made
                publicly accessible, and Discord user IDs are never published or exposed alongside any
                other identifying information.
            </p>
        ),
    },
    {
        title: "8. Your Rights & Data Deletion",
        body: (
            <div className="space-y-3">
                <p>
                    You may request access to, correction of, or complete deletion of the data Cyris holds
                    about your Discord user ID at any time by contacting us through the channels in Section
                    11. Deletion requests are honored by permanently removing your economy, inventory, and
                    leveling records from the database.
                </p>
                <p>
                    If you are located in the European Economic Area (EEA), you have rights under the
                    General Data Protection Regulation (GDPR), including the right to access, rectify, and
                    erase your personal data. If you are a California resident, you have rights under the
                    California Consumer Privacy Act (CCPA), including the right to know what data is
                    collected and to request its deletion. Nokarin honors these rights for all users
                    regardless of jurisdiction.
                </p>
            </div>
        ),
    },
    {
        title: "9. Children's Privacy",
        body: (
            <p>
                Cyris is not directed at children under the age of 13, and use of the bot requires meeting
                the minimum age set out in our Terms of Service. We do not knowingly collect data from
                children under this age. If you believe a child has used Cyris in violation of this
                policy, please contact us so the associated data can be reviewed and deleted.
            </p>
        ),
    },
    {
        title: "10. Changes to This Policy",
        body: (
            <p>
                This Privacy Policy may be updated from time to time. The effective date at the top of
                this page will reflect any changes. Continued use of Cyris after updates are posted
                constitutes acceptance of the revised policy. Material changes will be announced in the
                Cyris support server where possible.
            </p>
        ),
    },
    {
        title: "11. Contact",
        body: (
            <p>
                For any questions, concerns, or data deletion requests related to this Privacy Policy,
                please reach out via the{" "}
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
                        What data Cyris stores, how it&apos;s used, and your rights. Effective{" "}
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
                        Cyris stores your Discord user ID and server ID in a MongoDB database to run its
                        moderation, economy, leveling, and matchmaking features. We never sell your data,
                        never share it with advertisers, and you can request full deletion at any time.
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