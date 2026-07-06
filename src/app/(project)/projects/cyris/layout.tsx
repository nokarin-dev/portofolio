import type { Metadata } from "next"
import type { ReactNode } from "react"
import "@/css/globals.css"

const BASE_URL = "https://nokarin.xyz/projects/cyris"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Cyris | All-in-One Discord Bot",
        template: "%s | Cyris",
    },
    description:
        "Cyris is an all-in-one Discord bot: Tic-Tac-Toe with global matchmaking, an economy with Safe-Rollback betting, leveling with rank cards, music, and full moderation.",
    keywords: ["Cyris", "Discord bot", "multipurpose bot", "economy", "leveling", "rank card", "music bot", "moderation", "tic-tac-toe", "matchmaking", "nokarin"],
    authors: [{ name: "Nokarin", url: BASE_URL }],
    creator: "Nokarin",
    openGraph: {
        title: "Cyris | All-in-One Discord Bot",
        description:
            "Games, economy, leveling, music, and moderation - one Discord bot for your server's entire social layer.",
        url: BASE_URL,
        siteName: "Nokarin",
        images: [
            {
                url: "https://nokarin.xyz/projects/cyris/og.png",
                width: 1280,
                height: 640,
                alt: "Cyris | Discord",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cyris | All-in-One Discord Bot",
        description:
            "Games, economy, leveling, music, and moderation - one Discord bot for your server's entire social layer.",
        images: ["https://nokarin.xyz/projects/cyris/og.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        shortcut: "https://nokarin.xyz/projects/cyris/favicon.ico",
        icon: "https://nokarin.xyz/projects/cyris/favicon.ico",
        apple: "https://nokarin.xyz/projects/cyris/favicon.ico",
    },
}

export default function CyrisLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return <>{children}</>
}