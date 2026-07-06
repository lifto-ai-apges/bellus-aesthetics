/**
 * Bellus group — shared lead/event capture client.
 * All three sites (aesthetics / international / pharma) POST the same shape
 * to the bellus-leads Worker, which stores to D1 and fans out to the CRM
 * (Pancake forwarding enabled once the client's API key is provisioned).
 *
 * Design rule: the demo NEVER breaks. If the collector is unreachable the
 * event is queued in localStorage and the caller still gets ok:true.
 */

export type BellusSite = "aesthetics" | "international" | "pharma";
export type BellusEventType = "booking" | "lead" | "order" | "event";

export interface BellusEvent {
  site: BellusSite;
  type: BellusEventType;
  /** short machine name, e.g. "booking_submit", "franchise_apply", "order_place" */
  name: string;
  contact?: { name?: string; email?: string; phone?: string };
  /** free-form details: service, branch, cart, score... */
  payload?: Record<string, unknown>;
}

const LEAD_API =
  process.env.NEXT_PUBLIC_LEAD_API || "https://bellus-leads.tony-hilden.workers.dev";

const QUEUE_KEY = "bellus_lead_queue";
const SID_KEY = "bellus_sid";

function sid(): string {
  try {
    let s = localStorage.getItem(SID_KEY);
    if (!s) {
      s = crypto.randomUUID();
      localStorage.setItem(SID_KEY, s);
    }
    return s;
  } catch {
    return "anon";
  }
}

function utm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
      const v = q.get(k);
      if (v) out[k] = v;
    }
  } catch {
    /* SSR / no window */
  }
  return out;
}

function envelope(evt: BellusEvent) {
  return {
    id: crypto.randomUUID(),
    ts: Date.now(),
    ...evt,
    context: {
      page: typeof window !== "undefined" ? window.location.pathname : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      utm: utm(),
      sid: sid(),
    },
  };
}

function queueLocally(record: unknown) {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    q.push(record);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-100)));
  } catch {
    /* storage full / private mode — drop */
  }
}

/** Submit a conversion event (booking / lead / order). Resolves fast, never throws. */
export async function submitEvent(
  evt: BellusEvent
): Promise<{ ok: true; id: string; queued?: boolean }> {
  const record = envelope(evt);
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`${LEAD_API}/api/event`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok) throw new Error(`collector ${res.status}`);
    return { ok: true, id: record.id };
  } catch {
    queueLocally(record);
    return { ok: true, id: record.id, queued: true };
  }
}

/** Fire-and-forget micro event (cta_click, call_click, whatsapp_click...). */
export function track(name: string, site: BellusSite, payload?: Record<string, unknown>) {
  const record = envelope({ site, type: "event", name, payload });
  try {
    // text/plain is CORS-safelisted -> sendBeacon needs no preflight; the worker parses the body regardless of content-type
    const blob = new Blob([JSON.stringify(record)], { type: "text/plain;charset=UTF-8" });
    if (!navigator.sendBeacon(`${LEAD_API}/api/event`, blob)) queueLocally(record);
  } catch {
    queueLocally(record);
  }
}
