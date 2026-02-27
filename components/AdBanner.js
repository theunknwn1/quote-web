"use client";

import { useEffect, useRef, useState } from "react";

export default function AdBanner({ slot = "", format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check consent status
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      setConsentGiven(true);
    }
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    if (pushed.current) return;

    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [consentGiven]);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "YOUR_ID";

  // Show placeholder when no consent
  if (!consentGiven) {
    return (
      <div
        className={`my-8 flex items-center justify-center rounded-lg border border-dashed border-white/10 py-8 ${className}`}
      >
        <span className="text-xs text-white/20">Ad Space</span>
      </div>
    );
  }

  return (
    <div className={`my-8 flex items-center justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
