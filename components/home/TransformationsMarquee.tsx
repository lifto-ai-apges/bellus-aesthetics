"use client";

import Image from "next/image";

export default function TransformationsMarquee() {
  const track1 = [
    "/images/before-after-optimized/pair_1.jpg",
    "/images/before-after-optimized/pair_2.jpg",
    "/images/before-after-optimized/pair_3.jpg",
    "/images/before-after-optimized/pair_4.jpg",
    "/images/before-after-optimized/pair_5.jpg",
    "/images/before-after-optimized/pair_6.jpg",
    "/images/before-after-optimized/pair_7.jpg",
    "/images/before-after-optimized/pair_8.jpg",
  ];

  const track2 = [
    "/images/before-after-optimized/pair_10.jpg",
    "/images/before-after-optimized/pair_11.jpg",
    "/images/before-after-optimized/pair_12.jpg",
    "/images/before-after-optimized/pair_13.jpg",
    "/images/before-after-optimized/pair_14.jpg",
    "/images/before-after-optimized/pair_15.jpg",
    "/images/before-after-optimized/pair_16.jpg",
    "/images/before-after-optimized/pair_17.jpg",
  ];

  return (
    <section className="section marquee-section bg-cream-alt">
      <div className="container text-center section-header-wrapper">
        <span className="section-eyebrow">@bellus.ph</span>
        <h2 className="section-title">Clinical Results</h2>
        <div className="gold-divider"></div>
        <p className="section-desc">
          A glimpse of real, board-certified clinical outcomes. Hover on any card to pause scrolling and examine before/after details.
        </p>
      </div>

      {/* Track 1: Scrolls Left */}
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Render first set */}
          {track1.map((src, idx) => (
            <div key={`t1-${idx}`} className="marquee-item">
              <img src={src} alt="Bellus Clinical Transformation" loading="lazy" />
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {track1.map((src, idx) => (
            <div key={`t1-dup-${idx}`} className="marquee-item">
              <img src={src} alt="Bellus Clinical Transformation Duplicate" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Scrolls Right */}
      <div className="marquee-container marquee-container-reverse">
        <div className="marquee-track marquee-track-reverse">
          {/* Render first set */}
          {track2.map((src, idx) => (
            <div key={`t2-${idx}`} className="marquee-item">
              <img src={src} alt="Bellus Clinical Transformation" loading="lazy" />
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {track2.map((src, idx) => (
            <div key={`t2-dup-${idx}`} className="marquee-item">
              <img src={src} alt="Bellus Clinical Transformation Duplicate" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-section {
          background-color: var(--clr-bg-alt);
          padding: var(--space-xl) 0 var(--space-xxl);
          overflow: hidden;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }

        .section-header-wrapper {
          margin-bottom: var(--space-xl);
          padding: 0 var(--space-md);
        }

        .section-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          color: var(--clr-primary);
        }

        .section-desc {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
        }

        /* Marquee styles */
        .marquee-container {
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 12px 0;
        }

        .marquee-container-reverse {
          padding-bottom: 20px;
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          /* Width of 8 items + gaps (340px * 8 + 20px * 8 = 2880px) */
          animation: scrollMarquee 45s linear infinite;
        }

        .marquee-track-reverse {
          animation: scrollMarqueeReverse 45s linear infinite;
        }

        /* Pause on hover */
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item {
          flex: 0 0 340px;
          width: 340px;
          height: 170px; /* 2:1 aspect ratio */
          border-radius: var(--radius-md);
          overflow: hidden;
          border: var(--border-gold);
          box-shadow: var(--shadow-sm);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          cursor: pointer;
          background-color: var(--clr-bg);
        }

        .marquee-item:hover {
          transform: scale(1.04);
          box-shadow: var(--shadow-md);
          border-color: var(--clr-accent);
        }

        .marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2880px);
          }
        }

        @keyframes scrollMarqueeReverse {
          0% {
            transform: translateX(-2880px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            flex: 0 0 260px;
            width: 260px;
            height: 130px;
          }
          @keyframes scrollMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              /* Width of 8 items + gaps on mobile (260px * 8 + 20px * 8 = 2240px) */
              transform: translateX(-2240px);
            }
          }
          @keyframes scrollMarqueeReverse {
            0% {
              transform: translateX(-2240px);
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </section>
  );
}
