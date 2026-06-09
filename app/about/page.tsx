"use client";

import Link from "next/link";

export default function AboutUs() {
  const credentials = [
    "Board-Certified Plastic & Reconstructive Surgeon",
    "Fellow, Philippine Academy of Aesthetic Surgery",
    "Fellow, International College of Surgeons",
    "Specialist in Minimally Invasive Rejuvenation"
  ];

  return (
    <div className="about-us-page">
      {/* Page Header */}
      <section className="section about-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="about-eyebrow">Our Story</span>
            <h1 className="about-title">Beauty Meets Science</h1>
            <p className="about-desc">
              Founded in 2017, Bellus Aesthetics (from 'beauty' in Latin) is a premier cosmetic clinic dedicated to providing cutting-edge treatments under board-certified surgical oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section story-section">
        <div className="container story-container">
          <div className="story-content-grid">
            <div className="story-text-box">
              <h2 className="story-h2">The Birth of Bellus</h2>
              <p className="story-p">
                Bellus was established in 2017 by a visionary global entrepreneur with a single mission: to make premium, state-of-the-art clinical beauty and wellness treatments accessible to a wider audience in the Philippines. In Latin, <strong>Bellus</strong> signifies beauty, charm, and refinement.
              </p>
              <p className="story-p">
                Over the past 9 years, we have grown into a trusted network of 7 clinics across Metro Manila and Cavite, serving over 100,000 clients. Our expansion is driven by a dedication to clinical safety, premium FDA-approved technologies, and outstanding customer satisfaction.
              </p>
            </div>
            
            <div className="glass-card philosophy-card">
              <h3 className="philosophy-title">Our Philosophy</h3>
              <div className="philosophy-field">
                <span className="phil-label">Our Vision</span>
                <p className="phil-text">
                  To be the leading and most trusted aesthetic clinic network, where advanced science meets luxury care to create transformative and empowering experiences.
                </p>
              </div>
              <div className="philosophy-field" style={{ marginTop: "16px" }}>
                <span className="phil-label">Our Mission</span>
                <p className="phil-text">
                  To enhance lives by providing exceptional aesthetic care and empowering individuals to feel confident, beautiful, and comfortable in their own skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor/Surgeon Profile */}
      <section className="section team-section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Medical Leadership</span>
            <h2 className="section-title">Led by Board-Certified Experts</h2>
            <div className="gold-divider"></div>
            <p className="section-desc" style={{ color: "rgba(254, 252, 249, 0.7)" }}>
              Aesthetic medicine is a clinical science. All our injectable, thread, and surgical procedures are overseen directly by board-certified cosmetic surgeons.
            </p>
          </div>

          <div className="doctor-profile-card glass-card-dark">
            <div className="doctor-visual">
              <svg className="doctor-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="var(--clr-accent)" strokeWidth="0.5" fill="var(--clr-dark-alt)" />
                <path d="M50 20 C60 20 60 40 50 40 C40 40 40 20 50 20 Z" fill="var(--clr-accent)" fillOpacity="0.25" stroke="var(--clr-accent)" strokeWidth="1" />
                <path d="M25 80 C25 60 40 55 50 55 C60 55 75 60 75 80 Z" fill="var(--clr-primary)" fillOpacity="0.3" stroke="var(--clr-accent)" strokeWidth="1" />
              </svg>
            </div>
            <div className="doctor-info">
              <span className="doc-title-role">Medical Director & Surgeon</span>
              <h3 className="doc-name">Dr. Raymund Oliver Llobrera</h3>
              <p className="doc-bio">
                Dr. Llobrera is a board-certified cosmetic and reconstructive surgeon specializing in minimally invasive facial rejuvenation, advanced injectables, and surgical body contouring. He manages clinic-wide medical protocols across all 7 branches.
              </p>
              
              <div className="doc-credentials">
                <span className="cred-heading">Board Credentials:</span>
                <ul className="cred-list">
                  {credentials.map((cred, idx) => (
                    <li key={idx} className="cred-item">
                      <span className="bullet">&#10059;</span> {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section consult-booking-section">
        <div className="container">
          <div className="consult-booking-box glass-card">
            <h2 className="cta-title">Consult Dr. Llobrera</h2>
            <p className="cta-desc">
              Schedule a clinical consult at our C. Raymundo, Winford Resort, Eton Tower, or Entrata Alabang branches. Receive a professional medical assessment.
            </p>
            <Link href="/book" className="btn btn-primary cta-btn">
              Schedule Medical Consultation
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-header {
          padding-top: 150px;
          padding-bottom: var(--space-xl);
          background: linear-gradient(180deg, var(--clr-dark-alt) 0%, var(--clr-dark) 100%);
          text-align: center;
        }

        .header-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .about-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .about-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: var(--space-sm);
        }

        .about-desc {
          font-size: 1.1rem;
          color: rgba(254, 252, 249, 0.75);
          line-height: 1.5;
        }

        .story-section {
          background-color: var(--clr-bg);
          padding-top: var(--space-xl);
        }

        .story-container {
          max-width: 1000px;
        }

        .story-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-xl);
          margin-top: -50px;
          position: relative;
          z-index: 20;
        }

        .story-text-box {
          background-color: var(--clr-white);
          border: var(--border-gold);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          box-shadow: var(--shadow-sm);
        }

        .story-h2 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--clr-primary);
          margin-bottom: var(--space-sm);
        }

        .story-p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--clr-text-muted);
          margin-bottom: 12px;
        }

        .philosophy-card {
          padding: var(--space-lg);
          background-color: var(--clr-white);
        }

        .philosophy-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--clr-primary);
          margin-bottom: var(--space-md);
        }

        .phil-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
          margin-bottom: 4px;
        }

        .phil-text {
          font-size: 0.92rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
        }

        /* Doctor Profile */
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto var(--space-xl);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
        }

        .doctor-profile-card {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
          align-items: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .doctor-visual {
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          border: 1px solid rgba(201, 169, 110, 0.15);
        }

        .doctor-svg {
          width: 180px;
          height: 180px;
        }

        .doctor-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .doc-title-role {
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--clr-accent);
        }

        .doc-name {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--clr-white);
          line-height: 1.1;
        }

        .doc-bio {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(254, 252, 249, 0.75) !important;
        }

        .doc-credentials {
          margin-top: 8px;
        }

        .cred-heading {
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 6px;
        }

        .cred-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cred-item {
          font-size: 0.88rem;
          color: rgba(254, 252, 249, 0.85);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bullet {
          color: var(--clr-accent);
          font-size: 0.65rem;
        }

        /* Booking CTA */
        .consult-booking-box {
          text-align: center;
          max-width: 650px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(74, 26, 107, 0.04) 0%, rgba(201, 169, 110, 0.06) 100%);
          border: var(--border-gold);
          padding: var(--space-xl);
        }

        .cta-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          color: var(--clr-primary);
          margin-bottom: var(--space-xs);
        }

        .cta-desc {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-lg);
        }

        @media (max-width: 992px) {
          .story-content-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
          .doctor-profile-card {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </div>
  );
}
