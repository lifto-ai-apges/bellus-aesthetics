"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Treatment Quiz", href: "/quiz" },
    { name: "Articles", href: "/articles" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`header ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <div className="logo-wrapper">
            <Image
              src="/logo.jpg"
              alt="Bellus Aesthetics Logo"
              width={50}
              height={50}
              priority
              className="logo-img"
            />
            <div className="logo-text">
              <span className="logo-title">BELLUS</span>
              <span className="logo-subtitle">AESTHETICS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Book Now Button */}
        <div className="header-cta">
          <Link href="/book" className="btn btn-primary btn-book">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`bar ${mobileMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "active" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "active" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/book" className="btn btn-primary mobile-book-btn">
            Book Now
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-sm) var(--space-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 85px;
        }

        .logo-link {
          display: flex;
          align-items: center;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-img {
          border-radius: 50%;
          border: 1px solid rgba(201, 169, 110, 0.4);
          object-fit: cover;
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
          color: var(--clr-primary);
          line-height: 1;
        }

        .logo-subtitle {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          color: var(--clr-accent);
          margin-top: 4px;
        }

        .desktop-nav {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--clr-text);
          position: relative;
          padding: 6px 0;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--clr-accent);
          transition: var(--transition-smooth);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--clr-primary);
        }

        .btn-book {
          padding: 0.7rem 1.6rem;
          font-size: 0.85rem;
        }

        /* Mobile Menu Toggle */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 8px;
        }

        .bar {
          width: 24px;
          height: 2px;
          background-color: var(--clr-primary);
          transition: var(--transition-smooth);
        }

        .bar.active:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .bar.active:nth-child(2) {
          opacity: 0;
        }

        .bar.active:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile nav drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background-color: var(--clr-bg);
          box-shadow: var(--shadow-lg);
          padding: 120px 40px 40px;
          transition: var(--transition-smooth);
          z-index: 999;
          border-left: var(--border-gold);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--clr-text);
          border-bottom: 1px solid rgba(74, 26, 107, 0.05);
          padding-bottom: 10px;
        }

        .mobile-nav-link.active,
        .mobile-nav-link:hover {
          color: var(--clr-primary);
          border-bottom-color: var(--clr-accent);
        }

        .mobile-book-btn {
          margin-top: 1rem;
        }

        @media (max-width: 992px) {
          .desktop-nav,
          .header-cta {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
