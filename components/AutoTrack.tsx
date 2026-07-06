"use client";

/**
 * First-party behavioral tracker for the Bellus group sites.
 * Captures the event vocabulary the LocalEnhance CRM tracking module reads
 * (page_view · call_click · whatsapp_click · directions_click · book_click ·
 * cta_click · scroll_50/scroll_90), with props.element for CTR views.
 * Ships as beacons to the bellus-leads collector — zero impact on page speed.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, BellusSite } from "../lib/leads";

export default function AutoTrack({ site }: { site: BellusSite }) {
  const pathname = usePathname();

  // page_view on load + every client-side route change
  useEffect(() => {
    track("page_view", site, { path: pathname });
  }, [pathname, site]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest?.("a, button") as HTMLElement | null;
      if (!a) return;
      const href = (a as HTMLAnchorElement).href || "";
      const label = (a.textContent || "").trim().slice(0, 60);
      const element = label || href.slice(0, 60);
      const custom = a.getAttribute("data-track");

      if (custom) track(custom, site, { element, path: location.pathname });
      else if (href.startsWith("tel:")) track("call_click", site, { element, href });
      else if (href.includes("wa.me") || href.includes("whatsapp")) track("whatsapp_click", site, { element, href });
      else if (href.includes("maps.google") || href.includes("google.com/maps") || href.includes("maps.app"))
        track("directions_click", site, { element, href });
      else if (href.includes("/book") || /book now|confirm booking/i.test(label))
        track("book_click", site, { element, path: location.pathname });
      else if (a.classList.contains("btn") || a.classList.contains("btn-primary"))
        track("cta_click", site, { element, path: location.pathname });
    };

    let s50 = false, s90 = false;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (h <= 0) return;
      const d = scrollY / h;
      if (!s50 && d > 0.5) { s50 = true; track("scroll_50", site, { path: location.pathname }); }
      if (!s90 && d > 0.9) { s90 = true; track("scroll_90", site, { path: location.pathname }); }
    };

    document.addEventListener("click", onClick, true);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      removeEventListener("scroll", onScroll);
    };
  }, [site]);

  return null;
}
