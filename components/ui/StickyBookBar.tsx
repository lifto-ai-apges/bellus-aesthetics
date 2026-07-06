"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISS_KEY = "bellus-bookbar-dismissed";
const SHOW_AFTER_PX = 600;

/**
 * Slim mobile-only booking bar that slides up from the bottom once the
 * visitor scrolls past the hero. Dismissible (remembered per session).
 * While visible it adds `bookbar-visible` to <body> so the ChatWidget
 * bubble offsets itself above the bar (see globals.css).
 */
export default function StickyBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden until sessionStorage is read

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }

    const onScroll = () => setPastHero(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = pastHero && !dismissed;

  // Flag the body so other fixed elements (chat bubble) can offset above the bar.
  useEffect(() => {
    document.body.classList.toggle("bookbar-visible", visible);
    return () => document.body.classList.remove("bookbar-visible");
  }, [visible]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode — dismiss for this page view only */
    }
  };

  return (
    <div className={`book-bar ${visible ? "book-bar-visible" : ""}`} aria-hidden={!visible}>
      <div className="book-bar-info">
        <span className="book-bar-price">Treatments from ₱4,500</span>
        <span className="book-bar-sub">3× 0% installments available</span>
      </div>
      <Link href="/book" className="book-bar-cta" tabIndex={visible ? 0 : -1}>
        Book now
      </Link>
      <button
        type="button"
        className="book-bar-close"
        onClick={dismiss}
        aria-label="Dismiss booking bar"
        tabIndex={visible ? 0 : -1}
      >
        &times;
      </button>

      <style jsx>{`
        .book-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 997;
          display: none;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
          background: linear-gradient(135deg, rgba(26, 10, 46, 0.97) 0%, rgba(74, 26, 107, 0.97) 100%);
          border-top: 1px solid rgba(201, 169, 110, 0.35);
          box-shadow: 0 -8px 24px rgba(26, 10, 46, 0.35);
          transform: translateY(105%);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .book-bar-visible {
          transform: translateY(0);
        }

        .book-bar-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .book-bar-price {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--clr-white);
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .book-bar-sub {
          font-size: 0.68rem;
          font-weight: 500;
          color: var(--clr-accent-light);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .book-bar :global(.book-bar-cta) {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--clr-accent);
          color: var(--clr-dark);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.65rem 1.5rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 14px rgba(201, 169, 110, 0.35);
          transition: var(--transition-fast);
        }

        .book-bar :global(.book-bar-cta:active) {
          transform: scale(0.97);
          background-color: var(--clr-accent-light);
        }

        .book-bar-close {
          flex-shrink: 0;
          background: transparent;
          border: none;
          color: rgba(254, 252, 249, 0.55);
          font-size: 1.35rem;
          line-height: 1;
          padding: 6px 4px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .book-bar-close:active {
          color: var(--clr-white);
        }

        @media (max-width: 767px) {
          .book-bar {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
