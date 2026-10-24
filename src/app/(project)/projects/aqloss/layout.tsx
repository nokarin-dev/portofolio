import type { Metadata } from "next"
import "@/css/globals.css"

const BASE_URL = "https://nokarin.xyz/projects/aqloss"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        absolute: "Aqloss",
        default: "Aqloss",
        template: "%s | Aqloss",
    },
    description:
        "A local music player for Windows, Linux, and Android. WASAPI Exclusive and ALSA hw: skip the mixer. FLAC, ALAC, WAV, and more. Unsigned.",
    authors: [{ name: "Nokarin", url: BASE_URL }],
    creator: "Nokarin",
    openGraph: {
        title: "Aqloss",
        description:
            "A local music player for Windows, Linux, and Android. WASAPI Exclusive and ALSA hw: skip the mixer.",
        url: BASE_URL,
        siteName: BASE_URL,
        images: [
            {
                url: "https://nokarin.xyz/projects/aqloss/og.png",
                width: 1280,
                height: 640,
                alt: "Aqloss",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aqloss",
        description: "A local music player for Windows, Linux, and Android. WASAPI Exclusive and ALSA hw: skip the mixer.",
        images: ["https://nokarin.xyz/projects/aqloss/og.png"],
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
        shortcut: "https://nokarin.xyz/projects/aqloss/favicon.ico",
        icon: "https://nokarin.xyz/projects/aqloss/favicon.ico",
        apple: "https://nokarin.xyz/projects/aqloss/favicon.ico",
    },
}

export default function AqlossLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}