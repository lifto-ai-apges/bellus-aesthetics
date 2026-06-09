import { servicesData, ServiceItem } from "./services";
import { productsData, ProductItem } from "./products";

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    icon?: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "concern",
    text: "What is your primary beauty concern?",
    options: [
      { value: "aging", label: "Aging, Wrinkles & Sagging Skin", icon: "sparkles" },
      { value: "acne", label: "Acne, Breakouts & Scars", icon: "activity" },
      { value: "pigmentation", label: "Skin Tone, Melasma & Pigmentation", icon: "sun" },
      { value: "body", label: "Stubborn Fat & Body Contouring", icon: "user" },
      { value: "intimate", label: "Intimate Tightening & Wellness", icon: "heart" },
      { value: "wellness", label: "General De-aging, Energy & Hydration", icon: "droplet" }
    ]
  },
  {
    id: "area",
    text: "Which area would you like to focus on?",
    options: [
      { value: "face", label: "Face & Neck", icon: "eye" },
      { value: "body", label: "Body & Silhouette", icon: "user" },
      { value: "both", label: "Full Body Rejuvenation", icon: "activity" },
      { value: "intimate", label: "Intimate Areas", icon: "heart" }
    ]
  },
  {
    id: "age",
    text: "What is your age range?",
    options: [
      { value: "18-25", label: "18 - 25 years" },
      { value: "26-35", label: "26 - 35 years" },
      { value: "36-45", label: "36 - 45 years" },
      { value: "46-55", label: "46 - 55 years" },
      { value: "55+", label: "55 years and above" }
    ]
  },
  {
    id: "experience",
    text: "Have you had professional aesthetic treatments before?",
    options: [
      { value: "first", label: "No, this is my first time exploring clinical treatments" },
      { value: "some", label: "Yes, I have had a few facials or laser treatments" },
      { value: "regular", label: "Yes, I regularly undergo lasers, contouring, or injectables" }
    ]
  },
  {
    id: "approach",
    text: "What is your preferred treatment approach?",
    options: [
      { value: "non-invasive", label: "Completely Non-Invasive (Lasers, Facials, Cavitation)", icon: "shield" },
      { value: "minimally-invasive", label: "Open to Minimally Invasive (Injections, Microneedling)", icon: "syringe" },
      { value: "flexible", label: "Open to whatever doctor-certified treatment yields best results", icon: "activity" }
    ]
  },
  {
    id: "budget",
    text: "What is your budget range per treatment session?",
    options: [
      { value: "budget-low", label: "₱1,500 - ₱5,000" },
      { value: "budget-mid", label: "₱5,000 - ₱15,000" },
      { value: "budget-high", label: "₱15,000 - ₱35,000" },
      { value: "budget-elite", label: "₱35,000+" }
    ]
  }
];

export interface QuizResults {
  recommendedServices: ServiceItem[];
  recommendedProducts: ProductItem[];
  skinSummary: string;
}

export function getQuizResults(answers: Record<string, string>): QuizResults {
  const concern = answers.concern || "aging";
  const area = answers.area || "face";
  const approach = answers.approach || "non-invasive";
  
  let recommendedServices: ServiceItem[] = [];
  let recommendedProducts: ProductItem[] = [];
  let skinSummary = "";

  // Flatten services list
  const allServices = servicesData.flatMap(cat => cat.services);

  // Recommendations logic based on Concern
  if (concern === "aging") {
    skinSummary = "Your focus is on anti-aging, lifting, and reducing lines. We recommend targeting sagging skin and volume loss using non-surgical tightening technologies like BelluTherm or doctor-led injectables to stimulate collagen synthesis.";
    
    // Services
    if (approach === "non-invasive") {
      recommendedServices = allServices.filter(s => ["bellutherm", "be-lift", "be-a-reverse"].includes(s.id));
    } else {
      recommendedServices = allServices.filter(s => ["bellustox", "rejuran", "bellutherm", "fillers"].includes(s.id));
    }
    
    // Products
    recommendedProducts = productsData.filter(p => ["daycare", "night-guard", "anti-aging-cream", "face-lifting-serum", "wrinkle-repair-serum"].includes(p.id));
  } 
  else if (concern === "acne") {
    skinSummary = "You are focused on controlling active acne breakouts, regulating oil production, and clearing post-acne scarring. A combination of deep pore purification and skin resurfacing lasers is ideal.";
    
    // Services
    recommendedServices = allServices.filter(s => ["be-acne-zero", "be-black-glow", "be-resurface", "be-clear"].includes(s.id));
    
    // Products
    recommendedProducts = productsData.filter(p => ["acne-cleanser", "acnecure-gel", "scar-cream", "hyal-a-serum"].includes(p.id));
  } 
  else if (concern === "pigmentation") {
    skinSummary = "Your primary concern is hyperpigmentation, uneven skin tone, or sun damage. Picosecond laser pulses combined with specialized whitening facials will safely break down melanin and brighten your complexion.";
    
    // Services
    recommendedServices = allServices.filter(s => ["be-pico-glow", "be-white", "be-black-glow"].includes(s.id));
    
    // Products
    recommendedProducts = productsData.filter(p => ["illumine-whitening", "illumine-sensitive", "vit-c-serum", "sunscreen-spf100"].includes(p.id));
  } 
  else if (concern === "body") {
    skinSummary = "Your goal is body slimming, fat reduction, and muscle definition. Cryolipolysis (fat freezing) will permanently reduce stubborn fat cells, while cavitation melts fat and EMS sculpts core muscle groups.";
    
    // Services
    recommendedServices = allServices.filter(s => ["be-freezefats", "be-sculpt", "be-firm", "cocoon-pod"].includes(s.id));
    
    // Products
    recommendedProducts = productsData.filter(p => ["lemon-sugar-scrub", "sea-salt-scrub", "jupiter-device"].includes(p.id));
  } 
  else if (concern === "intimate") {
    skinSummary = "You are seeking intimate rejuvenation. Our Be-Tight vaginal tightening treatment utilizes advanced clinical technology to safely stimulate collagen in internal muscles, improving tone, pleasure, and resolving mild incontinence.";
    
    // Services
    recommendedServices = allServices.filter(s => ["be-tight"].includes(s.id));
    
    // Products
    recommendedProducts = productsData.filter(p => ["gold-mask", "collagen-mask"].includes(p.id));
  } 
  else { // wellness / hydration
    skinSummary = "Your focus is on cellular detoxification, hydration, and overall de-aging from within. IV drip therapy delivers maximum concentrations of vitamins and Glutathione directly to your bloodstream for immediate energy and glow.";
    
    // Services
    recommendedServices = allServices.filter(s => ["signature-drip", "glow-better-drip", "be-boost"].includes(s.id));
    
    // Products
    recommendedProducts = productsData.filter(p => ["hyal-a-serum", "vit-c-serum", "facial-cleanser"].includes(p.id));
  }

  // Fallback / clean list
  if (recommendedServices.length === 0) {
    recommendedServices = allServices.slice(0, 3);
  }
  if (recommendedProducts.length === 0) {
    recommendedProducts = productsData.slice(0, 3);
  }

  return {
    recommendedServices: recommendedServices.slice(0, 3),
    recommendedProducts: recommendedProducts.slice(0, 3),
    skinSummary
  };
}
