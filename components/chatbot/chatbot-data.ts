import { servicesData } from "../../data/services";
import { productsData } from "../../data/products";
import { branchesData } from "../../data/branches";

export interface BotResponse {
  keywords: string[];
  reply: string;
  category?: string;
}

export const chatbotKnowledgeBase: BotResponse[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    reply: "Hello! Welcome to Bellus Aesthetics. 🌸 I am your personal beauty assistant. I can help you with: \n\n1. 💸 Treatment pricing\n2. 📍 Branch locations & hours\n3. 🧴 Skincare products\n4. 🤔 Finding the right treatment for your skin concern\n\nHow can I help you feel radiant today?"
  },
  {
    keywords: ["book", "appointment", "schedule", "reserve", "consultation", "doctor"],
    reply: "Booking an appointment at Bellus Aesthetics is simple! You can click the 'Book Now' button in the top right, visit our [Booking Page](/book), or send a message directly to our branches via Viber or WhatsApp. Which branch are you nearest to? I can provide their contact details."
  },
  {
    keywords: ["price", "cost", "how much", "rate", "membership", "package"],
    reply: "We offer premium treatments starting at ₱1,500 for our Be-Clear deep cleansing facial. We also offer curated packages like the Fresh Look Package (₱85,000) or our complete Glow-Up Face & Body Package (₱200,000) with discounts up to 30%. You can view our full pricing on the [Services Hub](/services) or let me know a specific treatment you are curious about!"
  },
  {
    keywords: ["location", "branch", "where", "address", "branches", "manila", "cavite", "alabang", "pasig", "makati"],
    reply: `We have 7 state-of-the-art clinic locations across Manila & Cavite:
    
📍 **Pasig Caniogan**: C. Raymundo Ave (${branchesData[0].phone})
📍 **Estancia Mall**: Capitol Commons (${branchesData[1].phone})
📍 **Pioneer Center**: Kapitolyo (${branchesData[2].phone})
📍 **Winford Resort**: Santa Cruz, Manila (${branchesData[3].phone})
📍 **Eton Tower**: Legaspi Village, Makati (${branchesData[4].phone})
📍 **Entrata Mall**: Alabang, Muntinlupa (${branchesData[5].phone})
📍 **Ayala Malls Vermosa**: Imus City, Cavite (${branchesData[6].phone})

Would you like more details on one of these branches?`
  },
  {
    keywords: ["acne", "pimple", "breakout", "scar", "clogged"],
    reply: "For acne-prone skin, we recommend our clinical **Be-Acne Zero Treatment (₱4,000)** or our **Be-Black Glow Carbon Laser (₱4,500+)**. For at-home maintenance, we highly recommend the **SKINLAB Acne Facial Cleanser (₱1,290)** and **Acnecure Gel (₱1,630)**. Would you like to check out our [Treatment Quiz](/quiz) to find your perfect skincare match?"
  },
  {
    keywords: ["aging", "wrinkle", "sagging", "lift", "fine line", "lines", "hifu"],
    reply: "For anti-aging, lifting, and skin tightening, our signature treatment is **BelluTherm (₱25,000 - ₱90,000)** or **Be-Lift 12D (₱11,500)**. For smoothing lines, our board-certified cosmetic surgeons perform **BellusTox (Botox) (₱25,000)** and **Dermal Fillers (₱20,000)**. Our **SKINLAB Anti-Aging Lift Cream (₱3,050)** is also excellent for daily home care."
  },
  {
    keywords: ["slimming", "fat", "weight", "contour", "freeze", "cavitation", "ems"],
    reply: "For body contouring and weight loss, we offer: \n\n❄️ **Be-FreezeFats Cryolipolysis (₱15,500)**: Non-surgical fat freezing.\n⚡ **Be-Sculpt EMS (₱8,500)**: Builds muscle and tones areas (Arms/Thighs/Buttocks at ₱3,500).\n🔊 **Be-Firm Cavitation (₱4,500)**: Melts belly and waist fats.\n📦 **Cocoon Pod (₱9,500)**: Full-body thermal sauna box.\n🧪 **Lemon Bottle Mesotherapy (₱8,000)**: Premium South Korean fat-dissolving injections."
  },
  {
    keywords: ["whitening", "brightening", "pigmentation", "glow", "dark spot", "melasma", "pico"],
    reply: "To brighten skin tone and clear pigmentation, we recommend our advanced **Be-Pico Glow Laser (₱6,500+)** or our **Be-White Glow Facial (₱4,500)**. Our **Glow Better IV Drip (₱4,500)** is also fantastic for full-body brightening from within. At home, you can use **SKINLAB Illumine Whitening Cream (₱3,250)** and **Vita-C Serum (₱1,885)**."
  },
  {
    keywords: ["drip", "iv", "glutathione", "gluta", "injectable"],
    reply: "Our Be-Glow IV Drip treatments deliver 100% vitamin absorption directly to your bloodstream:\n\n✨ **Signature Drip (₱6,000)**: Full wellness, immunity, and skin brightening.\n🌸 **Glow Better Drip (₱4,500)**: Focused skin whitening and fatigue relief.\n🔥 **Slimming Drip (₱5,000)**: Infused with L-Carnitine to boost fat burning.\n\nWe offer packages starting at ₱16,000 for 5 sessions (4 + 1 Free!)."
  },
  {
    keywords: ["skinlab", "careline", "product", "cream", "serum", "cleanser", "mask", "scrub"],
    reply: "We retail two premium homecare product lines: \n\n🧴 **SKINLAB by Bellus**: Clinical creams, specialized serums (Hyal-A, Vitamin C), cleansers, and sunscreen (SPF100).\n🍃 **Careline**: Premium exfoliating masks and scrubs infused with Gold Flakes, Collagen, Honey & Papaya, Saffron, and Sea Salt.\n\nYou can view our complete product catalog on our [Products Catalog](/products)!"
  }
];

export function generateBotResponse(userMessage: string): string {
  const normalized = userMessage.toLowerCase();

  // Try exact keyword matching
  for (const item of chatbotKnowledgeBase) {
    if (item.keywords.some(keyword => normalized.includes(keyword))) {
      return item.reply;
    }
  }

  // Check if user is asking about a specific service
  const allServices = servicesData.flatMap(cat => cat.services);
  const matchedService = allServices.find(s => normalized.includes(s.id) || normalized.includes(s.name.toLowerCase()));
  if (matchedService) {
    return `**${matchedService.name}** is available at Bellus Aesthetics for **${matchedService.price}**.\n\n_Description_: ${matchedService.description}\n\nWould you like to book this treatment or learn about packages?`;
  }

  // Check if user is asking about a specific product
  const matchedProduct = productsData.find(p => normalized.includes(p.id) || normalized.includes(p.name.toLowerCase()));
  if (matchedProduct) {
    return `**${matchedProduct.name}** is available in our catalog for **${matchedProduct.price}**.\n\n_Description_: ${matchedProduct.description}\n\nWould you like to add this to your routine?`;
  }

  // Fallback response
  return "I'm sorry, I didn't quite catch that. 🧐 Could you please specify if you're interested in a particular treatment (e.g., 'HIFU', 'Pico Laser', 'Fat Freezing'), branch locations, skincare products, or bookings? \n\nYou can also speak directly to our team via phone or Viber at any of our branches listed on the [Contact Page](/contact).";
}
