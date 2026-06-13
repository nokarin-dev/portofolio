import type { Metadata } from "next"
import "@/css/globals.css"
import AqlossHeader from "@/components/aqloss/aqloss-header"

const BASE_URL = "https://nokarin.xyz/projects/aqloss"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Aqloss | Audio, uncompromised",
        template: "%s | Aqloss",
    },
    description:
        "Aqloss is a cross-platform music player engineered for bit-perfect, lossless, and hi-res audio playback.",
    keywords: ["Aqloss", "music player", "cross-platform", "lossless audio", "hi-res audio", "bit-perfect"],
    authors: [{ name: "Nokarin", url: BASE_URL }],
    creator: "Nokarin",
    openGraph: {
        title: "Aqloss | Lossless everywhere",
        description:
            "Aqloss is a cross-platform music player engineered for bit-perfect, lossless, and hi-res audio playback.",
        url: BASE_URL,
        siteName: BASE_URL,
        images: [
            {
                url: "/projects/aqloss/og.png",
                width: 1280,
                height: 640,
                alt: "Aqloss | Lossless everywhere",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aqloss | Lossless everywhere",
        description: "Aqloss is a cross-platform music player engineered for bit-perfect, lossless, and hi-res audio playback.",
        images: ["/projects/aqloss/og.png"],
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
        shortcut: "/projects/aqloss/favicon.ico",
        icon: "/projects/aqloss/favicon.ico",
        apple: "/projects/aqloss/favicon.ico",
    },
}

export default function AqlossLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <AqlossHeader />
            {children}
        </>
    )
}