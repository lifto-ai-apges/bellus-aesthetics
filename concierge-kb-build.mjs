// concierge-kb-build.mjs — precompute the Bellus concierge KB embeddings
// using the EXACT browser runtime (Playwright + jsdelivr CDN) for vector parity.
// Run: node concierge-kb-build.mjs  → writes public/concierge/kb-data.js
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
const require = createRequire('/Users/tonymac/.claude/skills/website-builder/package.json');
const { chromium } = require('playwright');

const TF_VER = '4.2.0';
const MODEL = 'Xenova/all-MiniLM-L6-v2';

const KB = [
 { q:"What is Bellus Aesthetics?", a:"Bellus is a clinical-luxury aesthetics group with 7 branches across Manila and Cavite — board-certified specialists, premium US & FDA-cleared technologies, and personalized treatment maps built around your goals. Think medical rigor with a five-star feel.", tags:["about"] },
 { q:"What treatments do you offer?", a:"Six families: Doctor Procedures & Injectables, Expert Facial Treatments, Laser Whitening & Anti-Aging, Slimming for Face & Body, IV Drip & Wellness Therapy, and Premium Makeover Packages. Tell me your goal and I'll point you to the right one — or take the 1-minute quiz for your personal treatment map.", tags:["services"] },
 { q:"What is BelluTherm?", a:"BelluTherm is our skin-tightening treatment — non-invasive firming for face and body using premium, FDA-cleared technology. It's one of our most-requested treatments; a specialist will map whether it fits your skin goals at a consult.", tags:["treatment"] },
 { q:"What is Be-FreezeFats?", a:"Be-FreezeFats is our cryolipolysis (fat-freezing) body contouring treatment — a non-surgical approach to stubborn areas that don't respond to diet and exercise. Your specialist will assess if you're a good candidate during consultation.", tags:["treatment"] },
 { q:"What is Rejuran Healer?", a:"Rejuran Healer is a skin-rejuvenation injectable popular for improving skin texture, elasticity and overall quality. It's a doctor procedure — administered by our medical team after a proper consult.", tags:["treatment"] },
 { q:"Do you do facials?", a:"Yes — Expert Facial Treatments are a core family, from deep-cleaning and glow facials to targeted anti-aging protocols. The right facial depends on your skin; the quiz or a quick consult will match you properly.", tags:["treatment"] },
 { q:"Do you offer slimming treatments?", a:"Yes — Slimming for Face & Body is one of our six treatment families, including body contouring like Be-FreezeFats cryolipolysis. A specialist consult maps the right protocol for your target areas.", tags:["treatment"] },
 { q:"What are IV drips?", a:"Our IV Drip & Wellness Therapy delivers vitamins and hydration intravenously — popular for energy, skin glow and recovery. Administered by our medical team at the clinic.", tags:["treatment"] },
 { q:"Where are your branches?", a:"We have 7 branches across Manila and Cavite — including our Pasig Caniogan flagship, Makati, Alabang, San Lazaro (Manila) and Imus, Cavite. Pick the branch closest to you when you book.", tags:["locations"] },
 { q:"How do I book an appointment?", a:"Easiest is the online booking on this site — tap Book and the 4-step wizard walks you through treatment, branch and schedule in about a minute. You can also start with the quiz if you're not sure what to book.", tags:["booking"] },
 { q:"How much do treatments cost?", a:"Pricing depends on the treatment and your personalized plan, so we don't quote blind — your consult comes first, and you'll get clear pricing in writing before anything starts. Plans of ₱9,000 and up can be split 0% interest over 3 months.", tags:["pricing"] },
 { q:"Do you offer financing or installments?", a:"Yes — treatment plans of ₱9,000 or more can be split into 3 payments at 0% interest. It's built right into the booking flow, no separate application drama.", tags:["pricing"] },
 { q:"Is the consultation free?", a:"Booking a consult is the standard first step for doctor procedures and treatment plans — you'll leave with a personalized treatment map and honest pricing in writing. Book through the site and your branch will confirm your slot.", tags:["booking"] },
 { q:"Are your treatments safe?", a:"Treatments are performed by board-certified specialists using premium US & FDA-cleared technologies, and every plan starts with a proper assessment. If a treatment isn't right for you, we'll say so — that's the Bellus standard.", tags:["trust"] },
 { q:"What is the treatment quiz?", a:"A 1-minute quiz on this site that builds your personal treatment map — answer a few questions about your goals and skin, and it recommends where to start. Tap Quiz in the menu to try it.", tags:["quiz"] },
 { q:"Do you sell skincare products?", a:"Yes — we carry clinic-grade skincare you can browse under Products on this site, and your specialist can recommend the right routine to support your treatments.", tags:["products"] },
 { q:"Is this chat private?", a:"Yes — this concierge runs entirely in your browser, on your device. Your questions are never sent to a server. When you're ready to book, only the booking form you submit goes to the clinic.", tags:["privacy"] },
 { q:"Can I talk to a human?", a:"Of course — book through the site and your branch coordinator will reach out to confirm, or use the Contact page to message the team directly. I'm just here for the quick answers at 2 AM.", tags:["contact"] },
 { q:"What makes Bellus different from other clinics?", a:"Three things: board-certified specialists (not just technicians), premium US & FDA-cleared technologies, and personalized treatment maps instead of one-size-fits-all packages — all in a clinical-luxury setting across 7 branches.", tags:["about","trust"] },
 { q:"I'm not sure which treatment I need.", a:"Perfect place to start — take the 1-minute quiz for your personal treatment map, or book a consult and let a specialist assess you properly. No guesswork, no pressure.", tags:["quiz","booking"] },
];

const texts = KB.map(e => e.q + ' — ' + e.a);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('about:blank');
const result = await page.evaluate(async ({ texts, TF_VER, MODEL }) => {
  const { pipeline } = await import(`https://cdn.jsdelivr.net/npm/@huggingface/transformers@${TF_VER}`);
  const embed = await pipeline('feature-extraction', MODEL);
  const out = [];
  for (const t of texts) { const r = await embed(t, { pooling:'mean', normalize:true }); out.push(Array.from(r.data)); }
  return { dims: out[0].length, vecs: out };
}, { texts, TF_VER, MODEL });
await browser.close();

const flat = new Float32Array(result.vecs.length * result.dims);
result.vecs.forEach((v,i)=>flat.set(v, i*result.dims));
const b64 = Buffer.from(flat.buffer).toString('base64');
mkdirSync('public/concierge', { recursive: true });
const js = `// generated by concierge-kb-build.mjs — do not edit by hand
window.BELLUS_KB = ${JSON.stringify({ model: MODEL, tfVer: TF_VER, dims: result.dims, entries: KB }, null, 0)};
window.BELLUS_KB.vecsB64 = "${b64}";
`;
writeFileSync('public/concierge/kb-data.js', js);
console.log(`OK: ${KB.length} entries, ${result.dims} dims, ${(js.length/1024).toFixed(0)}KB → public/concierge/kb-data.js`);
