"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll-reveal wrapper — adds the `revealed` class once when the element
 * enters the viewport (threshold 0.15). Children start hidden/offset via
 * the `.reveal-up` styles in globals.css and ease into place.
 * Respects prefers-reduced-motion (instant, no transform).
 */
export default function Reveal({ children, delay = 0, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion or no IO support → show immediately.
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mergedStyle: CSSProperties | undefined =
    delay > 0 ? { ...style, transitionDelay: `${delay}ms` } : style;

  return (
    <div ref={ref} className={`reveal-up ${className}`.trim()} style={mergedStyle}>
      {children}
    </div>
  );
}
