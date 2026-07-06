"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { branchesData } from "../../data/branches";
import { servicesData, ServiceItem } from "../../data/services";
import { submitEvent } from "../../lib/leads";
import TimeGreeting from "../../components/ui/TimeGreeting";

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;
const BNPL_MIN = 9000;

export default function BookingPage() {
  const [step, setStep] = useState(1);

  // Step 1 — treatment
  const [categoryId, setCategoryId] = useState(servicesData[0].id);
  const [service, setService] = useState<ServiceItem | null>(null);

  // Step 2 — branch
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0].id);

  // Step 3 — schedule
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Step 4 — details + payment
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState<"clinic" | "gcash" | "bnpl">("clinic");
  const [notes, setNotes] = useState("");

  const [placing, setPlacing] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"];

  const activeCategory = servicesData.find((c) => c.id === categoryId) || servicesData[0];
  const activeBranch = branchesData.find((b) => b.id === selectedBranch) || branchesData[0];

  // Branches offering the selected category (fallback: all)
  const availableBranches = useMemo(() => {
    const matching = branchesData.filter((b) => b.servicesAvailable?.includes(activeCategory.title));
    return matching.length ? matching : branchesData;
  }, [activeCategory.title]);

  const price = service?.priceNum || 0;
  const bnplEligible = price >= BNPL_MIN;
  const split = Math.ceil(price / 3);

  const pickService = (s: ServiceItem) => {
    setService(s);
    if (!availableBranches.some((b) => b.id === selectedBranch)) {
      setSelectedBranch(availableBranches[0].id);
    }
    setStep(2);
  };

  const confirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setPlacing(true);
    const res = await submitEvent({
      site: "aesthetics",
      type: "booking",
      name: "booking_submit",
      contact: { name, phone, email },
      payload: {
        service: service.name,
        category: activeCategory.title,
        price: service.price,
        branch: activeBranch.shortName,
        date: selectedDate,
        time: selectedTime,
        payment_preference: payment,
        bnpl_split: payment === "bnpl" ? split : undefined,
        notes,
      },
    });
    setBookingRef(res.id.slice(0, 8).toUpperCase());
    setPlacing(false);
  };

  const steps = ["Treatment", "Branch", "Schedule", "Details"];

  return (
    <div className="booking-page">
      <div className="booking-spacer" style={{ height: 110 }}></div>

      <div className="container booking-container">
        <div className="glass-card booking-card">
          <span className="booking-eyebrow">Book Yourself — No Calls Needed</span>
          <h1 className="booking-title">Schedule Your Treatment</h1>
          <TimeGreeting />
          <div className="gold-divider" style={{ margin: "12px 0 var(--space-md)" }}></div>

          {bookingRef ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Appointment Confirmed</h2>
              <p className="booking-ref">Booking reference <strong>#{bookingRef}</strong></p>
              <p className="success-msg">
                <strong>{service?.name}</strong> ({service?.price})<br />
                {activeBranch.shortName} — {selectedDate} at {selectedTime}
                {payment === "bnpl" && (
                  <>
                    <br />
                    Payment plan: <strong>3 × {peso(split)}</strong> monthly, 0% interest.
                  </>
                )}
              </p>
              <p className="crm-note">
                ✦ Your booking is synced to the Bellus CRM — a confirmation SMS is on its way, and our
                team will only call if anything needs adjusting.
              </p>
              <div className="success-actions">
                <Link href="/" className="btn btn-primary success-btn">
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="wizard-progress">
                {steps.map((label, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={label}
                      type="button"
                      disabled={n >= step && !(n === step)}
                      onClick={() => n < step && setStep(n)}
                      className={`progress-step ${step === n ? "current" : ""} ${step > n ? "done" : ""}`}
                    >
                      <span className="step-num">{step > n ? "✓" : n}</span>
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* STEP 1 — Treatment */}
              {step === 1 && (
                <div className="form-section">
                  <h3 className="section-subtitle">Choose your treatment</h3>
                  <div className="category-tabs no-scrollbar">
                    {servicesData.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategoryId(cat.id)}
                        className={`cat-tab ${categoryId === cat.id ? "active" : ""}`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                  <div className="service-grid">
                    {activeCategory.services.map((s) => (
                      <button key={s.id} type="button" className="service-option" onClick={() => pickService(s)}>
                        <span className="service-name">{s.name}</span>
                        <span className="service-desc">{s.description.slice(0, 90)}…</span>
                        <span className="service-price">{s.price}</span>
                        {s.priceNum >= BNPL_MIN && (
                          <span className="bnpl-tag">or 3 × {peso(Math.ceil(s.priceNum / 3))} / mo</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 — Branch */}
              {step === 2 && (
                <div className="form-section">
                  <h3 className="section-subtitle">
                    Select clinic branch
                    <span className="picked-service">{service?.name}</span>
                  </h3>
                  <div className="branch-grid-select">
                    {availableBranches.map((branch) => {
                      const isSelected = selectedBranch === branch.id;
                      return (
                        <div
                          key={branch.id}
                          onClick={() => {
                            setSelectedBranch(branch.id);
                            setStep(3);
                          }}
                          className={`branch-select-option ${isSelected ? "selected" : ""}`}
                        >
                          <span className="city-tag">{branch.city}</span>
                          <h4 className="branch-opt-name">{branch.shortName}</h4>
                          <span className="branch-opt-phone">{branch.phone}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="back-link" onClick={() => setStep(1)}>← Change treatment</button>
                </div>
              )}

              {/* STEP 3 — Schedule */}
              {step === 3 && (
                <div className="form-section">
                  <h3 className="section-subtitle">
                    Choose schedule
                    <span className="picked-service">{activeBranch.shortName}</span>
                  </h3>
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
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`time-slot-btn ${selectedTime === time ? "selected" : ""}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="step-nav">
                    <button type="button" className="back-link" onClick={() => setStep(2)}>← Branch</button>
                    <button
                      type="button"
                      disabled={!selectedDate || !selectedTime}
                      className="btn btn-primary next-btn"
                      onClick={() => setStep(4)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 — Details + payment */}
              {step === 4 && (
                <form onSubmit={confirmBooking} className="form-section">
                  <h3 className="section-subtitle">Your details</h3>

                  <div className="summary-strip">
                    <span>{service?.name}</span>
                    <span>{activeBranch.shortName}</span>
                    <span>{selectedDate} · {selectedTime}</span>
                    <span className="summary-price">{service?.price}</span>
                  </div>

                  <div className="details-grid">
                    <input required className="form-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input required className="form-input" type="tel" placeholder="Mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input className="form-input details-email" type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <label className="input-label" style={{ marginTop: 18, display: "block" }}>Payment preference</label>
                  <div className="pay-options">
                    <label className={`pay-chip ${payment === "clinic" ? "on" : ""}`}>
                      <input type="radio" name="pay" checked={payment === "clinic"} onChange={() => setPayment("clinic")} />
                      Pay at clinic
                    </label>
                    <label className={`pay-chip ${payment === "gcash" ? "on" : ""}`}>
                      <input type="radio" name="pay" checked={payment === "gcash"} onChange={() => setPayment("gcash")} />
                      GCash deposit
                    </label>
                    {bnplEligible && (
                      <label className={`pay-chip bnpl ${payment === "bnpl" ? "on" : ""}`}>
                        <input type="radio" name="pay" checked={payment === "bnpl"} onChange={() => setPayment("bnpl")} />
                        3 × {peso(split)} / month — 0% interest
                      </label>
                    )}
                  </div>
                  {payment === "bnpl" && (
                    <p className="bnpl-note">
                      Installments via BillEase / Atome, approved in minutes at the clinic. Total stays {service?.price} — no interest, no hidden fees.
                    </p>
                  )}

                  <textarea
                    className="form-input notes-input"
                    placeholder="Anything we should know? (skin concerns, preferred specialist…)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />

                  <div className="step-nav">
                    <button type="button" className="back-link" onClick={() => setStep(3)}>← Schedule</button>
                    <button type="submit" disabled={placing} className="btn btn-primary submit-booking-btn">
                      {placing ? "Confirming…" : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          background-color: var(--clr-bg);
          min-height: 100vh;
          padding-bottom: var(--space-xxl);
        }
        .booking-container { max-width: 860px; }
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
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }
        .picked-service {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--clr-accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Progress */
        .wizard-progress {
          display: flex;
          gap: 6px;
          margin-bottom: var(--space-lg);
          flex-wrap: wrap;
        }
        .progress-step {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(74, 26, 107, 0.12);
          background: var(--clr-bg-alt);
          border-radius: var(--radius-full);
          padding: 7px 14px;
          font-size: 0.8rem;
          font-family: var(--font-sans);
          color: var(--clr-text-muted);
          cursor: default;
        }
        .progress-step.done { cursor: pointer; color: var(--clr-primary); border-color: rgba(74, 26, 107, 0.3); }
        .progress-step.current {
          background: var(--clr-primary);
          color: var(--clr-white);
          border-color: var(--clr-primary);
        }
        .step-num {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.35);
          color: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }

        /* Step 1 */
        .category-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 16px;
          padding-bottom: 4px;
        }
        .cat-tab {
          white-space: nowrap;
          border: 1px solid rgba(74, 26, 107, 0.15);
          background: var(--clr-bg-alt);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-size: 0.82rem;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: var(--transition-fast);
          color: var(--clr-text);
        }
        .cat-tab.active {
          background: var(--clr-primary);
          color: var(--clr-white);
          border-color: var(--clr-primary);
        }
        .service-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .service-option {
          text-align: left;
          background: var(--clr-bg-alt);
          border: 1px solid rgba(74, 26, 107, 0.06);
          border-radius: var(--radius-md);
          padding: 16px;
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-sans);
        }
        .service-option:hover {
          border-color: var(--clr-primary);
          background: rgba(74, 26, 107, 0.03);
          transform: translateY(-1px);
        }
        .service-name {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--clr-primary);
        }
        .service-desc { font-size: 0.8rem; color: var(--clr-text-muted); line-height: 1.45; }
        .service-price { font-weight: 700; color: var(--clr-text); font-size: 0.95rem; }
        .bnpl-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #7a5c1e;
          background: rgba(201, 169, 110, 0.18);
          border-radius: var(--radius-full);
          padding: 2px 10px;
          align-self: flex-start;
        }

        /* Step 2 */
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
        .branch-opt-name { font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 2px; }
        .branch-opt-phone { font-size: 0.75rem; opacity: 0.8; }

        /* Step 3 */
        .date-time-inputs {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-lg);
        }
        .form-field { display: flex; flex-direction: column; gap: 8px; }
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
          width: 100%;
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
        .time-slot-btn:hover { border-color: var(--clr-primary); color: var(--clr-primary); }
        .time-slot-btn.selected {
          background-color: var(--clr-primary);
          border-color: var(--clr-primary);
          color: var(--clr-white);
        }

        /* Step 4 */
        .summary-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 18px;
          background: rgba(201, 169, 110, 0.1);
          border: var(--border-gold);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }
        .summary-price { font-weight: 700; color: var(--clr-primary); margin-left: auto; }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .details-email { grid-column: 1 / -1; }
        .pay-options { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .pay-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(74, 26, 107, 0.15);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-fast);
          font-family: var(--font-sans);
        }
        .pay-chip input { display: none; }
        .pay-chip.on { background: var(--clr-primary); color: var(--clr-white); border-color: var(--clr-primary); }
        .pay-chip.bnpl { border-color: var(--clr-accent); color: #7a5c1e; font-weight: 600; }
        .pay-chip.bnpl.on { background: var(--clr-accent); color: var(--clr-dark); }
        .bnpl-note {
          font-size: 0.8rem;
          color: var(--clr-text-muted);
          background: rgba(201, 169, 110, 0.1);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          margin-top: 10px;
        }
        .notes-input { margin-top: 16px; resize: vertical; }

        /* Nav */
        .step-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--space-lg);
          gap: 16px;
        }
        .back-link {
          border: none;
          background: none;
          color: var(--clr-text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          font-family: var(--font-sans);
          padding: 8px 0;
          display: inline-block;
          margin-top: 12px;
        }
        .back-link:hover { color: var(--clr-primary); }
        .next-btn, .submit-booking-btn { padding: 0.8rem 2.4rem; font-size: 0.95rem; }
        .next-btn:disabled, .submit-booking-btn:disabled {
          background-color: var(--clr-bg-alt);
          border-color: rgba(74, 26, 107, 0.05);
          color: var(--clr-text-muted);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        /* Success */
        .success-state { text-align: center; padding: var(--space-lg) 0; }
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
        .success-title { font-family: var(--font-serif); font-size: 1.6rem; color: #2e7d32; margin-bottom: 4px; }
        .booking-ref { color: var(--clr-text-muted); font-size: 0.85rem; margin-bottom: 12px; }
        .success-msg { font-size: 0.98rem; line-height: 1.7; color: var(--clr-text); margin-bottom: var(--space-md); }
        .crm-note {
          display: inline-block;
          font-size: 0.82rem;
          color: var(--clr-primary);
          background: rgba(201, 169, 110, 0.12);
          border: var(--border-gold);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          margin-bottom: var(--space-lg);
          max-width: 460px;
          line-height: 1.55;
        }

        @media (max-width: 992px) {
          .branch-grid-select { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .branch-grid-select, .service-grid, .details-grid { grid-template-columns: 1fr; }
          .date-time-inputs { grid-template-columns: 1fr; gap: var(--space-md); }
        }
      `}</style>
    </div>
  );
}
