import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services";
import ServiceCard from "../../../components/ui/ServiceCard";
import { getFAQSchema, getServiceSchema } from "../../../lib/schema";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static routes for build time
export async function generateStaticParams() {
  return servicesData.map((category) => ({
    category: category.id,
  }));
}

// Category Specific FAQs for Local/Medical SEO
const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
  "body-treatments": [
    {
      question: "Is there any downtime for Cryolipolysis (Be-FreezeFats)?",
      answer: "No, there is zero downtime. You can immediately return to your daily activities, including exercising. You might experience minor skin redness or numbness in the treated area, which completely resolves in a few hours."
    },
    {
      question: "How many EMS (Be-Sculpt) sessions do I need to see results?",
      answer: "While some patients feel muscle soreness and toning after just one session, we highly recommend a package of 6 sessions over 2 to 3 weeks for visible muscle definition and fat reduction."
    },
    {
      question: "Are these slimming treatments painful?",
      answer: "Our slimming treatments are non-invasive and designed for comfort. Cavitation feels like a warm massage with a high-pitched sound. Cryolipolysis vacuum triggers a cold, pulling sensation for the first 5 minutes, after which the area goes numb."
    }
  ],
  "facial-services": [
    {
      question: "How often should I get a deep cleansing facial (Be-Clear)?",
      answer: "We recommend booking a Be-Clear deep cleansing facial once every 3 to 4 weeks, matching your skin's natural cell renewal cycle, to prevent blackheads and keep pores refined."
    },
    {
      question: "Can I wear makeup immediately after a whitening facial?",
      answer: "We advise leaving your skin clear of makeup for at least 4 to 6 hours after your facial to allow the organic masks and nutrient serums to fully absorb into your pores."
    }
  ],
  "whitening-anti-aging": [
    {
      question: "What is the difference between Pico Glow and Carbon Laser?",
      answer: "Pico Glow uses ultra-fast picosecond laser pulses to break down pigment particles (dark spots/melasma) directly. Carbon Laser involves applying liquid carbon to absorb dirt and oil, which the laser then explodes to deeply exfoliate, shrink pores, and brighten skin."
    },
    {
      question: "Is BelluTherm (Thermage/RF) skin tightening painful?",
      answer: "You will feel a deep heating sensation accompanied by cool air. It is generally tolerable. We apply clinical-grade topical numbing cream to the face 45 minutes prior to the procedure to ensure comfort."
    }
  ],
  "doctor-procedures": [
    {
      question: "Who performs the Botox (BellusTox) injections?",
      answer: "At Bellus Aesthetics, all injectable treatments, thread lifts, and surgical consultations are performed exclusively by board-certified cosmetic and reconstructive surgeons."
    },
    {
      question: "How long does Rejuran Healer take to show results?",
      answer: "Rejuran works at a cellular level. You will begin to notice improved skin elasticity, pore refinement, and balanced hydration within 1 to 2 weeks, with optimal healing results showing after 3 consecutive sessions."
    }
  ],
  "iv-drip-therapy": [
    {
      question: "How long does a single IV drip session take?",
      answer: "A single IV infusion takes between 30 to 45 minutes. You can relax, read, or nap in our comfortable reclining leather lounge chairs during the session."
    },
    {
      question: "Are Glutathione IV drips safe?",
      answer: "Yes, our IV drips are administered by fully registered nurses and monitored under physician supervision. We use premium, certified vitamins and Glutathione to ensure maximum safety and absorption."
    }
  ]
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = servicesData.find((c) => c.id === resolvedParams.category);

  if (!category) {
    notFound();
  }

  const faqs = categoryFAQs[category.id] || [
    {
      question: "How do I choose the right treatment?",
      answer: "We offer professional doctor consultations at all our branches to assess your skin type and goals, helping you choose the most effective and safe procedure."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book easily by visiting our booking page, messaging us on Viber or WhatsApp, or calling your nearest branch directly."
    }
  ];

  // Generate FAQ schema
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="category-detail-page">
      {/* Dynamic Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {category.services.map((service) => (
        <script
          key={service.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema(service, category.title)),
          }}
        />
      ))}

      {/* Page Header */}
      <section className="section category-header section-dark">
        <div className="container">
          <div className="header-content">
            <span className="category-eyebrow">Treatments Category</span>
            <h1 className="category-title-text">{category.title}</h1>
            <p className="category-desc-text">{category.description}</p>
            <div className="header-actions">
              <Link href="/services" className="btn btn-outline-white back-btn">
                &larr; All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Cards Grid */}
      <section className="section category-content-section">
        <div className="container">
          <div className="services-grid">
            {category.services.map((service) => (
              <div key={service.id} className="grid-item">
                <ServiceCard service={service} categorySlug={category.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ Section (SEO Optimized) */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item glass-card">
                <h3 className="faq-question">Q: {faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section booking-cta-section section-dark">
        <div className="container">
          <div className="booking-cta-box">
            <h2 className="cta-title">Ready for Your Skincare Mapping?</h2>
            <p className="cta-desc">
              Schedule a personalized consultation with our board-certified surgeons and clinical specialists. We will design your custom face and body plan.
            </p>
            <Link href="/book" className="btn btn-accent cta-btn">
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

