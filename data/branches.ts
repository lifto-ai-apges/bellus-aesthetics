export interface BranchItem {
  id: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapLink: string;
  lat: number;
  lng: number;
  email?: string;
  servicesAvailable?: string[];
}

export const branchesData: BranchItem[] = [
  {
    id: "c-raymundo",
    name: "Bellus Aesthetics — Pasig Caniogan",
    shortName: "Pasig Caniogan",
    city: "Pasig City",
    address: "Unit 12, #59 S.Y. Realty Building, C. Raymundo Ave., Brgy. Caniogan, Pasig City, 1606 Metro Manila, Philippines",
    phone: "+63 963 027 7884",
    hours: "Monday - Sunday: 10:00 AM - 8:00 PM",
    mapLink: "https://maps.google.com/?q=59+C.+Raymundo+Ave,+Caniogan,+Pasig,+Metro+Manila",
    lat: 14.5684,
    lng: 121.0963,
    email: "pasig.caniogan@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "Doctor Procedures & Injectables", "IV Drip & Wellness Therapy"]
  },
  {
    id: "estancia-mall",
    name: "Bellus Aesthetics — Estancia Mall",
    shortName: "Estancia Mall",
    city: "Pasig City",
    address: "Lower Ground Level, South Wing, Estancia Mall, Capitol Commons, Meralco Ave, Pasig City, 1605 Metro Manila, Philippines",
    phone: "+63 917 140 8164",
    hours: "Monday - Thursday: 11:00 AM - 9:00 PM | Friday - Sunday: 10:00 AM - 10:00 PM",
    mapLink: "https://maps.google.com/?q=Estancia+Mall,+Capitol+Commons,+Pasig,+Metro+Manila",
    lat: 14.5779,
    lng: 121.0624,
    email: "estancia@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "IV Drip & Wellness Therapy"]
  },
  {
    id: "pioneer-center",
    name: "Bellus Aesthetics — Pioneer Center",
    shortName: "Pioneer Center",
    city: "Pasig City",
    address: "Pioneer Center Supermart, 8006 Pioneer St, Kapitolyo, Pasig City, 1603 Metro Manila, Philippines",
    phone: "+63 917 192 8861",
    hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
    mapLink: "https://maps.google.com/?q=Pioneer+Center+Supermart,+Pioneer+St,+Pasig,+Metro+Manila",
    lat: 14.5721,
    lng: 121.0581,
    email: "pioneer@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "IV Drip & Wellness Therapy"]
  },
  {
    id: "winford-hotel",
    name: "Bellus Aesthetics — Winford Resort Manila",
    shortName: "Winford Resort",
    city: "Manila",
    address: "Ground Floor, Winford Resort & Casino Manila, MJC Drive, San Lazaro Tourism & Business Park, Santa Cruz, Manila, 1014 Metro Manila, Philippines",
    phone: "+63 917 192 8919",
    hours: "Monday - Sunday: 11:00 AM - 10:00 PM",
    mapLink: "https://maps.google.com/?q=Winford+Resort+Casino+Manila",
    lat: 14.6180,
    lng: 120.9880,
    email: "winford@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "Doctor Procedures & Injectables", "IV Drip & Wellness Therapy"]
  },
  {
    id: "eton-tower",
    name: "Bellus Aesthetics — Eton Tower Makati",
    shortName: "Eton Tower Makati",
    city: "Makati City",
    address: "Eton Tower Makati, Dela Rosa St. cor. V.A. Rufino St., Legaspi Village, Makati City, 1229 Metro Manila, Philippines",
    phone: "+63 917 705 7642",
    hours: "Monday - Saturday: 10:00 AM - 8:00 PM",
    mapLink: "https://maps.google.com/?q=Eton+Tower+Makati",
    lat: 14.5567,
    lng: 121.0180,
    email: "makati@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "Doctor Procedures & Injectables", "IV Drip & Wellness Therapy"]
  },
  {
    id: "entrata-mall",
    name: "Bellus Aesthetics — Entrata Mall Alabang",
    shortName: "Entrata Alabang",
    city: "Muntinlupa City",
    address: "Ground Floor, Unit 15, Entrata Mall, Urban Complex, Spectrum Midway, Alabang, Muntinlupa City, 1781 Metro Manila, Philippines",
    phone: "+63 917 109 3864",
    hours: "Monday - Sunday: 10:00 AM - 8:00 PM",
    mapLink: "https://maps.google.com/?q=Entrata+Mall,+Alabang,+Muntinlupa",
    lat: 14.4172,
    lng: 121.0415,
    email: "alabang@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "Doctor Procedures & Injectables", "IV Drip & Wellness Therapy"]
  },
  {
    id: "ayala-vermosa",
    name: "Bellus Aesthetics — Ayala Malls Vermosa",
    shortName: "Vermosa Cavite",
    city: "Imus City, Cavite",
    address: "Ayala Malls Vermosa, Daang Hari Road, Imus City, 4103 Cavite, Philippines",
    phone: "+63 917 112 9096",
    hours: "Monday - Thursday: 10:00 AM - 9:00 PM | Friday - Sunday: 10:00 AM - 10:00 PM",
    mapLink: "https://maps.google.com/?q=Ayala+Malls+Vermosa,+Daang+Hari+Road,+Imus,+Cavite",
    lat: 14.3978,
    lng: 120.9836,
    email: "vermosa@bellus.ph",
    servicesAvailable: ["Slimming Face & Body", "Expert Facial Treatments", "Laser Whitening & Anti-Aging", "IV Drip & Wellness Therapy"]
  }
];
