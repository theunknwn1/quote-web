"use client";

import { useEffect, useRef } from "react";

export default function AdBanner({ slot = "", format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`my-8 flex items-center justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="YOUR_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
