"use client";

import Link from "next/link";
import { ServiceItem } from "../../data/services";

interface ServiceCardProps {
  service: ServiceItem;
  categorySlug: string;
}

export default function ServiceCard({ service, categorySlug }: ServiceCardProps) {
  return (
    <div className="glass-card service-card">
      <div className="card-header">
        <h3 className="service-name">{service.name}</h3>
        <span className="service-price">{service.price}</span>
      </div>

      <p className="service-desc">{service.description}</p>

      {service.benefits && service.benefits.length > 0 && (
        <div className="service-benefits-sec">
          <span className="sec-label">Key Benefits:</span>
          <ul className="benefits-list">
            {service.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="benefit-item">
                <span className="bullet">&#10059;</span> {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.options && service.options.length > 0 && (
        <div className="service-options-sec">
          <span className="sec-label">Options:</span>
          <div className="options-grid">
            {service.options.map((opt, idx) => (
              <div key={idx} className="option-item">
                <span className="opt-name">{opt.name}</span>
                <span className="opt-price">{opt.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-actions">
        <Link href={`/services/${categorySlug}`} className="btn btn-outline card-learn-more">
          Details
        </Link>
        <Link href={`/book?service=${service.id}`} className="btn btn-primary card-book-now">
          Book Now
        </Link>
      </div>

      <style jsx>{`
        .service-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(201, 169, 110, 0.18);
          background: linear-gradient(135deg, rgba(254, 252, 249, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: var(--space-lg);
          box-shadow: 0 8px 30px rgba(26, 10, 46, 0.04);
          transition: var(--transition-smooth);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--clr-accent), transparent);
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .service-card:hover {
          transform: translateY(-8px);
          border-color: var(--clr-accent);
          box-shadow: 0 16px 40px rgba(26, 10, 46, 0.08), 0 8px 24px rgba(74, 26, 107, 0.04);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: var(--space-sm);
        }

        .service-name {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--clr-primary);
          line-height: 1.25;
          font-weight: 500;
        }

        .service-price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--clr-accent);
          font-weight: 600;
          white-space: nowrap;
          background: rgba(201, 169, 110, 0.08);
          padding: 2px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(201, 169, 110, 0.15);
        }

        .service-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-md);
          flex-grow: 1;
        }

        .sec-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--clr-primary);
          opacity: 0.85;
          margin-bottom: 8px;
        }

        .service-benefits-sec {
          margin-bottom: var(--space-md);
        }

        .benefits-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .benefit-item {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }

        .bullet {
          color: var(--clr-accent);
          font-size: 0.65rem;
          margin-top: 3px;
        }

        .service-options-sec {
          margin-bottom: var(--space-md);
          background: rgba(74, 26, 107, 0.03);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(74, 26, 107, 0.05);
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .option-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .opt-name {
          color: var(--clr-text-muted);
        }

        .opt-price {
          font-weight: 600;
          color: var(--clr-primary);
        }

        .card-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
          width: 100%;
        }

        .card-learn-more {
          flex: 1;
          padding: 0.7rem 0;
          font-size: 0.8rem;
          border: 1px solid rgba(74, 26, 107, 0.3);
        }

        .card-learn-more:hover {
          background-color: rgba(74, 26, 107, 0.05);
          border-color: var(--clr-primary);
        }

        .card-book-now {
          flex: 1.6;
          padding: 0.7rem 0;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
