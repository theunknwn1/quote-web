import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://unknwnquotes.com"),
  title: {
    default: "unknwnquotes.com — Explore Quotes That Move You",
    template: "%s | unknwnquotes.com",
  },
  description:
    "Discover trending, inspiring, and thought-provoking quotes across every category and language. Updated daily on unknwnquotes.com.",
  keywords: [
    "quotes",
    "motivational quotes",
    "psychology quotes",
    "philosophy quotes",
    "anime quotes",
    "life quotes",
    "love quotes",
    "wisdom quotes",
    "daily quotes",
    "unknwnquotes",
  ],
  authors: [{ name: "unknwnquotes.com" }],
  creator: "unknwnquotes.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unknwnquotes.com",
    siteName: "unknwnquotes.com",
    title: "unknwnquotes.com — Explore Quotes That Move You",
    description:
      "Discover trending, inspiring, and thought-provoking quotes across every category and language.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "unknwnquotes.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "unknwnquotes.com — Explore Quotes That Move You",
    description:
      "Discover trending, inspiring, and thought-provoking quotes across every category and language.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-sm text-white/40">
                &copy; {new Date().getFullYear()} unknwnquotes.com — All rights
                reserved.
              </p>
              <div className="flex gap-6 text-sm text-white/40">
                <a
                  href="#"
                  className="transition-colors hover:text-white"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-white"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
