import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Inter } from "next/font/google"
import LocalFont from "next/font/local"
import Header from "@/components/header"
import { CursorProvider } from "@/components/cursor"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransition from "@/components/page-transition"
import BackToTop from "@/components/back-to-top"
import { Analytics } from "@vercel/analytics/next"
import "@/css/globals.css"

const BASE_URL = "https://nokarin.my.id"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nokarin | Full-Stack Developer",
    template: "%s | Nokarin",
  },
  description:
    "Rio (Nokarin) - full-stack web developer from Indonesia, building modern and scalable web applications.",
  keywords: ["full-stack developer", "web developer", "Indonesia", "React", "Next.js", "nokarin"],
  authors: [{ name: "Rio (Nokarin)", url: BASE_URL }],
  creator: "Nokarin",
  openGraph: {
    title: "Nokarin | Full-Stack Developer",
    description:
      "Rio (Nokarin) - full-stack web developer from Indonesia, building modern and scalable web applications.",
    url: BASE_URL,
    siteName: BASE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nokarin - Full-Stack Developer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nokarin | Full-Stack Developer",
    description: "Full-stack web developer from Indonesia",
    images: ["/og.png"],
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
    shortcut: "/favicon.png",
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")} suppressHydrationWarning>
      <head>
        <Analytics />
        <GoogleAnalytics gaId="G-QSP6RGTH9T" />
      </head>
      <body className="bg-black antialiased overflow-x-hidden">
        <ThemeProvider>
          <Header />
          <main>
            <CursorProvider>
              <PageTransition>
                {children}
              </PageTransition>
            </CursorProvider>
          </main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}