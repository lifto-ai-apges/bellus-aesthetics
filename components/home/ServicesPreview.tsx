"use client";

import Link from "next/link";
import ServiceCard from "../ui/ServiceCard";
import { servicesData } from "../../data/services";

export default function ServicesPreview() {
  // Extract 3 featured services for preview
  const featuredIds = [
    { serviceId: "bellutherm", categorySlug: "whitening-anti-aging" },
    { serviceId: "be-freezefats", categorySlug: "body-treatments" },
    { serviceId: "rejuran", categorySlug: "doctor-procedures" },
  ];

  const featuredServices = featuredIds.map(f => {
    const category = servicesData.find(c => c.id === f.categorySlug);
    const service = category?.services.find(s => s.id === f.serviceId);
    return { service, categorySlug: f.categorySlug };
  }).filter(item => item.service !== undefined);

  return (
    <section className="section services-preview-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Signature Offerings</span>
          <h2 className="section-title">Clinically Proven Results</h2>
          <div className="gold-divider"></div>
          <p className="section-desc">
            Explore our state-of-the-art procedures designed to rejuvenate your skin, restore facial volume, and sculpt your ideal body contour.
          </p>
        </div>

        <div className="services-grid">
          {featuredServices.map((item, idx) => (
            <div key={idx} className="grid-item">
              <ServiceCard service={item.service!} categorySlug={item.categorySlug} />
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <Link href="/services" className="btn btn-primary view-all-btn">
            View All Treatments
          </Link>
        </div>
      </div>

      <style jsx>{`
        .services-preview-section {
          background-color: var(--clr-bg);
        }

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
          color: var(--clr-primary);
        }

        .section-desc {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }

        .view-all-wrapper {
          text-align: center;
        }

        .view-all-btn {
          padding: 0.9rem 2.5rem;
        }

        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
      `}</style>
    </section>
  );
}
