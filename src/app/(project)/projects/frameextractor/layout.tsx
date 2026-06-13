import type { Metadata } from "next"
import "@/css/globals.css"
import FrameExtractorHeader from "@/components/frameextractor/frameextractor-header"

const BASE_URL = "https://nokarin.xyz/projects/frameextractor"

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "FrameExtractor | Extract frames from any video",
        template: "%s | FrameExtractor",
    },
    description:
        "Cross-platform video frame extractor built with Flutter. Supports local files and YouTube URLs. Powered by FFmpeg and yt-dlp. Windows, Linux, and Android.",
    keywords: ["FrameExtractor", "video frame extractor", "FFmpeg", "yt-dlp", "Flutter", "YouTube", "cross-platform"],
    authors: [{ name: "Nokarin", url: BASE_URL }],
    creator: "Nokarin",
    openGraph: {
        title: "FrameExtractor | Extract frames from any video",
        description: "Cross-platform frame extractor. Flutter UI, FFmpeg + yt-dlp powered. Local files and YouTube URLs.",
        url: BASE_URL,
        images: [{ url: "https://nokarin.xyz/projects/frameextractor/og.png", width: 1280, height: 640 }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FrameExtractor | Extract frames from any video",
        description: "Cross-platform frame extractor. Flutter UI, FFmpeg + yt-dlp powered.",
        images: ["https://nokarin.xyz/projects/frameextractor/og.png"],
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
        shortcut: "https://nokarin.xyz/projects/frameextractor/favicon.ico",
        icon: "https://nokarin.xyz/projects/frameextractor/favicon.ico",
        apple: "https://nokarin.xyz/projects/frameextractor/favicon.ico",
    },
}

export default function FrameExtractorLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <FrameExtractorHeader />
            {children}
        </>
    )
}