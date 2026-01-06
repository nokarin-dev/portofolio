import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import Header from "@/components/header";
import { CursorProvider } from "@/components/cursor";
import { Analytics } from "@vercel/analytics/next"
import "@/css/globals.css";

export const metadata: Metadata = {
  title: "Nokarin | Home",
  description: "nokarin-dev portofolio website",
  openGraph: {
    title: "nokarin.strivo.xyz",
    description: "nokarin-dev portofolio website",
    url: "https://nokarin.strivo.xyz",
    siteName: "nokarin.strivo.xyz",
    images: [
      {
        url: "https://nokarin.strivo.xyz/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "nokarin",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
        <GoogleAnalytics gaId="G-QSP6RGTH9T" />
      </head>
      <body className="bg-black antialiased overflow-x-hidden">
        <Header />
        <main>
          <CursorProvider>
            {children}
          </CursorProvider>
        </main>
      </body>
    </html>
  );
}
