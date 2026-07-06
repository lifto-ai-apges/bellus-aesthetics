"use client";

import { useEffect, useState } from "react";
import { ProductItem } from "../../data/products";
import { branchesData } from "../../data/branches";
import { submitEvent } from "../../lib/leads";

interface BuyModalProps {
  product: ProductItem;
  onClose: () => void;
}

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

export default function BuyModal({ product, onClose }: BuyModalProps) {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [branch, setBranch] = useState(branchesData[0].id);
  const [payment, setPayment] = useState<"gcash" | "card" | "counter" | "bnpl">("gcash");
  const [placing, setPlacing] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const total = product.priceNum * qty;
  const bnplEligible = total >= 5000;
  const split = Math.ceil(total / 3);

  useEffect(() => {
    if (!bnplEligible && payment === "bnpl") setPayment("gcash");
  }, [bnplEligible, payment]);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    const res = await submitEvent({
      site: "aesthetics",
      type: "order",
      name: "order_place",
      contact: { name, phone },
      payload: {
        product: product.name,
        sku: product.id,
        qty,
        total,
        fulfillment,
        branch: fulfillment === "pickup" ? branch : "delivery",
        payment_method: payment,
        bnpl_split: payment === "bnpl" ? split : undefined,
      },
    });
    setOrderRef(res.id.slice(0, 8).toUpperCase());
    setPlacing(false);
  };

  return (
    <div className="buy-overlay" onClick={onClose}>
      <div className="glass-card buy-modal" onClick={(e) => e.stopPropagation()}>
        <button className="buy-close" onClick={onClose} aria-label="Close">×</button>

        {orderRef ? (
          <div className="buy-success">
            <div className="buy-success-icon">✓</div>
            <h3 className="buy-success-title">Order Placed</h3>
            <p className="buy-ref">Reference <strong>#{orderRef}</strong></p>
            <p className="buy-success-msg">
              <strong>{qty}× {product.name}</strong> — {peso(total)}
              {payment === "bnpl" && (
                <>
                  <br />3 monthly payments of <strong>{peso(split)}</strong>, 0% interest.
                </>
              )}
              <br />
              {fulfillment === "pickup"
                ? `Ready for pickup at ${branchesData.find((b) => b.id === branch)?.shortName}.`
                : "Delivery within Metro Manila, 1–2 days."}
            </p>
            <p className="buy-crm-note">✦ Order synced to Bellus CRM — you&apos;ll receive an SMS confirmation shortly.</p>
            <button className="btn btn-primary buy-done" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={placeOrder}>
            <span className="buy-eyebrow">Quick Order</span>
            <h3 className="buy-title">{product.name}</h3>

            <div className="buy-row buy-qty-row">
              <span className="buy-price">{product.price}</span>
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty(Math.min(9, qty + 1))} aria-label="Increase">+</button>
              </div>
            </div>

            <div className="buy-grid">
              <input required className="form-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <input required className="form-input" type="tel" placeholder="Mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="buy-row buy-options">
              <label className={`buy-chip ${fulfillment === "pickup" ? "on" : ""}`}>
                <input type="radio" name="ff" checked={fulfillment === "pickup"} onChange={() => setFulfillment("pickup")} />
                Pickup at clinic
              </label>
              <label className={`buy-chip ${fulfillment === "delivery" ? "on" : ""}`}>
                <input type="radio" name="ff" checked={fulfillment === "delivery"} onChange={() => setFulfillment("delivery")} />
                Deliver to me
              </label>
            </div>

            {fulfillment === "pickup" && (
              <select className="form-input buy-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                {branchesData.map((b) => (
                  <option key={b.id} value={b.id}>{b.shortName} — {b.city}</option>
                ))}
              </select>
            )}

            <div className="buy-pay">
              <span className="buy-pay-label">Payment</span>
              {[
                { id: "gcash", label: "GCash" },
                { id: "card", label: "Card" },
                { id: "counter", label: "Pay at counter" },
              ].map((p) => (
                <label key={p.id} className={`buy-chip ${payment === p.id ? "on" : ""}`}>
                  <input type="radio" name="pay" checked={payment === p.id} onChange={() => setPayment(p.id as typeof payment)} />
                  {p.label}
                </label>
              ))}
              {bnplEligible && (
                <label className={`buy-chip bnpl ${payment === "bnpl" ? "on" : ""}`}>
                  <input type="radio" name="pay" checked={payment === "bnpl"} onChange={() => setPayment("bnpl")} />
                  3× {peso(split)} / month — 0% interest
                </label>
              )}
            </div>

            <button type="submit" disabled={placing} className="btn btn-primary buy-submit">
              {placing ? "Placing order…" : `Place Order — ${peso(total)}`}
            </button>
            <p className="buy-fineprint">No payment is taken online today — this confirms your order with the clinic.</p>
          </form>
        )}

        <style jsx>{`
          .buy-overlay {
            position: fixed;
            inset: 0;
            background: rgba(26, 10, 46, 0.55);
            backdrop-filter: var(--blur-glass);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 16px;
          }
          .buy-modal {
            position: relative;
            width: 100%;
            max-width: 480px;
            max-height: 92vh;
            overflow-y: auto;
            background: var(--clr-white);
            border: var(--border-gold);
            padding: var(--space-lg);
          }
          .buy-close {
            position: absolute;
            top: 12px;
            right: 16px;
            border: none;
            background: none;
            font-size: 1.6rem;
            color: var(--clr-text-muted);
            cursor: pointer;
          }
          .buy-eyebrow {
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: var(--clr-accent);
          }
          .buy-title {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: var(--clr-primary);
            margin: 4px 0 14px;
            line-height: 1.2;
          }
          .buy-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
          .buy-qty-row { justify-content: space-between; }
          .buy-price { font-size: 1.2rem; font-weight: 600; color: var(--clr-primary); }
          .qty-stepper {
            display: flex;
            align-items: center;
            gap: 14px;
            border: 1px solid rgba(74, 26, 107, 0.15);
            border-radius: var(--radius-full);
            padding: 4px 10px;
          }
          .qty-stepper button {
            border: none;
            background: none;
            font-size: 1.1rem;
            cursor: pointer;
            color: var(--clr-primary);
            width: 22px;
          }
          .buy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
          .form-input {
            border: 1px solid rgba(74, 26, 107, 0.15);
            border-radius: var(--radius-md);
            padding: 10px 14px;
            font-size: 0.95rem;
            font-family: var(--font-sans);
            outline: none;
            width: 100%;
          }
          .buy-options { flex-wrap: wrap; }
          .buy-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid rgba(74, 26, 107, 0.15);
            border-radius: var(--radius-full);
            padding: 7px 14px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: var(--transition-fast);
          }
          .buy-chip input { display: none; }
          .buy-chip.on { background: var(--clr-primary); color: var(--clr-white); border-color: var(--clr-primary); }
          .buy-chip.bnpl { border-color: var(--clr-accent); color: #7a5c1e; font-weight: 600; }
          .buy-chip.bnpl.on { background: var(--clr-accent); color: var(--clr-dark); }
          .buy-branch { margin-bottom: 14px; }
          .buy-pay { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 18px; }
          .buy-pay-label {
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--clr-primary);
            width: 100%;
          }
          .buy-submit { width: 100%; padding: 0.85rem 0; font-size: 0.95rem; }
          .buy-fineprint { font-size: 0.72rem; color: var(--clr-text-muted); text-align: center; margin-top: 10px; }
          .buy-success { text-align: center; padding: var(--space-md) 0; }
          .buy-success-icon {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #2e7d32;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin: 0 auto 12px;
          }
          .buy-success-title { font-family: var(--font-serif); font-size: 1.5rem; color: #2e7d32; }
          .buy-ref { color: var(--clr-text-muted); font-size: 0.85rem; margin: 4px 0 10px; }
          .buy-success-msg { font-size: 0.95rem; line-height: 1.6; color: var(--clr-text); }
          .buy-crm-note {
            margin-top: 14px;
            font-size: 0.8rem;
            color: var(--clr-primary);
            background: rgba(201, 169, 110, 0.12);
            border: var(--border-gold);
            border-radius: var(--radius-md);
            padding: 8px 12px;
            display: inline-block;
          }
          .buy-done { margin-top: 16px; padding: 0.7rem 2.2rem; }
          @media (max-width: 520px) {
            .buy-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </div>
  );
}
