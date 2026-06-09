"use client";

import { useState } from "react";
import Link from "next/link";
import { branchesData } from "../../data/branches";
import { getLocalBusinessSchema } from "../../lib/schema";

export default function ContactDirectory() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: branchesData[0].id,
    concern: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Schema Injection */}
      {branchesData.map(branch => (
        <script
          key={branch.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema(branch)) }}
        />
      ))}

      {/* Page Header */}
      <section className="section contact-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="contact-eyebrow">Connect With Us</span>
            <h1 className="contact-title">Our Branch Directory</h1>
            <p className="contact-desc">
              Visit any of our 7 clinics in Metro Manila and Cavite, or fill out the consultation form below to reach our medical aesthetics team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section contact-content-section">
        <div className="container contact-container">
          <div className="contact-grid">
            
            {/* 1. Branch Listings */}
            <div className="branch-directory-list">
              <h2 className="section-subtitle">Clinic Branches</h2>
              <div className="branches-flex">
                {branchesData.map((branch) => (
                  <div key={branch.id} className="glass-card branch-info-card">
                    <div className="card-top">
                      <span className="branch-city-tag">{branch.city}</span>
                      <h3 className="branch-card-title">{branch.shortName}</h3>
                    </div>
                    
                    <div className="branch-fields">
                      <div className="field-item">
                        <span className="field-icon">📍</span>
                        <p className="field-text">{branch.address}</p>
                      </div>
                      <div className="field-item">
                        <span className="field-icon">📞</span>
                        <a href={`tel:${branch.phone}`} className="field-text-link">{branch.phone}</a>
                      </div>
                      <div className="field-item">
                        <span className="field-icon">🕒</span>
                        <p className="field-text">{branch.hours}</p>
                      </div>
                    </div>

                    <div className="branch-actions">
                      <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline card-dir-btn">
                        Directions Map
                      </a>
                      <a href={`viber://chat?number=${branch.phone.replace(/\s+/g, '')}`} className="btn btn-primary card-viber-btn">
                        Viber Chat
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Inquiry Form */}
            <div className="inquiry-form-section">
              <div className="glass-card form-container-card">
                <h2 className="form-title">Consultation Request</h2>
                <p className="form-subtitle">
                  Fill out this form to request a clinical consultation or treatment booking. Our branch coordinator will call you back within 24 hours.
                </p>

                {submitted ? (
                  <div className="success-state">
                    <div className="success-icon">✓</div>
                    <h3 className="success-title">Request Received</h3>
                    <p className="success-msg">
                      Thank you! Your inquiry has been sent. Our branch specialist will contact you shortly to confirm your booking.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline restart-form-btn">
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="inquiry-form">
                    <div className="form-field">
                      <label className="input-label">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Maria Santos"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="maria@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label className="input-label">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="0917 XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="form-input"
                      />
                    </div>

                    <div className="form-field">
                      <label className="input-label">Preferred Branch</label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                        className="form-select"
                      >
                        {branchesData.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.shortName} ({b.city})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="input-label">Primary Skin Concern</label>
                      <select
                        value={formData.concern}
                        onChange={(e) => setFormData(prev => ({ ...prev, concern: e.target.value }))}
                        className="form-select"
                      >
                        <option value="general">General Skincare & Hydration</option>
                        <option value="acne">Acne & Acne Scars</option>
                        <option value="aging">Anti-Aging & Wrinkles</option>
                        <option value="lifting">Face Tightening & Lifting</option>
                        <option value="body">Body Slimming & Contouring</option>
                        <option value="injectables">Doctor procedures / Injectables</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="input-label">Message / Details</label>
                      <textarea
                        rows={4}
                        placeholder="Describe any skin history or specific treatments you're interested in..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      Submit Consultation Request
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-header {
          padding-top: 150px;
          padding-bottom: var(--space-xl);
          background: linear-gradient(180deg, var(--clr-dark-alt) 0%, var(--clr-dark) 100%);
          text-align: center;
        }

        .header-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .contact-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-sm);
        }

        .contact-desc {
          font-size: 1.1rem;
          color: rgba(254, 252, 249, 0.75);
          line-height: 1.5;
        }

        .contact-content-section {
          background-color: var(--clr-bg);
          padding-top: var(--space-xl);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-xl);
          margin-top: -50px;
          position: relative;
          z-index: 20;
        }

        .section-subtitle {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--clr-primary);
          margin-bottom: var(--space-md);
        }

        .branches-flex {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .branch-info-card {
          background-color: var(--clr-white);
          border: var(--border-gold);
          padding: var(--space-md);
        }

        .branch-city-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
        }

        .branch-card-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--clr-primary);
          margin-bottom: 12px;
        }

        .branch-fields {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .field-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.88rem;
        }

        .field-text {
          color: var(--clr-text-muted);
          line-height: 1.4;
        }

        .field-text-link {
          color: var(--clr-accent);
          font-weight: 500;
        }

        .field-text-link:hover {
          text-decoration: underline;
        }

        .branch-actions {
          display: flex;
          gap: 10px;
        }

        .card-dir-btn {
          flex: 1;
          padding: 0.6rem 0;
          font-size: 0.8rem;
        }

        .card-viber-btn {
          flex: 1.2;
          padding: 0.6rem 0;
          font-size: 0.8rem;
        }

        /* Inquiry Form */
        .form-container-card {
          background-color: var(--clr-white);
          border: var(--border-gold);
          padding: var(--space-lg);
          position: sticky;
          top: 110px;
        }

        .form-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--clr-primary);
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-md);
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-input, .form-select, .form-textarea {
          border: 1px solid rgba(74, 26, 107, 0.15);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 0.9rem;
          font-family: var(--font-sans);
          outline: none;
          background-color: var(--clr-white);
          transition: var(--transition-fast);
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--clr-primary);
          box-shadow: 0 0 0 2px rgba(74, 26, 107, 0.1);
        }

        .submit-btn {
          padding: 0.85rem 0;
          font-size: 0.9rem;
          margin-top: 8px;
        }

        /* Success state */
        .success-state {
          text-align: center;
          padding: var(--space-lg) 0;
        }

        .success-icon {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-color: #2e7d32;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 16px;
        }

        .success-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: #2e7d32;
          margin-bottom: 8px;
        }

        .success-msg {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-md);
        }

        .restart-form-btn {
          padding: 0.65rem 1.6rem;
          font-size: 0.85rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </div>
  );
}
