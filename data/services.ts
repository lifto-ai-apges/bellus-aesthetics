export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  benefits?: string[];
  options?: { name: string; price: string }[];
  packages?: { name: string; price: string }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: ServiceItem[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "body-treatments",
    title: "Slimming Face & Body",
    description: "State-of-the-art non-surgical body contouring, fat reduction, and muscle toning treatments to shape your ideal silhouette.",
    services: [
      {
        id: "be-firm",
        name: "Be-Firm Cavitation",
        price: "₱4,500 / area",
        priceNum: 4500,
        description: "The essential first step to body slimming. Utilizing ultrasonic cavitation, this treatment melts excess body fat, stimulates blood circulation, and targets stubborn fat in large areas like the abdomen, flanks, and waist.",
        benefits: [
          "Melts excess fat deposits",
          "Improves blood circulation",
          "Targets large areas such as tummy and waist",
          "Completely non-invasive with zero downtime"
        ]
      },
      {
        id: "be-sculpt",
        name: "Be-Sculpt EMS",
        price: "₱8,500",
        priceNum: 8500,
        description: "An advanced muscle-toning procedure that utilizes electrical muscle stimulation (EMS) impulses to contract muscles, mimicking the effects of an intense physical workout to tone and strengthen your body.",
        benefits: [
          "Tones and strengthens core muscle groups",
          "Mimics the effects of high-intensity physical exercise",
          "Helps build muscle and burn fat simultaneously",
          "Non-invasive treatment"
        ],
        options: [
          { name: "Arms Focus", price: "₱3,500" },
          { name: "Thighs Focus", price: "₱3,500" },
          { name: "Buttocks Focus", price: "₱3,500" }
        ]
      },
      {
        id: "cocoon-pod",
        name: "Cocoon Pod Sauna Box",
        price: "₱9,500",
        priceNum: 9500,
        description: "An full-body slimming and collagen rejuvenation therapy using advanced thermal technology developed in the USA. Relax in our dry heat sauna capsule to burn calories, sweat out toxins, and tighten loose skin.",
        benefits: [
          "Full-body calorie burning and slimming",
          "Promotes skin elasticity and collagen production",
          "Detoxifies the body through deep sweating",
          "Relaxes muscles and relieves body tension"
        ]
      },
      {
        id: "be-freezefats",
        name: "Be-FreezeFats Cryolipolysis",
        price: "₱15,500",
        priceNum: 15500,
        description: "A revolutionary fat reduction technique that uses controlled cooling to freeze and eliminate stubborn fat cells permanently without surgery or needles. Cryolipolysis is a premium, comfortable body shaping experience.",
        benefits: [
          "Permanently eliminates targeted fat cells",
          "Non-surgical alternative to liposuction",
          "Safe, clinically tested cooling technology",
          "Zero downtime required post-treatment"
        ]
      },
      {
        id: "be-lift",
        name: "Be-Lift 12D Tightening",
        price: "₱11,500",
        priceNum: 11500,
        description: "The ultimate non-surgical skin tightening and lifting solution that utilizes a 12-dimensional system. It targets wrinkles, sagging skin, and loss of elasticity to restore a youthful, firm appearance.",
        benefits: [
          "Non-surgical skin tightening and lifting",
          "Multi-dimensional targeting of wrinkles and fine lines",
          "Restores skin tone and structure",
          "Gradual, natural-looking improvement"
        ]
      },
      {
        id: "be-contour",
        name: "Be-Contour Exilis",
        price: "₱25,000 - ₱31,500",
        priceNum: 25000,
        description: "A premier non-invasive procedure combining monopolar radio-frequency (RF) and ultrasound energy to target fat, tighten skin, and contour the face and body for a refined silhouette with zero recovery time.",
        benefits: [
          "Combines RF and ultrasound for deep tissue penetration",
          "Smoothes out cellulite and tightens sagging skin",
          "Promotes new collagen synthesis",
          "Zero downtime and completely comfortable"
        ],
        options: [
          { name: "Cheeks & Forehead", price: "₱31,500" },
          { name: "Jaw & Neck", price: "₱31,500" },
          { name: "Body Areas", price: "₱25,000" }
        ]
      },
      {
        id: "be-tight",
        name: "Be-Tight Vaginal Tightening",
        price: "₱35,000",
        priceNum: 35000,
        description: "A clinical strengthening and tightening treatment for intimate wellness. By stimulating collagen in the vaginal walls, this treatment helps improve tone, increases sensitivity, and can help alleviate mild stress urinary incontinence.",
        benefits: [
          "Strengthens and tightens internal vaginal muscles",
          "Enhances intimate sensitivity and confidence",
          "Helps reduce mild stress urinary incontinence",
          "Quick, comfortable, and private procedure"
        ]
      }
    ]
  },
  {
    id: "facial-services",
    title: "Expert Facial Treatments",
    description: "Deeply cleansing, hydrating, and restoring facials tailored to nourish your skin and reveal a healthy, radiant complexion.",
    services: [
      {
        id: "be-clear",
        name: "Be-Clear Deep Cleansing",
        price: "₱1,500",
        priceNum: 1500,
        description: "A comprehensive medical grade facial cleansing that includes steaming, gentle exfoliation, and expert extraction to remove impurities, unclog pores, and clear excess oil and blackheads.",
        benefits: [
          "Thoroughly cleanses pores and removes blackheads",
          "Exfoliates dead skin cells for a fresh feel",
          "Controls sebum production to reduce future breakouts",
          "Leaves skin feeling clean, clear, and refreshed"
        ]
      },
      {
        id: "be-white",
        name: "Be-White Glow Facial",
        price: "₱4,500",
        priceNum: 4500,
        description: "Fast-track your way to a luminous, even-toned complexion. This facial features our custom-formulated organic mask to deeply nourish and lighten stubborn dark spots, sun damage, and hyperpigmentation.",
        benefits: [
          "Visibly brightens and evens out skin tone",
          "Fades stubborn blemishes and sun-induced dark spots",
          "Nourishes skin with clinical organic mask ingredients",
          "Gives a beautiful, healthy, radiant glow"
        ]
      },
      {
        id: "be-a-reverse",
        name: "Be-A Reverse Anti-Aging",
        price: "₱5,200",
        priceNum: 5200,
        description: "Designed to deeply nourish the skin barrier and stimulate collagen production. This premium anti-aging facial reduces the appearance of fine lines, improves skin elasticity, and leaves your face feeling smooth, firm, and rejuvenated.",
        benefits: [
          "Deeply nourishes and replenishes aging skin",
          "Stimulates natural collagen and elastin synthesis",
          "Visibly reduces fine lines and wrinkles",
          "Restores skin firmness and elasticity"
        ]
      },
      {
        id: "be-acne-zero",
        name: "Be-Acne Zero Treatment",
        price: "₱4,000",
        priceNum: 4000,
        description: "An intensive clinical facial targeting active breakouts and acne-prone skin. It deeply purifies, regulates oil production, and kills acne-causing bacteria to dry up active pimples and prevent future inflammation.",
        benefits: [
          "Deeply purifies active breakouts and inflammation",
          "Regulates sebum and oil production",
          "Targets and neutralizes acne-causing bacteria",
          "Helps heal and prevent acne scarring"
        ]
      }
    ]
  },
  {
    id: "whitening-anti-aging",
    title: "Laser Whitening & Anti-Aging",
    description: "Advanced laser therapies and high-end skin rejuvenation technologies to reverse aging, clear pigmentation, and resurface skin.",
    services: [
      {
        id: "be-pico-glow",
        name: "Be-Pico Glow Laser",
        price: "₱6,500 - ₱10,500",
        priceNum: 6500,
        description: "An advanced skin rejuvenation treatment utilizing ultra-fast picosecond laser pulses. It targets pigmentation, sun damage, freckles, and acne scars with minimal downtime and maximum precision.",
        benefits: [
          "Breaks down pigment particles with picosecond precision",
          "Reduces dark spots, melasma, and hyperpigmentation",
          "Improves overall skin texture and tone",
          "Minimal discomfort and minimal post-treatment downtime"
        ],
        options: [
          { name: "Bikini Line", price: "₱6,500" },
          { name: "Underarms", price: "₱8,500" },
          { name: "Brazilian Area", price: "₱10,500" }
        ]
      },
      {
        id: "be-black-glow",
        name: "Be-Black Glow Carbon Laser",
        price: "₱4,500 - ₱9,500",
        priceNum: 4500,
        description: "A Hollywood-favorite laser resurfacing treatment. A layer of liquid carbon is applied to the skin, absorbing dirt and oil. The laser then breaks down the carbon particles, instantly exfoliating, refining pores, and brightening the skin.",
        benefits: [
          "Exfoliates skin surface and clears pores",
          "Minimizes enlarged pores and regulates oil",
          "Instantly brightens and clarifies skin complexion",
          "Stimulates collagen production for smooth skin"
        ],
        options: [
          { name: "Underarms", price: "₱4,500" },
          { name: "Body / Face Area", price: "₱9,500" }
        ]
      },
      {
        id: "be-smooth-laser",
        name: "Be-Smooth Hair Removal Laser",
        price: "₱3,500 - ₱10,000",
        priceNum: 3500,
        description: "Permanent hair reduction using advanced laser technology. Targets hair follicles at the root to prevent regrowth, leaving your skin soft and smooth.",
        benefits: [
          "Permanent reduction of unwanted hair",
          "Prevents painful ingrown hairs and razor burns",
          "Suitable for sensitive areas",
          "Fast and comfortable sessions"
        ],
        options: [
          { name: "Bikini Line", price: "₱3,500" },
          { name: "Boyzilian / Brazilian", price: "₱10,000" }
        ]
      },
      {
        id: "be-resurface",
        name: "Be-Resurface Laser",
        price: "₱8,500 - ₱15,000",
        priceNum: 8500,
        description: "An advanced skin resurfacing treatment that creates microscopic channels in the skin to stimulate deep-layer healing. Highly effective at smoothing deep acne scars, stretch marks, surgical scars, and wrinkles.",
        benefits: [
          "Fades deep acne scars and surgical scars",
          "Reduces stretch marks and uneven skin texture",
          "Triggers rapid cell turnover and collagen production",
          "Resurfaces the skin for a smooth, even look"
        ],
        options: [
          { name: "Underarms / Small Area", price: "₱8,500" },
          { name: "Full Body / Face Area", price: "₱15,000" }
        ]
      },
      {
        id: "be-renew",
        name: "Be-Renew Microneedling",
        price: "₱15,000",
        priceNum: 15000,
        description: "A skin-needling therapy that creates micro-injuries in the epidermis. This triggers the body's natural wound-healing response, stimulating collagen and elastin synthesis for total skin rejuvenation.",
        benefits: [
          "Boosts collagen and elastin production naturally",
          "Reduces the appearance of fine lines and large pores",
          "Improves skin thickness and overall firm texture",
          "Enhances the absorption of professional skin serums"
        ]
      },
      {
        id: "bellutherm",
        name: "BelluTherm Skin Tightening",
        price: "₱25,000 - ₱90,000",
        priceNum: 25000,
        description: "A premium non-invasive skin tightening and lifting treatment using radio-frequency (RF) energy to heat the deeper layers of skin. This instantly contracts collagen fibers and stimulates new collagen growth over time.",
        benefits: [
          "Provides an instant tightening and lifting effect",
          "Lifts jawline, cheeks, and brow areas",
          "Stimulates long-term collagen growth up to 6 months",
          "No downtime, no surgery, no needles"
        ],
        options: [
          { name: "Eyelid & Under-eyes", price: "₱25,000" },
          { name: "Cheeks & Forehead", price: "₱45,000" },
          { name: "Neck & Jawline", price: "₱45,000" },
          { name: "Full Face & Neck", price: "₱90,000" }
        ]
      }
    ]
  },
  {
    id: "doctor-procedures",
    title: "Doctor Procedures & Injectables",
    description: "Advanced medical-grade procedures, injectables, and facial contouring performed exclusively by board-certified cosmetic surgeons.",
    services: [
      {
        id: "rejuran",
        name: "Rejuran Healer",
        price: "₱25,000",
        priceNum: 25000,
        description: "A scientific skin-healing injection formulated with Polynucleotides (PN) extracted from salmon DNA. It repairs skin damage, reverses aging, increases skin elasticity, and restores the skin barrier at a cellular level.",
        benefits: [
          "Repairs damaged skin cells and strengthens skin barrier",
          "Rejuvenates skin texture and reduces fine lines",
          "Restores elasticity and deep-layer hydration",
          "Promotes skin healing and pore reduction"
        ]
      },
      {
        id: "hiko-nose",
        name: "Hiko Nose Thread Lift",
        price: "₱25,000",
        priceNum: 25000,
        description: "A popular non-surgical nose enhancement using specialized, bio-compatible threads. It defines the nose bridge, lifts the tip, and refines the nose contour with immediate results and minimal downtime.",
        benefits: [
          "Immediately defines and raises the nose bridge",
          "Lifts and shapes the nasal tip",
          "Safe, bio-absorbable threads stimulate collagen",
          "Non-surgical alternative to rhinoplasty"
        ]
      },
      {
        id: "bellustox",
        name: "BellusTox (Botox)",
        price: "₱25,000",
        priceNum: 25000,
        description: "A quick, premium wrinkle-smoothing injection. Formulated to temporarily relax active facial muscles, effectively smoothing out frown lines, forehead wrinkles, and crow's feet while maintaining natural facial expressions.",
        benefits: [
          "Visibly reduces fine lines and deep wrinkles",
          "Softens expression lines (forehead, eyes, frown)",
          "Quick 10-15 minute procedure",
          "Prevents the formation of new expression lines"
        ]
      },
      {
        id: "be-boost",
        name: "Be-Boost Skin Booster",
        price: "₱25,000",
        priceNum: 25000,
        description: "An injectable micro-hydration treatment designed to deliver pure hyaluronic acid deep into the dermis. It provides intense hydration from within, giving a plump, dewy, and highly hydrated 'glass skin' look.",
        benefits: [
          "Delivers deep, long-lasting moisture to the dermis",
          "Improves skin firmness, suppleness, and elasticity",
          "Provides a glowing, radiant 'glass skin' complexion",
          "Smooths out superficial fine lines"
        ]
      },
      {
        id: "be-lipo-shot",
        name: "Be-Lipo Shot",
        price: "₱10,000",
        priceNum: 10000,
        description: "A targeted mesotherapy fat-dissolving injection designed to break down and eliminate localized stubborn fat deposits in areas like the double chin, underarms, or love handles.",
        benefits: [
          "Dissolves stubborn, localized fat deposits",
          "Contours and refines specific problem areas",
          "Quick, minimally invasive outpatient procedure",
          "Ideal for double chin and small fat pocket reduction"
        ]
      },
      {
        id: "lemon-bottle",
        name: "Lemon Bottle Fat Dissolver",
        price: "₱8,000",
        priceNum: 8000,
        description: "A premium, high-concentration fat-dissolving solution from South Korea. Combining Riboflavin (Vitamin B2), Bromelain, and Lecithin, it safely breaks down fat cells and accelerates their metabolism out of the body with minimal swelling.",
        benefits: [
          "Accelerates fat cell destruction and metabolism",
          "Formulated with safe, natural extracts (Riboflavin, Bromelain)",
          "Significantly less swelling and pain compared to other injectables",
          "Fast-acting results for double chin, arms, or belly"
        ]
      },
      {
        id: "fillers",
        name: "Dermal Fillers",
        price: "₱20,000",
        priceNum: 20000,
        description: "A premium injectable hyaluronic acid gel treatment that restores lost volume, smooths deep creases, and sculpts facial features such as lips, cheeks, chin, and jawline for a balanced, youthful look.",
        benefits: [
          "Instantly restores volume to sunken facial areas",
          "Enhances and defines lips, cheeks, and jawlines",
          "Smooths deep nasolabial folds and marionette lines",
          "Provides natural-looking, immediate contouring"
        ]
      },
      {
        id: "weight-loss",
        name: "Clinical Weight Loss Procedure",
        price: "₱50,000",
        priceNum: 50000,
        description: "A comprehensive 2-month medical weight management program supervised by our doctors. Designed to safely suppress appetite, boost metabolic rate, and support sustainable fat reduction combined with clinical treatments.",
        benefits: [
          "Supervised 2-month medical weight loss program",
          "Suppresses appetite and helps control food cravings",
          "Boosts metabolism and increases daily calorie burn",
          "Combines dietary guidance and physician oversight"
        ]
      }
    ]
  },
  {
    id: "iv-drip-therapy",
    title: "IV Drip & Wellness Therapy",
    description: "Direct intravenous nutrient infusions designed to replenish hydration, boost immunity, speed up weight loss, and brighten skin from within.",
    services: [
      {
        id: "signature-drip",
        name: "Bellus Signature Drip",
        price: "₱6,000",
        priceNum: 6000,
        description: "Our complete wellness cocktail containing high-dose Glutathione, Vitamin C, Collagen, and essential multivitamins. It energizes the body, strengthens the immune system, and promotes whole-body cellular detoxification.",
        benefits: [
          "Provides instant body rehydration and energy boost",
          "Detoxifies cells and supports liver function",
          "Strengthens immune defense against diseases",
          "Enhances skin brightness and texture from within"
        ],
        packages: [
          { name: "5 Sessions (4 + 1 free)", price: "₱24,000" },
          { name: "8 Sessions (6 + 2 free)", price: "₱36,000" },
          { name: "12 Sessions (10 + 2 free)", price: "₱60,000" }
        ]
      },
      {
        id: "glow-better-drip",
        name: "Glow Better Drip",
        price: "₱4,500",
        priceNum: 4500,
        description: "A concentrated whitening and brightening IV drip containing advanced antioxidants and vitamin C. Specifically formulated to inhibit melanin production, clear hyperpigmentation, and revitalize dull, fatigued skin.",
        benefits: [
          "Brightens skin tone and provides a radiant complexion",
          "Reduces hyperpigmentation, melasma, and age spots",
          "Combats skin dullness, fatigue, and environmental damage",
          "Boosts natural collagen synthesis"
        ],
        packages: [
          { name: "5 Sessions (4 + 1 free)", price: "₱16,000" },
          { name: "8 Sessions (6 + 2 free)", price: "₱24,000" },
          { name: "12 Sessions (10 + 2 free)", price: "₱40,000" }
        ]
      },
      {
        id: "slimming-drip",
        name: "Slimming Drip",
        price: "₱5,000",
        priceNum: 5000,
        description: "A metabolic-boosting nutrient drip infused with L-Carnitine, B-vitamins, and fat-burning amino acids. Formulated to help break down fats, accelerate weight loss, and convert stored fats into clean cellular energy.",
        benefits: [
          "Accelerates cellular fat burning and weight loss",
          "Boosts natural metabolic rate and energy levels",
          "Reduces post-workout recovery time and muscle soreness",
          "Helps convert dietary fats into usable energy"
        ],
        packages: [
          { name: "5 Sessions (4 + 1 free)", price: "₱20,000" },
          { name: "8 Sessions (6 + 2 free)", price: "₱30,000" },
          { name: "12 Sessions (10 + 2 free)", price: "₱50,000" }
        ]
      }
    ]
  },
  {
    id: "treatment-packages",
    title: "Premium Makeover Packages",
    description: "Curated treatment combinations and memberships designed for complete aesthetic transformations, skin clearing, and body slimming.",
    services: [
      {
        id: "fresh-look",
        name: "Fresh Look Package",
        price: "₱85,000",
        priceNum: 85000,
        description: "A comprehensive facial rejuvenation package featuring 12 targeted treatments. Includes Deep Cleansing Facials, Collagen Facials, Anti-Pigmentation LED Masks, Pico Laser, and Carbon Laser. Plus, enjoy a 10% discount on all SKINLAB products.",
        benefits: [
          "12 premium facial treatments for complete clearing and glow",
          "Includes Pico Laser, Carbon Laser, and deep cleansing",
          "Includes 10% discount on all retail skincare products",
          "Valid for 1 year from the date of purchase"
        ]
      },
      {
        id: "glow-up-package",
        name: "Glow-Up Face & Body Package",
        price: "₱200,000",
        priceNum: 200000,
        description: "A total face and body transformation program for 1 person. Features 26 expert facials (including Pico Laser, 12D HIFU, Thermage, Deep Cleansing, and Collagen LED treatments) combined with premium body treatments: 10 RF/Cavitations, 10 EMS muscle sculpting sessions, and 10 Cryolipolysis fat freezing sessions. Enjoy 20% off all products.",
        benefits: [
          "26 facial treatments + 30 body slimming treatments",
          "Features advanced technologies: 12D HIFU, Cryolipolysis, EMS",
          "Includes 20% discount on all SKINLAB products",
          "Valid for 1 person for 1 year from purchase"
        ]
      },
      {
        id: "total-makeover",
        name: "Total Makeover Package (2 Persons)",
        price: "₱350,000",
        priceNum: 350000,
        description: "Our ultimate shared aesthetic package. Designed for 2 persons, it includes 26 premium facial treatments (Pico Laser, 12D HIFU, Microneedling, Exilis, Deep Cleansing) and complete body contouring (8 Slimming RF/Cavitations, 8 Cryolipolysis fat freezing, 8 EMS muscle toners). Includes a 30% discount on all retail products.",
        benefits: [
          "Shares all facial and body slimming treatments between 2 persons",
          "Includes 30% discount on all retail skincare products",
          "Features clinical body contouring and laser resurfacing",
          "Valid for 2 persons for 2 years from purchase"
        ]
      },
      {
        id: "platinum-membership",
        name: "Platinum Membership (3 Persons)",
        price: "₱500,000",
        priceNum: 500000,
        description: "The most prestigious shared clinic membership. Valid for 3 persons for 2 years. Includes unlimited access to our signature treatments: Deep Cleansing Facials, Diode Underarm Hair Removal, Carbon Laser, 12D HIFU, Collagen Facials, Pico Laser, 20 Slimming RF/Cavi sessions, 12 EMS sessions, and 8 Cryolipolysis treatments.",
        benefits: [
          "Premium membership shared between 3 people",
          "Includes 20 Slimming RF/Cavi, 12 EMS, 8 Cryo sessions",
          "Includes unlimited access to cleansing, laser, and HIFU treatments",
          "Valid for 3 persons for 2 years from purchase"
        ]
      }
    ]
  }
];
