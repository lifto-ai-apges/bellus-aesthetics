export interface ProductItem {
  id: string;
  name: string;
  category: "face-creams" | "serums-cleansers" | "masks-scrubs" | "beauty-machines";
  categoryLabel: string;
  price: string;
  priceNum: number;
  description: string;
  features?: string[];
  howToUse?: string;
  volumeOrDetails?: string;
}

export const productsData: ProductItem[] = [
  // Face Creams
  {
    id: "daycare",
    name: "SKINLAB Daycare Moisturizer",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,250",
    priceNum: 3250,
    description: "A lightweight daily moisturizing cream formulated to deeply hydrate and help improve skin elasticity while providing essential protection against environmental aggressors. Leaves the skin visibly hydrated, supple, and smooth. Formulated for normal or dry skin as an excellent moisturizing and daily protection system that helps prevent and repair wrinkles.",
    features: [
      "Enhanced with humid captivation technology for long-lasting moisturization",
      "Helps prevent and repair superficial wrinkles",
      "Protects against environmental aggressors and sun exposure",
      "Maintains and protects skin barrier health"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "night-guard",
    name: "SKINLAB Night Guard Cream",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,250",
    priceNum: 3250,
    description: "Your skin's nightly maintenance cream. It nourishes the skin during the nocturnal regeneration phase and replenishes hydration levels. Skin moisture can drop significantly as we age, causing a loss of elasticity. Formulated with Hyaluronic Acid as the ultimate drink of water for your skin, maintaining your youthful glow and reversing early signs of aging while you sleep.",
    features: [
      "Increases skin hydration for over 24 hours",
      "Nourishes skin during its natural nightly regeneration cycle",
      "Provides deep-layer hyaluronic acid delivery",
      "Restores elasticity and minimizes fine lines"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "eye-puffiness",
    name: "SKINLAB Eye Puffiness Relief Cream",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,080",
    priceNum: 3080,
    description: "Acts intensely and simultaneously on puffiness and dark circles that make eyes look tired. Formulated with a unique combination of Pepha-Tight and bio-peptides to boost microcirculation in the veins and lymph to reduce puffy lower eyelids. Forms a thin firming film on the skin for an instant tightening effect, while protecting against oxidative stress and stimulating collagen synthesis over time.",
    features: [
      "Instant tightening and lifting of the eye area",
      "Reduces lower eyelid puffiness and boosts lymphatic drainage",
      "Stimulates collagen production for long-term firming benefit",
      "Protects delicate eye area from oxidative stress"
    ],
    volumeOrDetails: "15ml"
  },
  {
    id: "anti-aging-cream",
    name: "SKINLAB Anti-Aging Lift Cream",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,050",
    priceNum: 3050,
    description: "A rich cream texture with powerful firming and lifting properties. It targets wrinkles and firms loose tissues by stimulating the contraction of collagen fibers. Its long-lasting moisturizing effect shows a visible transformation to a younger look. Enhanced with Coenzyme Q10 to protect the skin from premature aging, wrinkle formation, and loss of cell activity.",
    features: [
      "Provides a visible face lifting effect",
      "Increases natural collagen synthesis",
      "Stimulates self-hydration mechanisms in the skin",
      "Infused with Coenzyme Q10 for advanced cellular defense"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "illumine-sensitive",
    name: "SKINLAB Illumine Sensitive Whitening",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,250",
    priceNum: 3250,
    description: "The ultimate skin-lightening cream formulated specifically for sensitive skin types, ensuring skin does not dry out or get irritated. It utilizes a complex skin hydration mechanism incorporating hyaluronic acid (a natural glycosaminoglycan) to play a central role in maintaining skin moisture, cell repair, and skin elasticity while safely evening out dark spots.",
    features: [
      "Safely brightens and evens out sensitive skin",
      "Formulated with deep-hydrating hyaluronic acid",
      "Reduces fine lines, redness, and dry patches",
      "Gentle, non-irritating formula"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "illumine-whitening",
    name: "SKINLAB Illumine Whitening Cream",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,250",
    priceNum: 3250,
    description: "Formulated with unique, natural skin-lightening agents composed of natural amino acids and lipids. It inhibits skin cells from producing excess melanin pigment by blocking the MSH (melanotropin) pathway. Enhanced with Kojic Acid, bearberry extract, and mushroom-derived lightening compounds to target age spots, pregnancy marks, freckles, and general hyperpigmentation.",
    features: [
      "Triple natural lightening action (bearberry, mushroom extract, Kojic Acid)",
      "Inhibits melanin production at a cellular level",
      "Targets sun spots, pregnancy marks, and freckles",
      "Contains built-in UVA and UVB filters for sun protection"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "anti-dark-circle",
    name: "SKINLAB Anti-Dark Circle Eye Cream",
    category: "face-creams",
    categoryLabel: "SKINLAB Face Creams",
    price: "₱3,340",
    priceNum: 3340,
    description: "A highly effective alternative to invasive laser treatments. This light cream is infused with multi-peptides that dramatically reduce dark circles around the eyes. It improves skin smoothness, boosts microcirculation, and reinforces the firmness and tone of the delicate skin around the eye contour.",
    features: [
      "Dramatically reduces dark circles and fatigue shadows",
      "Improves blood microcirculation around the eyes",
      "Reinforces firmness and tones lax skin",
      "Smooths skin texture and reduces fine lines"
    ],
    volumeOrDetails: "15ml"
  },

  // Serums and Cleansers
  {
    id: "face-lifting-serum",
    name: "SKINLAB Face Lifting & Tightening Serum",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱3,720",
    priceNum: 3720,
    description: "A premium lifting serum that provides an instant, perceivable tightening experience lasting for at least 4 hours post-application. Formulated with a unique combination of purified microalgae active components and high-performing polysaccharides. It boosts microcirculation, drains excess fluid, and stimulates long-term firming with regular use.",
    features: [
      "Provides an instant lift and tightening effect lasting 4+ hours",
      "Combines purified microalgae and structured polysaccharides",
      "Drains under-eye puffiness and firms the facial contour",
      "Alternative to laser and thread skin treatments"
    ],
    volumeOrDetails: "30ml"
  },
  {
    id: "wrinkle-repair-serum",
    name: "SKINLAB Wrinkle Repair Eye Serum",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱3,720",
    priceNum: 3720,
    description: "A cooling, lightweight eye serum that is quickly absorbed to instantly level and diminish wrinkles around the eye area. It stimulates the production of collagen from within the skin, doubling the amount naturally produced. It provides deep, non-greasy moisture without creeping into or irritating the eyes.",
    features: [
      "Doubles the natural production of collagen in the skin",
      "Provides an instant cooling and soothing sensation on application",
      "Repairs fine lines, crow's feet, and deep wrinkles",
      "Advanced deep-penetration moisturizer"
    ],
    volumeOrDetails: "15ml"
  },
  {
    id: "facial-cleanser",
    name: "SKINLAB Ultra-Gentle Facial Cleanser",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱900",
    priceNum: 900,
    description: "A foaming gel face wash that removes make-up, dead skin cells, oil, dirt, and pollutants from the face. Contains only mild surfactants, barrier-boosting ceramides, and prebiotics to feed healthy skin bacteria. This ultra-gentle, non-abrasive, alcohol-free cleanser rids the skin of bacteria inside pores without stripping moisture.",
    features: [
      "Ultra-gentle, alcohol-free, and non-abrasive formula",
      "Formulated with skin barrier-boosting ceramides",
      "Contains prebiotics to support healthy skin microbiome",
      "Deeply cleanses pollutants, makeup, and excess sebum"
    ],
    volumeOrDetails: "150ml"
  },
  {
    id: "acne-cleanser",
    name: "SKINLAB Acne Facial Cleanser",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,290",
    priceNum: 1290,
    description: "A clinical, non-abrasive, and alcohol-free cleanser specifically designed for acne-prone skin. It rids the skin of bacteria that block hair follicles and cause pimples. Its thorough cleansing action removes dead surface cells, preparing the skin for active acne treatments to ensure maximum absorption without causing dehydration.",
    features: [
      "Disinfects acne-prone areas and reduces surface bacteria",
      "Alcohol-free and non-abrasive to prevent inflammation",
      "Removes dead skin cells that clog hair follicles",
      "Prepares skin for Acnecure treatment gels"
    ],
    volumeOrDetails: "150ml"
  },
  {
    id: "sunscreen-spf100",
    name: "SKINLAB Sunscreen SPF 100",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,540",
    priceNum: 1540,
    description: "Comprising the highest quality transparent UVA and UVB microfilters, this sunscreen provides a lightweight, invisible sun block protective layer. It preserves the skin against sunburn, heat stress, hyperpigmentation, and photo-aging. Its advanced microfilter technology ensures maximum durability, protection, and a weightless finish.",
    features: [
      "Maximum SPF 100 UVA and UVB sun protection",
      "Lightweight, transparent, and completely invisible finish",
      "Advanced microfilter technology for long-lasting wear",
      "Prevents sun-induced dark spots and premature aging"
    ],
    volumeOrDetails: "50ml"
  },
  {
    id: "acnecure-gel",
    name: "SKINLAB Acnecure Anti-Acne Gel",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,630",
    priceNum: 1630,
    description: "A highly effective, clinical-grade acne treatment gel that controls breakouts and shows a noticeable reduction in acne redness within two days. Unlike standard benzoyl peroxide treatments that dry out and irritate the skin, Acnecure combines potent actives with soothing natural botanical extracts to reduce sebum and heal blemishes.",
    features: [
      "Visibly reduces acne redness and swelling in 48 hours",
      "Reduces oil production in the sebaceous glands",
      "Heals blemishes and prevents post-acne dark marks",
      "Gentle formula that does not dry out or peel skin"
    ],
    volumeOrDetails: "30g"
  },
  {
    id: "scar-cream",
    name: "SKINLAB Untraceable Scar Cream",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,885",
    priceNum: 1885,
    description: "A clinically tested, non-invasive scar treatment cream designed to improve the color, texture, and overall appearance of scars from injuries, burns, surgeries, and acne. It provides deep, non-chemical hydration to the scar tissue, accelerating cell turnover to bring old, damaged tissues to the surface so they can be shed.",
    features: [
      "Improves color and texture of surgical, burn, and acne scars",
      "Speeds up skin cell turnover and tissue renewal",
      "Provides deep, protective non-chemical hydration",
      "Shows visible improvements within a 28-day skin cycle"
    ],
    volumeOrDetails: "30ml"
  },
  {
    id: "hyal-a-serum",
    name: "SKINLAB Hyal-A Serum Concentrate",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,885",
    priceNum: 1885,
    description: "An intensive anti-aging hyaluronic acid concentrate formulated with high and low molecular weight Hyaluronic Acid and Vitamin B5. High molecular weight HA locks in moisture on the surface to instantly plump skin, while low molecular weight HA penetrates deeply to hydrate skin layers. Vitamin B5 and Madecassoside help soothe the skin and support the barrier.",
    features: [
      "Dual-weight Hyaluronic Acid for surface and deep-layer hydration",
      "Formulated with Vitamin B5 to support the skin barrier",
      "Contains Madecassoside to soothe redness and irritation",
      "Locks in moisture up to 1,000 times its weight in water"
    ],
    volumeOrDetails: "30ml"
  },
  {
    id: "vit-c-serum",
    name: "SKINLAB Vita-C Brightening Serum",
    category: "serums-cleansers",
    categoryLabel: "SKINLAB Serums & Specialty Care",
    price: "₱1,885",
    priceNum: 1885,
    description: "A powerhouse antioxidant and skin brightener. Since standard Vitamin C degrades easily, SKINLAB's stabilized serum keeps its potency. It is enriched with Vitamins B and E, along with botanical antioxidants, to fight wrinkles, sagging, lost firmness, and free radical damage, leaving you with a radiant, youthful complexion.",
    features: [
      "Potent stabilized Vitamin C for advanced skin brightening",
      "Enriched with Vitamins B and E and botanical antioxidants",
      "Fights wrinkles, saggy skin, and loss of firmness",
      "Neutralizes free radicals and boosts collagen synthesis"
    ],
    volumeOrDetails: "30ml"
  },

  // Masks and Scrubs
  {
    id: "gold-mask",
    name: "Careline Gold Flakes Face Mask",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱945",
    priceNum: 945,
    description: "A touch of pure glamour. Inspired by ancient royal beauty secrets, this luxurious mask contains real gold flakes to help brighten, moisturize, minimize pores, control excess oil, and lift the skin, restoring youthful elasticity and radiance.",
    features: [
      "Infused with real gold flakes for a luxurious facial",
      "Minimizes enlarged pores and controls excess sebum",
      "Visibly lifts, tones, and restores skin elasticity",
      "Brightens skin and gives a glowing complexion"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "collagen-mask",
    name: "Careline Collagen Rejuvenating Mask",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱1,065",
    priceNum: 1065,
    description: "A clinically proven sheet and cream hybrid mask designed to rejuvenate aging skin. Packed with marine collagen and natural botanicals, it infuses the skin with deep moisture to eliminate unwanted issues such as fine lines and wrinkles, leaving the skin firm and plump.",
    features: [
      "Clinically proven to rejuvenate and plump aging skin",
      "Deeply hydrates to smooth out wrinkles and fine lines",
      "Packed with natural botanical extracts and marine collagen",
      "Restores skin volume and firmness"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "papaya-mask",
    name: "Careline Honey & Papaya Whitening Mask",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱1,065",
    priceNum: 1065,
    description: "A specialized skin-whitening and exfoliating mask. Formulated with enzyme-rich papaya (containing papain) and soothing honey. Papain acts as a natural exfoliator that dissolves dead cells and impurities, reducing the visibility of blemishes and acne scars, while Honey hydrates, heals, and softens the skin.",
    features: [
      "Papain enzyme exfoliates dead cells and reveals fresh skin",
      "Brightens skin tone and decreases hyperpigmentation",
      "Honey provides deep hydration and anti-inflammatory benefits",
      "Fades the visibility of acne scars and blemishes"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "saffron-mask",
    name: "Careline Saffron Royal Face Mask",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱1,065",
    priceNum: 1065,
    description: "A royal facial treatment using the world's most luxurious spice. Saffron has always been a beauty secret in Southeast Asia to brighten and lighten the skin complexion. It heals and prevents active breakouts, tones skin, and fades superficial scars while soothing irritated skin.",
    features: [
      "Enriched with royal Saffron to brighten skin tone",
      "Helps heal and prevent acne and breakouts",
      "Soothes skin irritation, eczema, and redness",
      "Fades dark spots and prevents premature aging"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "strawberry-scrub",
    name: "Careline Strawberry & Berries Scrub",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱945",
    priceNum: 945,
    description: "A gentle exfoliating face scrub that deeply cleanses, purifies, and revives dull, lackluster skin. Formulated with real strawberry seeds and cornmeal to gently remove dry, flaky skin and dulling dead cells, leaving your skin soft, smooth, and radiant.",
    features: [
      "Real strawberry seeds and cornmeal for gentle physical exfoliation",
      "Deeply cleanses and clears blackheads from pores",
      "Revives dull, tired, and dry skin textures",
      "Contains berry antioxidants to nourish the skin barrier"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "gold-scrub",
    name: "Careline Gold Flakes Face Scrub",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱945",
    priceNum: 945,
    description: "A luxury deep pore cleansing scrub. Enriched with 24-Carat Pure Gold flakes, Turmeric, and Sandalwood. It features a deep-cleansing exfoliating action that gently removes dead skin cells and superficial whiteheads and blackheads, leaving skin glowing with a radiant complexion.",
    features: [
      "Enriched with 24-Carat Pure Gold, Turmeric, and Sandalwood",
      "Clears whiteheads, blackheads, and built-up impurities",
      "Antibacterial benefits of turmeric and sandalwood help prevent acne",
      "Leaves a luxurious, radiant golden glow post-scrub"
    ],
    volumeOrDetails: "100g"
  },
  {
    id: "lemon-sugar-scrub",
    name: "Careline Lemon Sugar Face & Body Scrub",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱1,035",
    priceNum: 1035,
    description: "A fresh, invigorating scrub rich in Vitamin C and Citric Acid. Lemon extract helps clear and brighten the skin while acting as an antioxidant. Organic sugar crystals serve as a natural, gentle abrasive that removes dead skin cells and unclogs pores, leaving skin smooth and refreshed.",
    features: [
      "Natural sugar crystals exfoliate face and body gently",
      "Lemon extract provides high-dose Vitamin C to brighten skin",
      "Unclogs pores and restores tired, dry skin",
      "Fresh, energizing citrus aromatherapy experience"
    ],
    volumeOrDetails: "150g"
  },
  {
    id: "sea-salt-scrub",
    name: "Careline Sea Salt Face & Body Scrub",
    category: "masks-scrubs",
    categoryLabel: "Careline Masks & Scrubs",
    price: "₱1,155",
    priceNum: 1155,
    description: "A highly mineralized body scrub. Natural sea salt is a natural purifier that extracts toxins and smooths rough skin on elbows, knees, and body areas. Rich in trace minerals (calcium, magnesium, potassium, copper, iron) to reduce inflammation, promote circulation, and relax muscles.",
    features: [
      "Abrasive sea salt granules are perfect for rough body skin",
      "Removes toxins and deeply purifies clogged pores",
      "Rich in therapeutic minerals: magnesium, calcium, potassium",
      "Improves blood circulation and acts as a muscle relaxant"
    ],
    volumeOrDetails: "150g"
  },

  // Beauty Machines
  {
    id: "jupiter-device",
    name: "JUPITER Advanced Beauty Machine",
    category: "beauty-machines",
    categoryLabel: "Clinical Home Devices",
    price: "₱125,000",
    priceNum: 125000,
    description: "Creams alone cannot penetrate the deepest layers of your skin. The Jupiter device uses the most advanced clinical technology for home use: Near-Infrared (NIR) technology and LED light therapy. With multiple wavelengths, it penetrates all skin layers to stimulate cell production, collagen synthesis, and cell renewal from within.",
    features: [
      "Utilizes clinical Near-Infrared (NIR) skin technology",
      "Enables deep-layer penetration of skincare active ingredients",
      "Multi-wavelength LED therapy for collagen and cell renewal",
      "Prevents dehydration and deep wrinkle formation"
    ]
  },
  {
    id: "vega-device",
    name: "VEGA Red & Amber Light Device",
    category: "beauty-machines",
    categoryLabel: "Clinical Home Devices",
    price: "₱110,000",
    priceNum: 110000,
    description: "The Vega device features Red Light + Topical Heating Therapy to improve blood circulation and skin metabolism, activating collagen production. It also features Amber Light Therapy to treat skin redness, flushing, rosacea, UV damage, and broken blood vessels. The Vega probe heats up to 40-42°C, opening pores and eliminating skin toxins.",
    features: [
      "Dual Red and Amber LED light therapy",
      "Topical heating probe (reaches a constant 40-42°C) to open pores",
      "Specifically targets skin redness, rosacea, and UV damage",
      "Restores skin elasticity and eliminates deeper toxins"
    ]
  },
  {
    id: "neptune-device",
    name: "NEPTUNE Blue Light & Cryo Device",
    category: "beauty-machines",
    categoryLabel: "Clinical Home Devices",
    price: "₱95,000",
    priceNum: 95000,
    description: "The Neptune device features Blue Light technology to treat sun damage, sun spots, active acne, and prevent bacterial growth. The treatment probe cools down to a refreshing 7°C. This cooling cryo-effect tightens pores, slows blood circulation to reduce inflammation, and kills P. acnes bacteria on the skin surface.",
    features: [
      "Blue LED light technology treats sun damage and prevents acne",
      "Cryo-cooling probe (reaches 7°C) to immediately contract pores",
      "Reduces skin inflammation, redness, and swelling",
      "Leaves skin looking firm, refreshed, and clarified"
    ]
  }
];
