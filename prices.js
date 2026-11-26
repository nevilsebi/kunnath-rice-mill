// =========================================================================
// KUNNATH RICE AND FLOUR MILL — EASY RATE & STORE CONFIGURATION
// Update numbers or text inside quotes below.
// Set price: null (no quotes) for items that follow daily market rates.
// =========================================================================

const MILL_CONFIG = {
  businessName: "Kunnath Rice and Flour Mill",
  tagline: "Cherpu, Thrissur, Kerala • Fresh Milling & Pure Spices",
  address: "Near Federal Bank, Cherpu, Thrissur, Kerala 680561",
  mapsUrl: "https://maps.app.goo.gl/WCTjVzNCnaAUL3oV7",
  whatsappNumber: "919645020655",
  displayPhone: "+91 96450 20655",
  openingHours: "Mon – Sat: 9:00 AM – 6:30 PM (Sun: Closed)",
  ratesUpdatedDate: "26 Nov 2026"
};

const CATALOG_ITEMS = [
  // --- SPICE POWDERS ---
  {
    id: "chilli-powder",
    name: "Pure Chilli Powder",
    localName: "Mulakupodi",
    category: "spice",
    unit: "1 kg",
    price: null, // Seasonal market rate -> shows "Market Rate"
    note: "Sun-dried whole chillies ground fresh without added colour or preservatives.",
    inStock: true
  },
  {
    id: "coriander-powder",
    name: "Roasted Coriander Powder",
    localName: "Mallippodi",
    category: "spice",
    unit: "1 kg",
    price: null, // Seasonal market rate -> shows "Market Rate"
    note: "Slow-roasted aromatic coriander seeds milled in dedicated spice grinders.",
    inStock: true
  },
  {
    id: "turmeric-powder",
    name: "Pure Turmeric Powder",
    localName: "Manjalpodi",
    category: "spice",
    unit: "500 g",
    price: 160,
    note: "Cleaned, sun-cured finger turmeric finely milled for rich natural colour.",
    inStock: true
  },
  {
    id: "sambar-powder",
    name: "Traditional Sambar Powder",
    localName: "Sambar Podi",
    category: "spice",
    unit: "500 g",
    price: 190,
    note: "Authentic Kerala-style roasted spice and lentil blend ready for daily cooking.",
    inStock: true
  },
  {
    id: "garam-masala",
    name: "Authentic Garam Masala",
    localName: "Garam Masala Podi",
    category: "spice",
    unit: "250 g",
    price: 210,
    note: "Whole Kerala spices freshly ground in small batches to lock in essential oils.",
    inStock: true
  },

  // --- FRESH FLOURS ---
  {
    id: "rice-flour",
    name: "Roasted Rice Flour",
    localName: "Arippodi (Pathiri / Idiyappam)",
    category: "flour",
    unit: "1 kg",
    price: 75,
    note: "Fine, soft-texture rice flour milled in dedicated grain-only machinery.",
    inStock: true
  },
  {
    id: "wheat-flour",
    name: "Whole Wheat Atta",
    localName: "Gothambupodi",
    category: "flour",
    unit: "1 kg",
    price: 68,
    note: "100% whole wheat milled fresh with natural dietary fibre intact.",
    inStock: true
  },

  // --- NRI & OUTSTATION COMBOS ---
  {
    id: "nri-spice-box",
    name: "NRI Essential Kitchen Pack (3.5 kg)",
    localName: "Flight-Safe Double-Sealed Combo",
    category: "combo",
    unit: "1 Box",
    price: 1150,
    note: "Chilli (1kg), Coriander (1kg), Turmeric (500g), Sambar (500g) & Rice Flour (500g) in moisture-proof travel pouches.",
    inStock: true
  },

  // --- LOCAL CUSTOM GRINDING SERVICES ---
  {
    id: "grind-spices",
    name: "Custom Spice Milling Service",
    localName: "Chilli / Coriander / Masala Grinding",
    category: "grinding",
    unit: "per kg",
    price: 30,
    note: "Bring your dried chillies or masala ingredients to our Cherpu mill for same-day grinding.",
    inStock: true
  },
  {
    id: "grind-grains",
    name: "Custom Grain & Flour Milling",
    localName: "Rice / Wheat / Ragi Grinding",
    category: "grinding",
    unit: "per kg",
    price: 15,
    note: "Dedicated grain pulverizer milling with zero cross-contact from spices.",
    inStock: true
  }
];
