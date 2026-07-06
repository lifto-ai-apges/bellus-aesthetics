"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroVideo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-bg"
        preload="auto"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Purple Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Bottom fade — grounds the CTAs on clean dark plum (hides baked-in
          video typography behind the buttons on small screens) */}
      <div className="hero-bottom-fade"></div>

      {/* Hero Content */}
      <div className="container hero-content-container">
        <div className={`hero-content ${loaded ? "fade-in-up" : ""}`}>
          <span className="hero-eyebrow">Bellus Aesthetic Clinic</span>
          <h1 className="hero-title">
            Reveal the Skin<br />
            You've Always Wanted
          </h1>
          <p className="hero-subtitle">
            Premium, doctor-certified cosmetic transformations, non-surgical facelifts, and body contouring across Metro Manila & Cavite.
          </p>
          <div className="hero-actions">
            <Link href="/services" className="btn btn-accent hero-btn">
              Explore Treatments
            </Link>
            <Link href="/quiz" className="btn btn-outline-white hero-btn">
              Find Your Match
            </Link>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="scroll-indicator">
        <span className="scroll-label">Scroll to Explore</span>
        <div className="scroll-line"></div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: var(--clr-dark);
        }

        .hero-video-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(26, 10, 46, 0.88) 0%,
            rgba(74, 26, 107, 0.45) 50%,
            rgba(26, 10, 46, 0.92) 100%
          );
          z-index: 2;
        }

        .hero-bottom-fade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 42%;
          background: linear-gradient(
            180deg,
            rgba(26, 10, 46, 0) 0%,
            rgba(26, 10, 46, 0.4) 52%,
            rgba(26, 10, 46, 0.85) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .hero-content-container {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          align-items: center;
          padding-top: 80px; /* Account for fixed header */
        }

        .hero-content {
          max-width: 750px;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-content.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: var(--space-sm);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-md);
        }

        .hero-subtitle {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(254, 252, 249, 0.85);
          line-height: 1.5;
          margin-bottom: var(--space-lg);
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-btn {
          padding: 1.1rem 2.6rem;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0.7;
        }

        .scroll-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--clr-white);
          font-weight: 500;
        }

        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(180deg, var(--clr-accent), transparent);
          position: relative;
          overflow: hidden;
        }

        .scroll-line::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: var(--clr-white);
          animation: scrollMove 2.2s infinite ease-in-out;
        }

        @keyframes scrollMove {
          0% {
            transform: translateY(-20px);
          }
          80%, 100% {
            transform: translateY(50px);
          }
        }

        @media (max-width: 576px) {
          .hero-actions {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }
          .hero-btn {
            width: 100%;
          }
        }

        @media (max-width: 767px) {
          /* The source video has typography baked into its lower third —
             ground the bottom of the hero in deep plum so the CTAs and
             scroll cue sit on clean dark instead of colliding with it. */
          .hero-bottom-fade {
            height: 62%;
            background: linear-gradient(
              180deg,
              rgba(26, 10, 46, 0) 0%,
              rgba(26, 10, 46, 0.58) 32%,
              rgba(26, 10, 46, 0.96) 62%,
              rgba(26, 10, 46, 0.99) 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
