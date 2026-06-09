"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import HeroVideo from "../components/home/HeroVideo";
import TrustBar from "../components/home/TrustBar";
import ServicesPreview from "../components/home/ServicesPreview";
import BranchMap from "../components/home/BranchMap";
import TransformationsMarquee from "../components/home/TransformationsMarquee";

export default function Home() {
  // Before/After slider state
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const usps = [
    {
      title: "Board-Certified Specialists",
      desc: "All invasive procedures and consultations are performed exclusively by board-certified cosmetic and reconstructive surgeons.",
      icon: "🩺"
    },
    {
      title: "Premium US & FDA Technologies",
      desc: "Our clinics house premium FDA-approved systems including Cryolipolysis cooling plates, 12D HIFU, and picosecond lasers.",
      icon: "💎"
    },
    {
      title: "Clinical Luxury Ambience",
      desc: "Relax in our clean, private, and state-of-the-art clinic lounges designed for your absolute comfort and recovery.",
      icon: "✨"
    },
    {
      title: "Personalized Treatment Maps",
      desc: "We don't believe in generic packages. Every face and body receives a customized clinical blueprint based on real diagnostics.",
      icon: "📋"
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Video Block */}
      <HeroVideo />

      {/* 2. Stats Trust Bar */}
      <TrustBar />

      {/* 3. Featured Services Grid */}
      <ServicesPreview />

      {/* 4. Before/After Interactive Comparison Slider */}
      <section className="section comparison-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Transformation</span>
            <h2 className="section-title">Visible Transformations</h2>
            <div className="gold-divider"></div>
            <p className="section-desc">
              Slide to see the clinical results of our treatments. Our non-surgical procedures deliver safe, progressive skin clearing and body slimming.
            </p>
          </div>

          <div 
            ref={sliderRef}
            className="ba-slider"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ "--clip-pos": `${sliderPos}%` } as React.CSSProperties}
          >
            {/* Before Skin Image */}
            <div className="ba-image ba-before">
              <img src="/images/slider-before.jpg" alt="Clinical Face Lift Before Treatment" className="slider-img-content" />
              <div className="ba-label ba-label-before">Before Facelift</div>
            </div>

            {/* After Skin Image */}
            <div className="ba-image ba-after">
              <img src="/images/slider-after.jpg" alt="Clinical Face Lift After Treatment" className="slider-img-content" />
              <div className="ba-label ba-label-after">After (Facelift)</div>
            </div>

            {/* Drag Handle */}
            <div className="ba-handle"></div>
            <div className="ba-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 20, height: 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Double-Track Infinite Marquee Gallery */}
      <TransformationsMarquee />

      {/* 5. Why Choose Bellus USPs */}
      <section className="section usp-section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Excellence</span>
            <h2 className="section-title">The Bellus Standard</h2>
            <div className="gold-divider"></div>
            <p className="section-desc">
              We combine scientific beauty treatments with board-certified medical supervision to provide an unmatched standard of clinic care.
            </p>
          </div>

          <div className="usp-grid">
            {usps.map((usp, idx) => (
              <div key={idx} className="glass-card-dark usp-card">
                <span className="usp-icon">{usp.icon}</span>
                <h3 className="usp-title">{usp.title}</h3>
                <p className="usp-desc">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Skincare Quiz Call-To-Action Banner */}
      <section className="section quiz-cta-section">
        <div className="container">
          <div className="quiz-cta-box glass-card">
            <div className="quiz-cta-content">
              <span className="quiz-eyebrow">Smart Skincare</span>
              <h2 className="quiz-title">Find Your Perfect Treatment Map</h2>
              <p className="quiz-desc">
                Take our 6-step diagnostic quiz. Receive a customized combination of services and products tailored specifically to your concerns and budget.
              </p>
              <Link href="/quiz" className="btn btn-primary quiz-btn">
                Start Skin Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Branches Map Section */}
      <BranchMap />

      <style jsx>{`
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto var(--space-xl);
        }

        .section-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
        }

        .section-desc {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
        }

        .comparison-section {
          background-color: var(--clr-bg-alt);
        }

        .slider-img-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ba-label {
          position: absolute;
          bottom: 20px;
          background: rgba(26, 10, 46, 0.8);
          color: var(--clr-white);
          padding: 8px 16px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(201, 169, 110, 0.3);
          z-index: 10;
        }

        .ba-label-before {
          left: 20px;
        }

        .ba-label-after {
          right: 20px;
        }

        /* USP Grid */
        .usp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .usp-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid rgba(201, 169, 110, 0.1);
        }

        .usp-icon {
          font-size: 2.5rem;
        }

        .usp-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--clr-accent) !important;
        }

        .usp-desc {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Quiz Banner */
        .quiz-cta-section {
          background-color: var(--clr-bg);
        }

        .quiz-cta-box {
          background: linear-gradient(135deg, rgba(74, 26, 107, 0.05) 0%, rgba(201, 169, 110, 0.08) 100%);
          border: var(--border-gold);
          text-align: center;
          padding: var(--space-xxl) var(--space-lg);
        }

        .quiz-cta-content {
          max-width: 650px;
          margin: 0 auto;
        }

        .quiz-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 8px;
        }

        .quiz-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          color: var(--clr-primary);
          margin-bottom: var(--space-sm);
        }

        .quiz-desc {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-lg);
        }

        .quiz-btn {
          padding: 0.9rem 2.8rem;
        }

        @media (max-width: 768px) {
          .usp-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}
