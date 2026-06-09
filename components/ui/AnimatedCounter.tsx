"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ target, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function: easeOutQuad
            const easedProgress = progress * (2 - progress);
            const currentCount = Math.floor(easedProgress * target);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  // Format count dynamically (e.g., add commas)
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span ref={elementRef} className="counter-number">
      {formatNumber(count)}
      {suffix}
      <style jsx>{`
        .counter-number {
          display: inline-block;
          font-family: var(--font-serif);
          font-weight: 500;
        }
      `}</style>
    </span>
  );
}
