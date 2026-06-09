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
      {/* Background Image */}
      <img
        src="/images/hero-bg.png"
        alt="Bellus Aesthetic Clinic Team Banner"
        className="hero-img-bg"
      />

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="container hero-content-container">
        <div className={`hero-content ${loaded ? "fade-in-up" : ""}`}>
          <div className="hero-text-block">
            <span className="hero-eyebrow">Bellus Aesthetic Clinic</span>
            <h1 className="hero-title">
              Reveal the Skin<br />
              You've Always Wanted
            </h1>
            <p className="hero-subtitle">
              Premium, doctor-certified cosmetic transformations, non-surgical facelifts, and body contouring across Metro Manila & Cavite.
            </p>
          </div>
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
          overflow: hidden;
          background-color: var(--clr-dark);
        }

        /* Desktop sizing (maintain aspect ratio) */
        @media (min-width: 768px) {
          .hero-section {
            height: auto;
            aspect-ratio: 1024 / 378;
            max-height: 620px;
          }
        }

        /* Mobile sizing (taller for mobile screens) */
        @media (max-width: 767px) {
          .hero-section {
            height: 80vh;
            min-height: 500px;
            display: flex;
            align-items: center;
          }
        }

        .hero-img-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .hero-overlay {
            /* Light top and bottom shading for text/menu readability */
            background: linear-gradient(
              to bottom,
              rgba(26, 10, 46, 0.15) 0%,
              transparent 25%,
              transparent 75%,
              rgba(26, 10, 46, 0.15) 100%
            );
          }
        }

        @media (max-width: 767px) {
          .hero-overlay {
            /* Dark purple overlay for white text readability on cropped mobile background */
            background: linear-gradient(
              135deg,
              rgba(26, 10, 46, 0.85) 0%,
              rgba(74, 26, 107, 0.5) 50%,
              rgba(26, 10, 46, 0.88) 100%
            );
          }
        }

        .hero-content-container {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          width: 100%;
        }

        @media (min-width: 768px) {
          .hero-content-container {
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 35px; /* Adjust height of floating action bar */
          }
        }

        @media (max-width: 767px) {
          .hero-content-container {
            align-items: center;
            padding-top: 80px; /* Account for fixed header on mobile */
          }
        }

        .hero-content {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
          .hero-content {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }

        @media (max-width: 767px) {
          .hero-content {
            max-width: 750px;
          }
        }

        .hero-content.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* Screen reader only styles for desktop, normal layout on mobile */
        @media (min-width: 768px) {
          .hero-text-block {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
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
          font-size: clamp(2.3rem, 5vw, 4rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-md);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(254, 252, 249, 0.85);
          line-height: 1.5;
          margin-bottom: var(--space-lg);
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
        }

        @media (min-width: 768px) {
          .hero-actions {
            gap: 20px;
            background: rgba(26, 10, 46, 0.65);
            padding: 12px 28px;
            border-radius: var(--radius-full);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(201, 169, 110, 0.25);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
        }

        @media (max-width: 767px) {
          .hero-actions {
            gap: 16px;
          }
        }

        .hero-btn {
          padding: 1.1rem 2.6rem;
        }

        @media (min-width: 768px) {
          .hero-btn {
            padding: 0.9rem 2.2rem;
            font-size: 0.9rem;
          }
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0.7;
        }

        @media (min-width: 768px) {
          .scroll-indicator {
            display: none; /* Hide on desktop for clean banner */
          }
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
      `}</style>
    </section>
  );
}
