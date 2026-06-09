"use client";

import { useState } from "react";
import Link from "next/link";
import { branchesData } from "../../data/branches";

export default function BookingPage() {
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const activeBranch = branchesData.find(b => b.id === selectedBranch) || branchesData[0];

  return (
    <div className="booking-page">
      {/* Page Header */}
      <div className="booking-spacer" style={{ height: 110 }}></div>

      <div className="container booking-container">
        <div className="glass-card booking-card">
          <span className="booking-eyebrow">Reservations</span>
          <h1 className="booking-title">Schedule Your Treatment</h1>
          <div className="gold-divider" style={{ margin: "12px 0 var(--space-md)" }}></div>

          {submitted ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Appointment Requested</h2>
              <p className="success-msg">
                Your reservation request for <strong>{activeBranch.shortName}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been logged. A clinic receptionist will contact you via SMS or call within 2 hours to confirm your schedule.
              </p>
              <div className="success-actions">
                <Link href="/" className="btn btn-primary success-btn">
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="booking-form-layout">
              {/* Branch Selection */}
              <div className="form-section">
                <h3 className="section-subtitle">1. Select Clinic Branch</h3>
                <div className="branch-grid-select">
                  {branchesData.map((branch) => {
                    const isSelected = selectedBranch === branch.id;
                    return (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch.id)}
                        className={`branch-select-option ${isSelected ? "selected" : ""}`}
                      >
                        <span className="city-tag">{branch.city}</span>
                        <h4 className="branch-opt-name">{branch.shortName}</h4>
                        <span className="branch-opt-phone">{branch.phone}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="form-section date-time-section" style={{ marginTop: "32px" }}>
                <h3 className="section-subtitle">2. Choose Schedule</h3>
                <div className="date-time-inputs">
                  <div className="form-field date-field">
                    <label className="input-label">Appointment Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field time-field">
                    <label className="input-label">Preferred Time Slot</label>
                    <div className="time-slots-grid">
                      {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`time-slot-btn ${isSelected ? "selected" : ""}`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Final submission button */}
              <div className="booking-submit-wrapper" style={{ marginTop: "40px" }}>
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="btn btn-primary submit-booking-btn"
                >
                  Confirm Reservation Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          background-color: var(--clr-bg);
          min-height: 100vh;
          padding-bottom: var(--space-xxl);
        }

        .booking-container {
          max-width: 800px;
        }

        .booking-card {
          padding: var(--space-xl) var(--space-lg);
          border: var(--border-gold);
          background-color: var(--clr-white);
        }

        .booking-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--clr-accent);
          display: block;
        }

        .booking-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 3rem);
          color: var(--clr-primary);
          line-height: 1.1;
        }

        .section-subtitle {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--clr-primary);
          margin-bottom: 16px;
        }

        /* Branch select grid */
        .branch-grid-select {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .branch-select-option {
          background-color: var(--clr-bg-alt);
          border: 1px solid rgba(74, 26, 107, 0.05);
          border-radius: var(--radius-md);
          padding: 14px;
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .branch-select-option:hover {
          background-color: rgba(74, 26, 107, 0.03);
          border-color: var(--clr-primary);
        }

        .branch-select-option.selected {
          background-color: var(--clr-primary);
          border-color: var(--clr-primary);
          color: var(--clr-white);
        }

        .city-tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
          margin-bottom: 4px;
        }

        .branch-opt-name {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          margin-bottom: 2px;
        }

        .branch-opt-phone {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        /* Date / Time inputs */
        .date-time-inputs {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-lg);
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
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
          padding: 10px 14px;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          outline: none;
        }

        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .time-slot-btn {
          background-color: var(--clr-bg-alt);
          border: 1px solid rgba(74, 26, 107, 0.05);
          border-radius: var(--radius-sm);
          padding: 8px 0;
          font-size: 0.85rem;
          font-family: var(--font-sans);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          color: var(--clr-text);
        }

        .time-slot-btn:hover {
          border-color: var(--clr-primary);
          color: var(--clr-primary);
        }

        .time-slot-btn.selected {
          background-color: var(--clr-primary);
          border-color: var(--clr-primary);
          color: var(--clr-white);
        }

        .submit-booking-btn {
          width: 100%;
          padding: 0.9rem 0;
          font-size: 0.95rem;
        }

        .submit-booking-btn:disabled {
          background-color: var(--clr-bg-alt);
          border-color: rgba(74, 26, 107, 0.05);
          color: var(--clr-text-muted);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
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
          font-size: 1.6rem;
          color: #2e7d32;
          margin-bottom: 8px;
        }

        .success-msg {
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--clr-text-muted);
          margin-bottom: var(--space-lg);
        }

        @media (max-width: 992px) {
          .branch-grid-select {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .branch-grid-select {
            grid-template-columns: 1fr;
          }
          .date-time-inputs {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}
