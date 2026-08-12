"use client";

import { useEffect } from "react";

const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A responsive Google AdSense unit. Renders nothing until both the
 * publisher id (NEXT_PUBLIC_ADSENSE_CLIENT) and a slot id are configured,
 * so the layout is unaffected before AdSense approval.
 */
export default function AdSlot({
  slot,
  className,
}: {
  slot?: string;
  className?: string;
}) {
  useEffect(() => {
    if (!ADS_CLIENT || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle.js not loaded (blocked or offline) — fail silently
    }
  }, [slot]);

  if (!ADS_CLIENT || !slot) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADS_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
