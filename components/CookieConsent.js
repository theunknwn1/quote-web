"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    // If accepted, load AdSense
    if (consent === "accepted") {
      loadAdSense();
    }
  }, []);

  const loadAdSense = () => {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (!clientId || clientId === "YOUR_ID") return;

    // Check if already loaded
    if (document.querySelector('script[src*="adsbygoogle"]')) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadAdSense();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-fade-in">
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-black/95 p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm text-white/70">
                We use cookies to improve your experience, analyze site traffic,
                and serve personalized ads through Google AdSense.{" "}
                <a
                  href="/privacy-policy"
                  className="text-white underline underline-offset-4 transition-colors hover:text-white/80"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/30 hover:text-white"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-white/90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Utility: Check if cookie consent has been given.
 * Import this in components that need to check consent status.
 */
export function hasConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}
