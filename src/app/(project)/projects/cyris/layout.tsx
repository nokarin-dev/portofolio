import type { Metadata } from "next"
import "@/css/globals.css"

const BASE_URL = "https://nokarin.xyz/projects/cyris"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Cyris | Discord Bot",
        template: "%s | Cyris",
    },
    description:
        "Cyris is a feature-rich Discord bot with YouTube & Spotify support, audio filters, lyrics, and more.",
    keywords: ["Cyris", "Discord bot", "utility", "moderation", "fun", "economy", "music bot", "Discord", "YouTube", "Spotify", "nokarin"],
    authors: [{ name: "Nokarin", url: BASE_URL }],
    creator: "Nokarin",
    openGraph: {
        title: "Cyris | Discord Bot",
        description:
            "Feature-rich Discord bot with YouTube & Spotify support, audio filters, lyrics, and more.",
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
        title: "Cyris | Discord Bot",
        description:
            "Feature-rich Discord bot with YouTube & Spotify support, audio filters, lyrics, and more.",
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
    children: React.ReactNode
}>) {
    return <>{children}</>
}