"use client";

import { useState } from "react";
import Link from "next/link";
import { quizQuestions, getQuizResults, QuizResults } from "../../data/quiz-logic";
import ServiceCard from "../../components/ui/ServiceCard";
import ProductCard from "../../components/ui/ProductCard";

export default function TreatmentQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadFormOpen, setLeadFormOpen] = useState<boolean>(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [results, setResults] = useState<QuizResults | null>(null);

  const handleSelectOption = (questionId: string, optionValue: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionValue }));
    
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step answered: open lead capture form
      setLeadFormOpen(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateAndShowResults();
  };

  const handleSkipLead = () => {
    calculateAndShowResults();
  };

  const calculateAndShowResults = () => {
    const finalResults = getQuizResults(answers);
    setResults(finalResults);
    setLeadFormOpen(false);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setLeadFormOpen(false);
    setResults(null);
  };

  const currentQuestion = quizQuestions[currentStep];
  const progressPercent = ((currentStep) / quizQuestions.length) * 100;

  return (
    <div className="quiz-page">
      {/* Header spacing */}
      <div className="quiz-spacer" style={{ height: 110 }}></div>

      <div className="container quiz-container">
        {!leadFormOpen && !results && (
          /* Quiz Flow UI */
          <div className="glass-card quiz-card">
            {/* Progress Bar */}
            <div className="quiz-progress-track">
              <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
            
            <div className="quiz-meta-step">
              Step {currentStep + 1} of {quizQuestions.length}
            </div>

            <h2 className="quiz-question-text">{currentQuestion.text}</h2>

            <div className="options-list-grid">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                  className={`quiz-option-btn ${answers[currentQuestion.id] === opt.value ? "selected" : ""}`}
                >
                  <span className="option-label">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="quiz-flow-actions">
              {currentStep > 0 && (
                <button onClick={handlePrevStep} className="btn btn-outline quiz-back-btn">
                  Back
                </button>
              )}
            </div>
          </div>
        )}

        {leadFormOpen && !results && (
          /* Lead Capture UI */
          <div className="glass-card quiz-card lead-card">
            <h2 className="quiz-question-text">Almost There!</h2>
            <p className="lead-subtitle-text">
              Enter your details below to unlock your custom skincare map and receive a 10% voucher for your first treatment session at Bellus Aesthetics.
            </p>

            <form onSubmit={handleLeadSubmit} className="lead-form">
              <div className="form-field">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Juan dela Cruz"
                  value={leadData.name}
                  onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="juan@email.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="input-label">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0917 XXX XXXX"
                  value={leadData.phone}
                  onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="lead-actions">
                <button type="submit" className="btn btn-primary lead-submit-btn">
                  Reveal My Results
                </button>
                <button type="button" onClick={handleSkipLead} className="skip-link-btn">
                  Or Skip to Results
                </button>
              </div>
            </form>
          </div>
        )}

        {results && (
          /* Results Summary UI */
          <div className="results-wrapper">
            <div className="glass-card result-summary-card">
              <span className="result-eyebrow">Your Custom Result</span>
              <h2 className="result-title-text">Your Treatment Blueprint</h2>
              <div className="gold-divider" style={{ margin: "12px 0 var(--space-md)" }}></div>
              <p className="summary-desc">{results.skinSummary}</p>
              
              {leadData.name && (
                <div className="voucher-banner">
                  <span className="voucher-title">🎁 Voucher Code Unlocked: WELCOME10</span>
                  <p className="voucher-details">Show this to any branch receptionist for a 10% discount on your first clinical treatment.</p>
                </div>
              )}
            </div>

            {/* Recommended Services */}
            <div className="results-section">
              <h3 className="section-heading-text">Recommended Clinical Services</h3>
              <div className="results-grid">
                {results.recommendedServices.map((service) => (
                  <div key={service.id} className="grid-item">
                    <ServiceCard service={service} categorySlug="body-treatments" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div className="results-section">
              <h3 className="section-heading-text">Recommended Skincare Regimen</h3>
              <div className="results-grid">
                {results.recommendedProducts.map((product) => (
                  <div key={product.id} className="grid-item">
                    <ProductCard product={product} onOpenDetails={() => {}} />
                  </div>
                ))}
              </div>
            </div>

            <div className="quiz-restart-wrapper">
              <button onClick={handleReset} className="btn btn-outline restart-btn">
                Restart Skincare Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .quiz-page {
          background-color: var(--clr-bg);
          min-height: 100vh;
          padding-bottom: var(--space-xxl);
        }

        .quiz-container {
          max-width: 800px;
        }

        .quiz-card {
          padding: var(--space-xl) var(--space-lg);
          border: var(--border-gold);
          background-color: var(--clr-white);
        }

        .quiz-meta-step {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--clr-accent);
          margin-bottom: var(--space-xs);
        }

        .quiz-question-text {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          color: var(--clr-primary);
          margin-bottom: var(--space-lg);
          line-height: 1.25;
        }

        .options-list-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: var(--space-lg);
        }

        .quiz-option-btn {
          background: var(--clr-bg-alt);
          border: 1px solid rgba(74, 26, 107, 0.05);
          border-radius: var(--radius-md);
          padding: 16px 24px;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 1rem;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .quiz-option-btn:hover {
          background-color: rgba(74, 26, 107, 0.03);
          border-color: var(--clr-primary);
          color: var(--clr-primary);
        }

        .quiz-option-btn.selected {
          background-color: var(--clr-primary);
          color: var(--clr-white);
          border-color: var(--clr-primary);
        }

        .quiz-flow-actions {
          display: flex;
          justify-content: space-between;
        }

        .quiz-back-btn {
          padding: 0.6rem 1.6rem;
          font-size: 0.85rem;
        }

        /* Lead Capture Form */
        .lead-card {
          max-width: 600px;
          margin: 0 auto;
        }

        .lead-subtitle-text {
          font-size: 0.95rem;
          color: var(--clr-text-muted);
          line-height: 1.5;
          margin-bottom: var(--space-md);
        }

        .lead-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-label {
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-primary);
        }

        .form-input {
          border: 1px solid rgba(74, 26, 107, 0.15);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          outline: none;
          transition: var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--clr-primary);
          box-shadow: 0 0 0 2px rgba(74, 26, 107, 0.1);
        }

        .lead-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
          align-items: center;
        }

        .lead-submit-btn {
          width: 100%;
          padding: 0.85rem 0;
        }

        .skip-link-btn {
          background: transparent;
          border: none;
          color: var(--clr-text-muted);
          font-size: 0.85rem;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 500;
        }

        .skip-link-btn:hover {
          color: var(--clr-primary);
        }

        /* Results Display */
        .results-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .result-summary-card {
          background: linear-gradient(135deg, rgba(74, 26, 107, 0.05) 0%, rgba(201, 169, 110, 0.08) 100%);
          border: var(--border-gold);
          padding: var(--space-lg);
        }

        .result-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--clr-accent);
          display: block;
        }

        .result-title-text {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--clr-primary);
          line-height: 1.2;
        }

        .summary-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--clr-text);
        }

        .voucher-banner {
          background-color: var(--clr-white);
          border: 1px dashed var(--clr-accent);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          margin-top: 16px;
        }

        .voucher-title {
          font-weight: bold;
          font-size: 0.95rem;
          color: #2e7d32;
        }

        .voucher-details {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          margin-top: 2px;
        }

        .results-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .section-heading-text {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--clr-primary);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }

        .quiz-restart-wrapper {
          text-align: center;
        }

        .restart-btn {
          padding: 0.8rem 2rem;
          font-size: 0.9rem;
        }

        @media (max-width: 992px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
