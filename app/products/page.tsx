"use client";

import { useState } from "react";
import Link from "next/link";
import { productsData, ProductItem } from "../../data/products";
import ProductCard from "../../components/ui/ProductCard";
import BuyModal from "../../components/ui/BuyModal";
import { getProductSchema } from "../../lib/schema";

export default function ProductsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeDetailsProduct, setActiveDetailsProduct] = useState<ProductItem | null>(null);
  const [buyProduct, setBuyProduct] = useState<ProductItem | null>(null);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "face-creams", label: "SKINLAB Face Creams" },
    { value: "serums-cleansers", label: "SKINLAB Serums & Cleansers" },
    { value: "masks-scrubs", label: "Careline Masks & Scrubs" },
    { value: "beauty-machines", label: "Clinical Home Devices" },
  ];

  const filteredProducts = selectedCategory === "all"
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className="products-catalog-page">
      {/* Schema Injection */}
      {productsData.map(product => (
        <script
          key={product.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductSchema(product)) }}
        />
      ))}

      {/* Page Header */}
      <section className="section catalog-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="catalog-eyebrow">Bellus Skincare</span>
            <h1 className="catalog-title">Clinical Retail & Devices</h1>
            <p className="catalog-desc">
              Extend your clinic results at home. Explore our premium SKINLAB creams and serums, Careline masks and organic scrubs, and clinical Near-Infrared & Cryo home-care devices.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Grid Section */}
      <section className="section catalog-content-section">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-filters-tabs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`filter-tab-btn ${selectedCategory === cat.value ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="grid-item">
                <ProductCard product={product} onOpenDetails={setActiveDetailsProduct} onBuy={setBuyProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick-order modal */}
      {buyProduct && <BuyModal product={buyProduct} onClose={() => setBuyProduct(null)} />}

      {/* Product Details Drawer/Modal */}
      {activeDetailsProduct && (
        <div className="details-overlay" onClick={() => setActiveDetailsProduct(null)}>
          <div className="details-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActiveDetailsProduct(null)}>
              &times;
            </button>
            
            <div className="modal-layout-grid">
              {/* Product Visual illustration */}
              <div className="modal-visual-box">
                <svg className="modal-product-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="35" y="25" width="30" height="60" rx="3" fill="var(--clr-primary)" fillOpacity="0.05" stroke="var(--clr-accent)" strokeWidth="1" />
                  <rect x="42" y="10" width="16" height="15" fill="var(--clr-primary)" fillOpacity="0.2" stroke="var(--clr-primary)" strokeWidth="1" />
                  <line x1="50" y1="25" x2="50" y2="85" stroke="var(--clr-accent)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="10" fill="var(--clr-accent)" fillOpacity="0.15" />
                </svg>
              </div>

              {/* Product details info */}
              <div className="modal-info-box">
                <span className="modal-cat-tag">{activeDetailsProduct.categoryLabel}</span>
                <h2 className="modal-product-name">{activeDetailsProduct.name}</h2>
                <span className="modal-product-price">{activeDetailsProduct.price}</span>
                
                {activeDetailsProduct.volumeOrDetails && (
                  <span className="modal-product-size">Size: {activeDetailsProduct.volumeOrDetails}</span>
                )}

                <div className="gold-accent-line" style={{ margin: "16px 0" }}></div>

                <div className="modal-section">
                  <span className="modal-sec-label">Description</span>
                  <p className="modal-desc-text">{activeDetailsProduct.description}</p>
                </div>

                {activeDetailsProduct.features && activeDetailsProduct.features.length > 0 && (
                  <div className="modal-section" style={{ marginTop: "16px" }}>
                    <span className="modal-sec-label">Key Benefits & Features</span>
                    <ul className="modal-features-list">
                      {activeDetailsProduct.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="bullet">&#10059;</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-actions" style={{ marginTop: "24px" }}>
                  <Link href={`/book?inquire_product=${activeDetailsProduct.id}`} className="btn btn-primary modal-buy-btn">
                    Inquire / Order via Branch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .catalog-header {
          padding-top: 150px;
          padding-bottom: var(--space-xl);
          background: linear-gradient(180deg, var(--clr-dark-alt) 0%, var(--clr-dark) 100%);
          text-align: center;
        }

        .header-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .catalog-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .catalog-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-sm);
        }

        .catalog-desc {
          font-size: 1.1rem;
          color: rgba(254, 252, 249, 0.75);
          line-height: 1.5;
        }

        .catalog-content-section {
          background-color: var(--clr-bg);
          padding-top: var(--space-xl);
        }

        /* Filter tabs */
        .category-filters-tabs {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: var(--space-lg);
          border-bottom: 1px solid rgba(74, 26, 107, 0.08);
        }

        .filter-tab-btn {
          background: transparent;
          border: 1px solid rgba(74, 26, 107, 0.15);
          color: var(--clr-text-muted);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
        }

        .filter-tab-btn:hover {
          border-color: var(--clr-primary);
          color: var(--clr-primary);
        }

        .filter-tab-btn.active {
          background-color: var(--clr-primary);
          color: var(--clr-white);
          border-color: var(--clr-primary);
        }

        /* Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        /* Details Modal */
        .details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(18, 5, 33, 0.6);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-md);
        }

        .details-modal {
          background-color: var(--clr-bg);
          border: var(--border-gold);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 850px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: var(--space-lg);
          animation: modalAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .close-modal-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          font-size: 2.2rem;
          cursor: pointer;
          color: var(--clr-primary);
          line-height: 1;
          z-index: 10;
        }

        .modal-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-lg);
        }

        .modal-visual-box {
          background: linear-gradient(180deg, rgba(7A, 26, 107, 0.02) 0%, rgba(201, 169, 110, 0.04) 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--border-gold);
          height: 350px;
        }

        .modal-product-svg {
          width: 150px;
          height: 150px;
        }

        .modal-info-box {
          display: flex;
          flex-direction: column;
        }

        .modal-cat-tag {
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          color: var(--clr-accent);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .modal-product-name {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          color: var(--clr-primary);
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .modal-product-price {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 500;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 4px;
        }

        .modal-product-size {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          font-weight: 500;
        }

        .modal-sec-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-primary);
          margin-bottom: 6px;
        }

        .modal-desc-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--clr-text-muted);
        }

        .modal-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .feature-item {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-buy-btn {
          width: 100%;
          padding: 0.85rem 0;
        }

        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          .modal-layout-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
          .modal-visual-box {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
