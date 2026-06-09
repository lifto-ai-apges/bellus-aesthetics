"use client";

import Link from "next/link";
import { articlesData } from "../../data/articles";
import { getBreadcrumbSchema } from "../../lib/schema";

export default function ArticlesHub() {
  const featuredArticle = articlesData[0];
  const restArticles = articlesData.slice(1);

  // Generate breadcrumb schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Articles", item: "/articles" }
  ]);

  return (
    <div className="articles-hub-page">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="section hub-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="hub-eyebrow">Bellus Knowledge</span>
            <h1 className="hub-title">Treatment Guides & Clinical Insights</h1>
            <p className="hub-desc">
              Read our latest articles authored by board-certified cosmetic surgeons and clinical specialists. Understand the science behind skin clearing, fat freezing, and anti-aging lasers.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <section className="section feed-section">
        <div className="container">
          {/* 1. Featured Article */}
          {featuredArticle && (
            <div className="featured-card glass-card">
              <div className="featured-illustration">
                <svg className="featured-svg" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="var(--clr-bg-alt)" />
                  <circle cx="200" cy="125" r="70" fill="url(#purpleGrad)" fillOpacity="0.1" />
                  <line x1="50" y1="125" x2="350" y2="125" stroke="var(--clr-accent)" strokeWidth="0.5" strokeDasharray="4 4" />
                  <text x="200" y="132" textAnchor="middle" fill="var(--clr-primary)" fontFamily="var(--font-serif)" fontSize="1.4rem" letterSpacing="0.1em">BELLUS JOURNAL</text>
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="400" y2="250">
                      <stop offset="0%" stopColor="var(--clr-primary)" />
                      <stop offset="100%" stopColor="var(--clr-accent)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="featured-info">
                <div className="article-meta">
                  <span className="article-tag">{featuredArticle.tags[0]}</span>
                  <span className="dot">&middot;</span>
                  <span className="article-read">{featuredArticle.readTime}</span>
                </div>
                <h2 className="featured-title">{featuredArticle.title}</h2>
                <p className="featured-summary">{featuredArticle.summary}</p>
                <div className="author-row">
                  <span className="author-name">By {featuredArticle.author}</span>
                  <span className="date">{featuredArticle.date}</span>
                </div>
                <Link href={`/articles/${featuredArticle.slug}`} className="btn btn-primary read-btn">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* 2. Grid of other articles */}
          <div className="articles-grid" style={{ marginTop: "var(--space-xl)" }}>
            {restArticles.map((article) => (
              <Link href={`/articles/${article.slug}`} key={article.slug} className="grid-item-link">
                <div className="glass-card article-card">
                  <div className="card-illustration">
                    <svg className="card-svg" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="var(--clr-bg-alt)" />
                      <rect x="50" y="30" width="200" height="120" rx="3" fill="var(--clr-primary)" fillOpacity="0.03" stroke="var(--clr-accent)" strokeWidth="0.5" />
                      <text x="150" y="96" textAnchor="middle" fill="var(--clr-primary)" fontFamily="var(--font-serif)" fontSize="1rem" letterSpacing="0.05em">AESTHETICS GUIDE</text>
                    </svg>
                  </div>
                  <div className="card-info">
                    <div className="article-meta">
                      <span className="article-tag">{article.tags[0]}</span>
                      <span className="article-read">{article.readTime}</span>
                    </div>
                    <h3 className="card-title">{article.title}</h3>
                    <p className="card-desc-short">{article.summary}</p>
                    <div className="author-row">
                      <span className="author-name">By {article.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
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

        .feed-section {
          background-color: var(--clr-bg);
          padding-top: var(--space-xl);
        }

        /* Featured card */
        .featured-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-lg);
          padding: var(--space-md);
          background-color: var(--clr-white);
          overflow: hidden;
          margin-top: -50px;
          position: relative;
          z-index: 20;
        }

        .featured-illustration {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: var(--border-gold);
        }

        .featured-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .featured-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .article-tag {
          color: var(--clr-accent);
        }

        .article-read {
          color: var(--clr-text-muted);
        }

        .featured-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          color: var(--clr-primary);
          line-height: 1.25;
        }

        .featured-summary {
          font-size: 1rem;
          color: var(--clr-text-muted);
          line-height: 1.6;
        }

        .author-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--clr-text-muted);
          border-top: 1px solid rgba(74, 26, 107, 0.05);
          padding-top: 10px;
          margin-top: 4px;
        }

        .author-name {
          font-weight: 600;
        }

        .read-btn {
          align-self: flex-start;
          padding: 0.75rem 2rem;
          font-size: 0.85rem;
          margin-top: var(--space-xs);
        }

        /* Grid other articles */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .grid-item-link:hover .article-card {
          border-color: var(--clr-accent);
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .article-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: var(--clr-white);
          padding: var(--space-md);
          border: var(--border-gold);
          transition: var(--transition-smooth);
        }

        .card-illustration {
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: var(--space-sm);
        }

        .card-svg {
          width: 100%;
          display: block;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--clr-primary);
          line-height: 1.25;
        }

        .card-desc-short {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
        }

        @media (max-width: 992px) {
          .featured-card {
            grid-template-columns: 1fr;
          }
          .articles-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}
