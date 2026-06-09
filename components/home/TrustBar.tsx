"use client";

import AnimatedCounter from "../ui/AnimatedCounter";

export default function TrustBar() {
  const stats = [
    { target: 9, suffix: "+", label: "Years of Excellence" },
    { target: 7, suffix: "", label: "Clinic Branches" },
    { target: 100, suffix: "K+", label: "Clients Served" },
    { target: 50, suffix: "+", label: "Clinical Treatments" },
  ];

  return (
    <section className="trust-bar-section">
      <div className="container">
        <div className="trust-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-number-wrapper">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .trust-bar-section {
          background-color: var(--clr-bg-alt);
          border-top: var(--border-gold);
          border-bottom: var(--border-gold);
          padding: var(--space-lg) 0;
          position: relative;
          z-index: 10;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          text-align: center;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .stat-number-wrapper {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          color: var(--clr-primary);
          line-height: 1;
          font-weight: 500;
        }

        .stat-label {
          font-size: clamp(0.75rem, 1.2vw, 0.9rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--clr-text-muted);
        }

        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-lg);
          }
        }
      `}</style>
    </section>
  );
}
