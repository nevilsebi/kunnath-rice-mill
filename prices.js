// =========================================================================
// KUNNATH RICE AND FLOUR MILL — EASY RATE, BULK & PHOTO CONFIGURATION
// 1. Edit prices or stock status below anytime.
// 2. Set price: null (without quotes) for items following daily market rates.
// 3. Place your real photos inside the "images/" folder matching the filenames.
// =========================================================================

const MILL_CONFIG = {
  businessName: "Kunnath Rice and Flour Mill",
  tagline: "Cherpu, Thrissur, Kerala • Direct Mill Supply, Wholesale & NRI Packs",
  address: "Near Federal Bank, Cherpu, Thrissur, Kerala 680561",
  mapsUrl: "https://maps.app.goo.gl/WCTjVzNCnaAUL3oV7",
  whatsappNumber: "919645020655",
  displayPhone: "+91 96450 20655",
  openingHours: "Mon – Sat: 9:00 AM – 6:30 PM (Sun: Closed)",
  ratesUpdatedDate: "27 Nov 2026"
};

const CATALOG_ITEMS = [
  // --- SPICE POWDERS ---
  {
    id: "chilli-powder",
    name: "Pure Red Chilli Powder",
    localName: "Mulakupodi (Regular Hot)",
    category: "spice",
    image: "images/chilli.jpg",
    badge: "Live Market Rate",
    note: "Sun-dried whole red chillies freshly ground without synthetic colours or fillers.",
    inStock: true,
    variants: [
      { label: "500 g", weightKg: 0.5, price: null },
      { label: "1 kg", weightKg: 1.0, price: null },
      { label: "5 kg Bulk", weightKg: 5.0, price: null },
      { label: "10 kg Sack", weightKg: 10.0, price: null }
    ]
  },
  {
    id: "kashmiri-chilli",
    name: "Kashmiri Chilli Powder",
    localName: "Kashmiri Mulakupodi (Rich Colour, Mild Heat)",
    category: "spice",
    image: "images/kashmiri-chilli.jpg",
    badge: "Live Market Rate",
    note: "Deep natural crimson colour and mild aroma—ideal for Kerala curries and catering.",
    inStock: true,
    variants: [
      { label: "500 g", weightKg: 0.5, price: null },
      { label: "1 kg", weightKg: 1.0, price: null },
      { label: "5 kg Bulk", weightKg: 5.0, price: null }
    ]
  },
  {
    id: "coriander-powder",
    name: "Roasted Coriander Powder",
    localName: "Mallippodi",
    category: "spice",
    image: "images/coriander.jpg",
    badge: "Live Market Rate",
    note: "Slow-roasted aromatic coriander seeds milled fresh in dedicated spice grinders.",
    inStock: true,
    variants: [
      { label: "500 g", weightKg: 0.5, price: null },
      { label: "1 kg", weightKg: 1.0, price: null },
      { label: "5 kg Bulk", weightKg: 5.0, price: null },
      { label: "10 kg Sack", weightKg: 10.0, price: null }
    ]
  },
  {
    id: "turmeric-powder",
    name: "Pure Finger Turmeric Powder",
    localName: "Manjalpodi",
    category: "spice",
    image: "images/turmeric.jpg",
    badge: "High Curcumin",
    note: "Cleaned, sun-cured whole turmeric fingers finely milled for pure golden colour.",
    inStock: true,
    variants: [
      { label: "250 g", weightKg: 0.25, price: 85 },
      { label: "500 g", weightKg: 0.5, price: 160 },
      { label: "1 kg", weightKg: 1.0, price: 310 },
      { label: "5 kg Bulk", weightKg: 5.0, price: 1500 }
    ]
  },
  {
    id: "sambar-powder",
    name: "Traditional Kerala Sambar Powder",
    localName: "Sambar Podi",
    category: "spice",
    image: "images/sambar-podi.jpg",
    badge: "House Blend",
    note: "Balanced Thrissur-style roasted spice and lentil blend for homes and caterers.",
    inStock: true,
    variants: [
      { label: "250 g", weightKg: 0.25, price: 100 },
      { label: "500 g", weightKg: 0.5, price: 190 },
      { label: "1 kg", weightKg: 1.0, price: 370 },
      { label: "5 kg Bulk", weightKg: 5.0, price: 1800 }
    ]
  },
  {
    id: "garam-masala",
    name: "Authentic Kerala Garam Masala",
    localName: "Garam Masala Podi",
    category: "spice",
    image: "images/garam-masala.jpg",
    badge: "Small Batch",
    note: "Whole Kerala cardamom, clove, cinnamon, and pepper freshly ground in small batches.",
    inStock: true,
    variants: [
      { label: "100 g", weightKg: 0.1, price: 90 },
      { label: "250 g", weightKg: 0.25, price: 210 },
      { label: "500 g", weightKg: 0.5, price: 400 },
      { label: "1 kg Bulk", weightKg: 1.0, price: 780 }
    ]
  },

  // --- BREAKFAST & TRADITIONAL FLOURS ---
  {
    id: "idli-podi",
    name: "Roasted Idli & Dosa Chutney Podi",
    localName: "Idli Podi / Chammanthi Podi",
    category: "breakfast",
    image: "images/idli-podi.jpg",
    badge: "NRI Favourite",
    note: "Coarse-ground roasted urad dal, chana dal, red chillies, curry leaves & hing.",
    inStock: true,
    variants: [
      { label: "250 g", weightKg: 0.25, price: 95 },
      { label: "500 g", weightKg: 0.5, price: 180 },
      { label: "1 kg", weightKg: 1.0, price: 350 },
      { label: "3 kg Bulk", weightKg: 3.0, price: 1020 }
    ]
  },
  {
    id: "idiyappam-podi",
    name: "Roasted Idiyappam & Pathiri Rice Flour",
    localName: "Vellappam / Idiyappam / Pathiri Podi",
    category: "breakfast",
    image: "images/idiyappam-podi.jpg",
    badge: "Fine Steam Roast",
    note: "Super-fine steam-roasted white rice flour milled in grain-only units for soft idiyappam.",
    inStock: true,
    variants: [
      { label: "1 kg", weightKg: 1.0, price: 75 },
      { label: "2 kg", weightKg: 2.0, price: 145 },
      { label: "5 kg Bulk", weightKg: 5.0, price: 350 },
      { label: "10 kg Sack", weightKg: 10.0, price: 680 }
    ]
  },
  {
    id: "puttu-podi",
    name: "Kerala Chemba / White Puttu Podi",
    localName: "Puttu Podi (Coarse Steam Grain)",
    category: "breakfast",
    image: "images/puttu-podi.jpg",
    badge: "Freshly Milled",
    note: "Coarsely granulated and roasted rice flour that steams into fluffy, soft puttu.",
    inStock: true,
    variants: [
      { label: "1 kg", weightKg: 1.0, price: 78 },
      { label: "2 kg", weightKg: 2.0, price: 150 },
      { label: "5 kg Bulk", weightKg: 5.0, price: 365 },
      { label: "10 kg Sack", weightKg: 10.0, price: 710 }
    ]
  },
  {
    id: "wheat-flour",
    name: "100% Whole Wheat Chakki Atta",
    localName: "Gothambupodi",
    category: "breakfast",
    image: "images/wheat-atta.jpg",
    badge: "Zero Maida",
    note: "Whole wheat grains milled fresh with natural dietary bran intact for soft chapatis.",
    inStock: true,
    variants: [
      { label: "1 kg", weightKg: 1.0, price: 68 },
      { label: "5 kg Bulk", weightKg: 5.0, price: 320 },
      { label: "10 kg Sack", weightKg: 10.0, price: 620 }
    ]
  },

  // --- CUSTOM MILLING SERVICES (LOCAL THRISSUR) ---
  {
    id: "grind-spices",
    name: "Custom Spice Milling Service",
    localName: "Bring Your Own Dried Chillies / Coriander / Masala",
    category: "grinding",
    image: "images/custom-grinding.jpg",
    badge: "Cherpu Walk-In",
    note: "Bring your sun-dried spices to our Cherpu mill for clean, same-day grinding.",
    inStock: true,
    variants: [
      { label: "1 kg batch", weightKg: 1.0, price: 30 },
      { label: "5 kg batch", weightKg: 5.0, price: 150 },
      { label: "10 kg batch", weightKg: 10.0, price: 300 }
    ]
  },
  {
    id: "grind-grains",
    name: "Custom Rice, Wheat & Ragi Milling",
    localName: "Dedicated Grain-Only Pulverizer",
    category: "grinding",
    image: "images/custom-grinding.jpg",
    badge: "Zero Spice Contact",
    note: "Milled in separate grain-only machinery so your flour stays completely pure.",
    inStock: true,
    variants: [
      { label: "1 kg batch", weightKg: 1.0, price: 15 },
      { label: "5 kg batch", weightKg: 5.0, price: 75 },
      { label: "10 kg batch", weightKg: 10.0, price: 150 }
    ]
  }
];
