"use client";

import { useEffect, useState } from "react";

/**
 * Small, classy time-aware line ("Good evening — clinics open 10 AM,
 * but you can book right now."). Renders after mount only, so the
 * server/client markup never mismatches.
 */
export default function TimeGreeting() {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) {
      setLine("Good morning — clinics open at 10 AM. Reserve your slot before the day fills up.");
    } else if (hour >= 10 && hour < 18) {
      setLine("Our clinics are open right now — same-day slots often available.");
    } else if (hour >= 18 && hour < 21) {
      setLine("Good evening — most clinics welcome walk-ins until 8 PM, and you can book ahead right here.");
    } else {
      setLine("Good evening — clinics open 10 AM, but you can book right now.");
    }
  }, []);

  if (!line) return null;

  return (
    <p className="time-greeting">
      {line}
      <style jsx>{`
        .time-greeting {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.02rem;
          color: var(--clr-accent);
          margin: -4px 0 var(--space-sm);
          animation: greetingFade 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes greetingFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .time-greeting {
            animation: none;
          }
        }
      `}</style>
    </p>
  );
}
