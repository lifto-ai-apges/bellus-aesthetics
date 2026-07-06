"use client";

import { ProductItem } from "../../data/products";

interface ProductCardProps {
  product: ProductItem;
  onOpenDetails: (product: ProductItem) => void;
  onBuy: (product: ProductItem) => void;
}

export default function ProductCard({ product, onOpenDetails, onBuy }: ProductCardProps) {
  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy(product);
  };

  // Luxury SVG illustration placeholder based on category
  const renderProductIllustration = () => {
    if (product.category === "beauty-machines") {
      return (
        <svg className="product-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="url(#purpleGoldGrad)" fillOpacity="0.08" stroke="var(--clr-accent)" strokeWidth="0.5" />
          <path d="M40 70 L60 70 L55 35 L45 35 Z" fill="var(--clr-primary)" fillOpacity="0.2" stroke="var(--clr-primary)" strokeWidth="1" />
          <circle cx="50" cy="30" r="8" fill="var(--clr-accent)" fillOpacity="0.3" stroke="var(--clr-accent)" strokeWidth="1" />
          <line x1="50" y1="38" x2="50" y2="70" stroke="var(--clr-accent)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    }

    if (product.category === "masks-scrubs") {
      return (
        <svg className="product-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="40" width="40" height="42" rx="4" fill="var(--clr-accent)" fillOpacity="0.1" stroke="var(--clr-accent)" strokeWidth="1" />
          <path d="M35 40 L65 40 L60 30 L40 30 Z" fill="var(--clr-primary)" fillOpacity="0.3" stroke="var(--clr-primary)" strokeWidth="1" />
          <circle cx="50" cy="61" r="10" fill="none" stroke="var(--clr-accent)" strokeWidth="0.5" />
          <path d="M47 61 L53 61 M50 58 L50 64" stroke="var(--clr-accent)" strokeWidth="1" />
        </svg>
      );
    }

    // Default Face Creams and Serums
    return (
      <svg className="product-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="35" y="30" width="30" height="55" rx="2" fill="var(--clr-primary)" fillOpacity="0.05" stroke="var(--clr-accent)" strokeWidth="1" />
        <rect x="42" y="15" width="16" height="15" fill="var(--clr-primary)" fillOpacity="0.2" stroke="var(--clr-primary)" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="85" stroke="var(--clr-accent)" strokeWidth="0.5" strokeDasharray="3 3" />
        <circle cx="50" cy="52" r="6" fill="var(--clr-accent)" fillOpacity="0.3" />
      </svg>
    );
  };

  return (
    <div className="glass-card product-card" onClick={() => onOpenDetails(product)}>
      <div className="product-visual">
        {renderProductIllustration()}
        {product.volumeOrDetails && (
          <span className="product-volume">{product.volumeOrDetails}</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-cat-tag">{product.categoryLabel}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc-short">{product.description.slice(0, 95)}...</p>
      </div>

      <div className="product-footer">
        <span className="product-price">{product.price}</span>
        <button onClick={handleBuy} className="btn btn-primary btn-add-cart">
          Buy Now
        </button>
      </div>

      {/* SVG Definitions */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="purpleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--clr-primary)" />
            <stop offset="100%" stopColor="var(--clr-accent)" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          cursor: pointer;
          border: var(--border-gold);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
        }

        .product-visual {
          position: relative;
          background: linear-gradient(180deg, rgba(7A, 26, 107, 0.02) 0%, rgba(201, 169, 110, 0.05) 100%);
          border-radius: var(--radius-md);
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
          overflow: hidden;
          border-bottom: 1px solid rgba(201, 169, 110, 0.1);
        }

        .product-svg {
          width: 90px;
          height: 90px;
          transition: var(--transition-smooth);
        }

        .product-card:hover .product-svg {
          transform: scale(1.1) translateY(-5px);
        }

        .product-volume {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 0.7rem;
          background-color: var(--clr-primary);
          color: var(--clr-white);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-weight: 500;
        }

        .product-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: var(--space-md);
        }

        .product-cat-tag {
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
          color: var(--clr-accent);
          letter-spacing: 0.05em;
        }

        .product-name {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--clr-primary);
          line-height: 1.25;
        }

        .product-desc-short {
          font-size: 0.88rem;
          line-height: 1.4;
          color: var(--clr-text-muted);
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(74, 26, 107, 0.05);
          padding-top: 12px;
          margin-top: auto;
        }

        .product-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--clr-primary);
        }

        .btn-add-cart {
          padding: 0.5rem 1.2rem;
          font-size: 0.8rem;
        }

        .btn-add-cart.added {
          background-color: #2e7d32;
          border-color: #2e7d32;
          color: white;
        }
      `}</style>
    </div>
  );
}
