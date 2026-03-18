"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (err) {
        console.error("Analytics tracking failed", err);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
