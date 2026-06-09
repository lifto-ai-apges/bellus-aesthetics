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
          border: var(--border-gold);
          padding: var(--space-md);
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
          font-size: 1.4rem;
          color: var(--clr-primary);
          line-height: 1.2;
        }

        .service-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--clr-accent);
          font-weight: 500;
          white-space: nowrap;
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
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-primary);
          margin-bottom: 6px;
        }

        .service-benefits-sec {
          margin-bottom: var(--space-md);
        }

        .benefits-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .benefit-item {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .bullet {
          color: var(--clr-accent);
          font-size: 0.7rem;
        }

        .service-options-sec {
          margin-bottom: var(--space-md);
          background: rgba(74, 26, 107, 0.03);
          padding: 8px 12px;
          border-radius: var(--radius-md);
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .option-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .opt-name {
          color: var(--clr-text-muted);
        }

        .opt-price {
          font-weight: 500;
          color: var(--clr-primary);
        }

        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .card-learn-more {
          flex: 1;
          padding: 0.6rem 0;
          font-size: 0.8rem;
        }

        .card-book-now {
          flex: 1.5;
          padding: 0.6rem 0;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
