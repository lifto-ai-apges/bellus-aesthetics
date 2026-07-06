"use client";

import Link from "next/link";
import { servicesData } from "../../data/services";
import StickyBookBar from "../../components/ui/StickyBookBar";

export default function ServicesHub() {
  return (
    <div className="services-hub-page">
      <StickyBookBar />
      {/* Page Header */}
      <section className="section hub-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="hub-eyebrow">Bellus Offerings</span>
            <h1 className="hub-title">Clinically Refined Treatments</h1>
            <p className="hub-desc">
              Discover our comprehensive range of safe, certified aesthetic services. From non-invasive body contouring and facials to board-certified doctor procedures and IV infusions.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section hub-grid-section">
        <div className="container">
          <div className="categories-grid">
            {servicesData.map((category) => (
              <div key={category.id} className="glass-card category-card">
                <div className="card-top">
                  <span className="service-count">{category.services.length} Treatments</span>
                  <h2 className="category-title">{category.title}</h2>
                  <p className="category-desc">{category.description}</p>
                </div>

                <div className="featured-services-list">
                  <span className="list-heading">Featured Procedures:</span>
                  <ul className="cat-services-list">
                    {category.services.slice(0, 3).map((service) => (
                      <li key={service.id} className="cat-service-item">
                        <span className="bullet">&#10059;</span>
                        <span className="name">{service.name}</span>
                        <span className="price-tag">{service.price.split("/")[0]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-bottom">
                  <Link href={`/services/${category.id}`} className="btn btn-primary card-view-btn">
                    Explore Category &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hub-header {
          padding-top: 150px;
          padding-bottom: var(--space-xl);
          background: linear-gradient(180deg, var(--clr-dark-alt) 0%, var(--clr-dark) 100%);
          text-align: center;
        }

        .header-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .hub-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .hub-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-sm);
        }

        .hub-desc {
          font-size: 1.1rem;
          color: rgba(254, 252, 249, 0.75);
          line-height: 1.5;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
          margin-top: -50px; /* Overlap with dark header section */
          position: relative;
          z-index: 20;
        }

        .category-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: var(--clr-white);
          padding: var(--space-lg);
          height: 100%;
        }

        .service-count {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
          background-color: rgba(201, 169, 110, 0.08);
          border: 1px solid rgba(201, 169, 110, 0.15);
          padding: 3px 12px;
          border-radius: var(--radius-full);
          display: inline-block;
          margin-bottom: 12px;
        }

        .category-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--clr-primary);
          margin-bottom: var(--space-xs);
        }

        .category-desc {
          font-size: 0.98rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-md);
        }

        .featured-services-list {
          margin-bottom: var(--space-lg);
          background-color: var(--clr-bg-alt);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          border: 1px solid rgba(74, 26, 107, 0.03);
        }

        .list-heading {
          display: block;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-primary);
          margin-bottom: var(--space-xs);
        }

        .cat-services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cat-service-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--clr-text-muted);
        }

        .cat-service-item .name {
          flex-grow: 1;
          margin-left: 6px;
        }

        .cat-service-item .price-tag {
          font-weight: 500;
          color: var(--clr-primary);
        }

        .bullet {
          color: var(--clr-accent);
          font-size: 0.65rem;
        }

        .card-view-btn {
          width: 100%;
          padding: 0.8rem 0;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
            margin-top: -20px;
          }
        }
      `}</style>
    </div>
  );
}
