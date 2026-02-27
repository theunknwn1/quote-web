import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Link from "next/link";

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
    "quote blog",
    "inspirational stories",
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
      <head />
      <body className="bg-black text-white antialiased">
        <GoogleAnalytics />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <p className="mb-3 text-lg font-semibold text-white">
                  unknwn<span className="text-white/50">quotes</span>
                </p>
                <p className="text-sm text-white/40">
                  Words that move minds. Stories that shape lives. Updated daily.
                </p>
              </div>

              {/* Explore */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
                  Explore
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Trending Quotes
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
                  Categories
                </p>
                <div className="flex flex-col gap-2">
                  {["discipline", "success", "mindset", "growth", "life"].map(
                    (cat) => (
                      <Link
                        key={cat}
                        href={`/categories/${cat}`}
                        className="text-sm capitalize text-white/50 transition-colors hover:text-white"
                      >
                        {cat}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Legal */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
                  Legal
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-white/30">
                &copy; {new Date().getFullYear()} unknwnquotes.com — All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>

        <CookieConsent />
      </body>
    </html>
  );
}
