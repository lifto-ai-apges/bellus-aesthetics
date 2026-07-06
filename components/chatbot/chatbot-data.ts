import { servicesData, ServiceItem, ServiceCategory } from "../../data/services";
import { productsData } from "../../data/products";
import { branchesData, BranchItem } from "../../data/branches";

/* ==========================================================================
   BELLUS ASSISTANT — data-driven response engine
   Answers are generated from data/services.ts and data/branches.ts so the
   bot never drifts out of sync with real prices, branches, and phone numbers.
   Understands English + Taglish intent keywords.
   ========================================================================== */

const BNPL_MIN = 9000;
const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

/* ---------- intent keywords (lowercase substring match) ---------- */

const PRICE_WORDS = ["price", "pricing", "cost", "how much", "magkano", "presyo", "rate", "rates", "fee"];
const BRANCH_WORDS = ["saan", "where", "branch", "branches", "location", "address", "near", "malapit", "directions", "clinic near"];
const BOOKING_WORDS = ["book", "appointment", "schedule", "sched", "pa-sched", "pasched", "reserve", "reservation", "consult"];
const BNPL_WORDS = ["installment", "installments", "hulugan", "bnpl", "0%", "gcash", "split", "3x", "3×", "pay later", "billease", "atome", "payment plan", "payment options", "monthly"];
const PROMO_WORDS = ["promo", "promos", "discount", "sale", "deal", "package", "membership"];
const GREETING_PHRASES = ["good morning", "good afternoon", "good evening", "kumusta", "kamusta"];
const GREETING_TOKENS = ["hello", "hi", "hey", "yo", "hola"];

/* ---------- Taglish + shorthand aliases → service ids ---------- */

const serviceAliases: Record<string, string[]> = {
  "be-lift": ["hifu", "12d", "12-d", "non surgical facelift", "non-surgical facelift"],
  "bellutherm": ["thermage", "rf tightening", "skin tightening", "radio frequency"],
  "be-contour": ["exilis"],
  "bellustox": ["botox", "wrinkle injection", "anti-wrinkle injection"],
  "fillers": ["filler", "dermal filler", "lip filler", "cheek filler"],
  "be-freezefats": ["fat freeze", "fat freezing", "cryo", "cryolipolysis", "coolsculpt", "freeze fats"],
  "be-firm": ["cavitation", "cavi", "ultrasonic slimming"],
  "be-sculpt": ["ems", "muscle toning", "muscle sculpting"],
  "cocoon-pod": ["sauna", "cocoon"],
  "be-pico-glow": ["pico", "pico laser", "picosecond"],
  "be-black-glow": ["carbon laser", "carbon peel", "hollywood peel"],
  "be-smooth-laser": ["hair removal", "laser hair", "diode", "brazilian", "boyzilian", "underarm laser"],
  "be-resurface": ["resurfacing", "stretch mark", "stretch marks", "acne scar", "acne scars", "fractional"],
  "be-renew": ["microneedling", "micro needling", "dermapen", "skin needling"],
  "be-clear": ["deep cleansing", "deep cleaning facial", "basic facial", "blackhead", "blackheads"],
  "be-white": ["whitening facial", "glow facial", "brightening facial"],
  "be-acne-zero": ["acne", "pimple", "pimples", "breakout", "breakouts", "tigyawat"],
  "be-a-reverse": ["anti-aging facial", "anti aging facial", "collagen facial"],
  "rejuran": ["salmon dna", "healer", "polynucleotide"],
  "hiko-nose": ["hiko", "nose lift", "nose thread", "thread lift", "nose job"],
  "be-boost": ["skin booster", "glass skin", "skinbooster"],
  "be-lipo-shot": ["lipo shot", "double chin", "mesotherapy shot"],
  "lemon-bottle": ["lemon bottle", "fat dissolver", "fat dissolving"],
  "weight-loss": ["weight loss", "lose weight", "pampapayat program"],
  "be-tight": ["vaginal", "intimate wellness"],
  "signature-drip": ["signature drip", "wellness drip", "immunity drip"],
  "glow-better-drip": ["gluta", "glutathione", "gluta drip", "whitening drip", "glow drip"],
  "slimming-drip": ["slimming drip", "l-carnitine", "fat burning drip"],
  "fresh-look": ["fresh look"],
  "glow-up-package": ["glow up", "glow-up"],
  "total-makeover": ["total makeover", "makeover package"],
  "platinum-membership": ["platinum"],
};

const categoryAliases: Record<string, string[]> = {
  "body-treatments": ["slimming", "body contouring", "contouring", "pampapayat", "body treatment"],
  "facial-services": ["facial", "facials"],
  "whitening-anti-aging": ["laser", "lasers", "whitening", "brightening", "anti-aging", "anti aging", "pampaputi"],
  "doctor-procedures": ["injectable", "injectables", "doctor procedure", "surgeon"],
  "iv-drip-therapy": ["iv drip", "iv therapy", "drip", "infusion"],
  "treatment-packages": ["packages", "memberships", "bundle"],
};

/* ---------- city keywords → branch filter ---------- */

const cityKeywords: Record<string, string[]> = {
  pasig: ["pasig", "caniogan", "estancia", "kapitolyo", "pioneer", "capitol commons", "ortigas"],
  manila: ["manila", "winford", "santa cruz", "sta cruz", "san lazaro"],
  makati: ["makati", "eton", "legaspi"],
  alabang: ["alabang", "muntinlupa", "entrata"],
  cavite: ["cavite", "imus", "vermosa", "daang hari"],
};

const branchCityMap: Record<string, string> = {
  "c-raymundo": "pasig",
  "estancia-mall": "pasig",
  "pioneer-center": "pasig",
  "winford-hotel": "manila",
  "eton-tower": "makati",
  "entrata-mall": "alabang",
  "ayala-vermosa": "cavite",
};

/* ---------- matching helpers ---------- */

/**
 * Word-boundary substring check without regex lookbehind (Safari-safe).
 * Prevents "cavi" matching "cavite" or "ems" matching "systems".
 */
function hasWord(text: string, kw: string): boolean {
  let idx = text.indexOf(kw);
  while (idx !== -1) {
    const before = idx === 0 ? "" : text[idx - 1];
    const after = idx + kw.length >= text.length ? "" : text[idx + kw.length];
    const boundaryBefore = !before || !/[a-z0-9]/.test(before);
    const boundaryAfter = !after || !/[a-z0-9]/.test(after);
    if (boundaryBefore && boundaryAfter) return true;
    idx = text.indexOf(kw, idx + 1);
  }
  return false;
}

const includesAny = (text: string, words: string[]) => words.some((w) => hasWord(text, w));

interface ServiceMatch {
  service: ServiceItem;
  category: ServiceCategory;
  /** length of matched keyword — longer = more specific */
  strength: number;
}

function matchService(text: string): ServiceMatch | null {
  let best: ServiceMatch | null = null;

  for (const category of servicesData) {
    for (const service of category.services) {
      const keywords = [service.name.toLowerCase(), service.id, ...(serviceAliases[service.id] || [])];
      for (const kw of keywords) {
        if (kw.length >= 3 && hasWord(text, kw)) {
          if (!best || kw.length > best.strength) {
            best = { service, category, strength: kw.length };
          }
        }
      }
    }
  }
  return best;
}

function matchCategory(text: string): ServiceCategory | null {
  let best: ServiceCategory | null = null;
  let bestLen = 0;

  for (const category of servicesData) {
    const keywords = [category.title.toLowerCase(), category.id.replace(/-/g, " "), ...(categoryAliases[category.id] || [])];
    for (const kw of keywords) {
      if (kw.length >= 3 && hasWord(text, kw) && kw.length > bestLen) {
        best = category;
        bestLen = kw.length;
      }
    }
  }
  return best;
}

function matchBranches(text: string): BranchItem[] {
  const cities = Object.keys(cityKeywords).filter((city) => includesAny(text, cityKeywords[city]));
  if (cities.length === 0) return branchesData;
  return branchesData.filter((b) => cities.includes(branchCityMap[b.id]));
}

/** Generic words that alone shouldn't identify a product */
const GENERIC_PRODUCT_WORDS = new Set([
  "skinlab", "careline", "bellus", "the", "and", "with", "serum", "cream",
  "mask", "scrub", "cleanser", "facial", "whitening", "moisturizer", "gel", "anti", "aging",
]);

function matchProduct(text: string) {
  let best = null;
  let bestScore = 0;

  for (const p of productsData) {
    const name = p.name.toLowerCase();
    if (hasWord(text, name) || hasWord(text, p.id)) return p;

    const tokens = name.split(/[^a-z0-9-]+/).filter((t) => t.length >= 3);
    const matched = tokens.filter((t) => hasWord(text, t));
    const distinctive = matched.filter((t) => !GENERIC_PRODUCT_WORDS.has(t));
    if (distinctive.length > 0 && matched.length > bestScore) {
      best = p;
      bestScore = matched.length;
    }
  }
  return best;
}

/* ---------- reply builders (all read from real data) ---------- */

function bnplLine(service: ServiceItem): string {
  if (service.priceNum < BNPL_MIN) return "";
  const split = Math.ceil(service.priceNum / 3);
  return `\n💳 Eligible for **3 × ${peso(split)}/month at 0% interest** (BillEase / Atome, approved at the clinic).`;
}

function serviceReply(match: ServiceMatch): string {
  const { service, category } = match;
  const firstSentence = service.description.split(". ")[0].replace(/\.$/, "") + ".";
  const options = service.options?.length
    ? `\n\nOptions: ${service.options.map((o) => `${o.name} — **${o.price}**`).join(" · ")}`
    : "";

  return (
    `**${service.name}** — **${service.price}**\n` +
    `${firstSentence}${options}${bnplLine(service)}\n\n` +
    `[Book this →](/book?service=${service.id}) or browse more [${category.title}](/services/${category.id}).`
  );
}

function categoryReply(category: ServiceCategory): string {
  const list = category.services
    .slice(0, 5)
    .map((s) => `✦ **${s.name}** — ${s.price}`)
    .join("\n");
  const more = category.services.length > 5 ? `\n…plus ${category.services.length - 5} more.` : "";

  return (
    `Our **${category.title}** menu:\n\n${list}${more}\n\n` +
    `Full details on the [${category.title} page](/services/${category.id}), or [book a slot →](/book).`
  );
}

function branchesReply(text: string): string {
  const matched = matchBranches(text);
  const isFiltered = matched.length < branchesData.length;

  const list = matched
    .map((b) => `📍 **${b.shortName}** (${b.city})\n${b.phone} · ${b.hours.split("|")[0].trim()}`)
    .join("\n\n");

  const intro = isFiltered
    ? `Here ${matched.length === 1 ? "is the branch" : "are our branches"} nearest you:`
    : "We have 7 branches across Metro Manila & Cavite:";

  return `${intro}\n\n${list}\n\nTap [Book Now](/book) to pick your branch and time slot — no calls needed.`;
}

function bnplReply(): string {
  // Real example pulled from data: cheapest BNPL-eligible flagship treatment
  const example = servicesData
    .flatMap((c) => c.services)
    .filter((s) => s.priceNum >= BNPL_MIN)
    .sort((a, b) => a.priceNum - b.priceNum)[0];
  const split = Math.ceil(example.priceNum / 3);

  return (
    `Yes — treatments **${peso(BNPL_MIN)} and up** can be split into **3 monthly payments at 0% interest** via BillEase or Atome (approved in minutes at the clinic).\n\n` +
    `Example: **${example.name}** at ${example.price} becomes **3 × ${peso(split)}/month** — no interest, no hidden fees.\n\n` +
    `We also accept GCash deposits and pay-at-clinic. [Book with your preferred payment →](/book)`
  );
}

function priceOverviewReply(): string {
  // Compute real "from" prices per category
  const lines = servicesData
    .map((c) => {
      const cheapest = Math.min(...c.services.map((s) => s.priceNum));
      return `✦ **${c.title}** — from ${peso(cheapest)}`;
    })
    .join("\n");

  return (
    `Here's our real price guide:\n\n${lines}\n\n` +
    `Treatments ${peso(BNPL_MIN)}+ can be split **3 × 0% interest**. Ask me about any specific treatment (e.g. "magkano ang HIFU?") or browse the [Services Hub](/services).`
  );
}

function bookingReply(): string {
  return (
    `Booking takes under a minute — no calls needed. 🌸\n\n` +
    `1. Pick your treatment\n2. Choose 1 of our 7 branches\n3. Select date & time\n4. Confirm — done!\n\n` +
    `[Start booking →](/book)\n\nPrefer to chat? Any branch answers on Viber — ask me "branches near me" for numbers.`
  );
}

function promoReply(): string {
  const packages = servicesData.find((c) => c.id === "treatment-packages");
  const list = packages
    ? packages.services
        .slice(0, 3)
        .map((s) => `✦ **${s.name}** — ${s.price}`)
        .join("\n")
    : "";

  return (
    `Our best-value curated packages:\n\n${list}\n\n` +
    `IV Drip packages also include free sessions (e.g. 5 sessions for the price of 4). Plus: treatments ${peso(BNPL_MIN)}+ can be paid **3 × 0%**. See [Premium Makeover Packages](/services/treatment-packages).`
  );
}

function greetingReply(): string {
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    `${timeGreeting}! Welcome to Bellus Aesthetics. 🌸 I can help you with:\n\n` +
    `💸 Real treatment prices — try "magkano ang HIFU?"\n` +
    `📍 Our 7 branches & phone numbers — "saan kayo sa Makati?"\n` +
    `💳 Installments — "3× 0% ba kayo?"\n` +
    `📅 Booking — "pa-sched ako"\n\n` +
    `What would you like to know?`
  );
}

function fallbackReply(): string {
  return (
    `I might have missed that one. 🧐 Here's what I'm great at:\n\n` +
    `💸 **Prices** — "How much is fat freezing?"\n` +
    `🧖 **Treatments** — "HIFU", "Pico laser", "Rejuran", "gluta drip"\n` +
    `📍 **Branches** — "Where are you in Pasig?"\n` +
    `💳 **Installments** — "Can I pay 3×?"\n` +
    `📅 **Booking** — [book a slot here](/book)\n\n` +
    `Or talk to a human — every branch answers on Viber, numbers on the [Contact Page](/contact).`
  );
}

/* ---------- main entry ---------- */

export function generateBotResponse(userMessage: string): string {
  const text = userMessage.toLowerCase().trim();
  const tokens = text.split(/[^a-z0-9%₱-]+/);

  const wantsPrice = includesAny(text, PRICE_WORDS);
  const wantsBranch = includesAny(text, BRANCH_WORDS);
  const wantsBooking = includesAny(text, BOOKING_WORDS);
  const wantsBnpl = includesAny(text, BNPL_WORDS);
  const wantsPromo = includesAny(text, PROMO_WORDS);
  const isGreeting =
    includesAny(text, GREETING_PHRASES) || tokens.some((t) => GREETING_TOKENS.includes(t));

  const serviceMatch = matchService(text);
  const categoryMatch = matchCategory(text);

  // 1. A concrete treatment always wins — answer with its real price + book link.
  if (serviceMatch) return serviceReply(serviceMatch);

  // 2. Whole category ("facials", "lasers", "slimming").
  if (categoryMatch) return categoryReply(categoryMatch);

  // 3. Branch / location questions — filtered by city when mentioned.
  if (wantsBranch) return branchesReply(text);

  // 4. Payment plans / GCash / installments.
  if (wantsBnpl) return bnplReply();

  // 5. Retail products (SKINLAB / Careline) — before generic price answers
  //    so "acnecure gel price" returns the product, not the price guide.
  const product = matchProduct(text);
  if (product) {
    return (
      `**${product.name}** — **${product.price}**\n${product.description.split(". ")[0]}.\n\n` +
      `Browse the full [Products Catalog](/products).`
    );
  }

  // 6. Price question without a specific treatment → real "from" prices.
  if (wantsPrice) return priceOverviewReply();

  // 7. Promos & packages.
  if (wantsPromo) return promoReply();

  // 8. Booking help.
  if (wantsBooking) return bookingReply();

  // 9. Greetings.
  if (isGreeting) return greetingReply();

  // 10. Graceful fallback.
  return fallbackReply();
}

/* ---------- safe markdown-lite → HTML for the chat widget ---------- */

export function formatBotHtml(text: string): string {
  // Escape HTML first so data/user content can never inject markup
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br />");
}
