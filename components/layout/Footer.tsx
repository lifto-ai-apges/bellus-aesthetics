"use client";

import Link from "next/link";
import Image from "next/image";
import { branchesData } from "../../data/branches";

export default function Footer() {
  const quickLinks = [
    { name: "Services & Treatments", href: "/services" },
    { name: "Skincare Products", href: "/products" },
    { name: "Perfect Treatment Quiz", href: "/quiz" },
    { name: "SEO Articles & Guides", href: "/articles" },
    { name: "About Bellus", href: "/about" },
    { name: "Contact & Booking", href: "/contact" },
  ];

  return (
    <footer className="footer section-dark">
      <div className="container">
        <div className="footer-grid">
          {/* Company Bio */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo">
              <Image
                src="/logo.png"
                alt="Bellus Aesthetics Logo"
                width={60}
                height={60}
                className="logo-img"
              />
              <div className="logo-text">
                <span className="logo-title">BELLUS</span>
                <span className="logo-subtitle">AESTHETICS</span>
              </div>
            </Link>
            <p className="brand-desc">
              State-of-the-art medical aesthetic clinic providing premium, doctor-certified cosmetic treatments and skin transformations across Metro Manila and Cavite.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/BellusIntlCorp/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                FB
              </a>
              <a href="https://www.instagram.com/bellus.aesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                IG
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                TK
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branch Locations */}
          <div className="footer-col branches-col">
            <h3 className="footer-title">Our Branches</h3>
            <div className="branches-list">
              {branchesData.map((branch) => (
                <div key={branch.id} className="footer-branch-item">
                  <span className="branch-name">{branch.shortName}</span>
                  <p className="branch-address">{branch.address.split(",")[0] + ", " + branch.city}</p>
                  <span className="branch-phone">{branch.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-accent-line" style={{ margin: "var(--space-xl) 0 var(--space-md)" }}></div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Bellus Aesthetics Clinic. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--clr-dark);
          color: var(--clr-text-light);
          padding-top: var(--space-xxl);
          padding-bottom: var(--space-md);
          border-top: 1px solid rgba(201, 169, 110, 0.2);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 2fr;
          gap: var(--space-xl);
        }

        .brand-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-img {
          border-radius: 50%;
          border: 1px solid var(--clr-accent);
          background-color: var(--clr-white);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: var(--clr-accent) !important;
          line-height: 1;
        }

        .logo-subtitle {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          color: var(--clr-white);
          margin-top: 4px;
        }

        .brand-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(254, 252, 249, 0.7);
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(254, 252, 249, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--clr-accent);
          transition: var(--transition-smooth);
        }

        .social-links a:hover {
          background-color: var(--clr-accent);
          color: var(--clr-dark);
          border-color: var(--clr-accent);
          transform: translateY(-2px);
        }

        .footer-title {
          font-size: 1.3rem;
          color: var(--clr-accent) !important;
          margin-bottom: var(--space-md);
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 1px;
          background-color: var(--clr-accent);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-links a {
          color: rgba(254, 252, 249, 0.7);
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--clr-accent);
          padding-left: 4px;
        }

        .branches-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .footer-branch-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .branch-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--clr-white);
        }

        .branch-address {
          font-size: 0.8rem;
          color: rgba(254, 252, 249, 0.5) !important;
          line-height: 1.4;
        }

        .branch-phone {
          font-size: 0.8rem;
          color: var(--clr-accent);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: rgba(254, 252, 249, 0.5);
        }

        .footer-bottom-links {
          display: flex;
          gap: var(--space-md);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
          
          .branches-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
