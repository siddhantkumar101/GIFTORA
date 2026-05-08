export const seedProducts = [
  {
    slug: "signature-mug",
    name: "Signature Ceramic Mug",
    category: "Mugs",
    price: 349,
    compareAt: 499,
    description: "Glossy 325 ml mug with wrap-around print area and gift-ready packaging.",
    leadTime: "2 days",
    rating: 4.8,
    orders: 1240,
    material: "Ceramic",
    colors: ["#ffffff", "#f97316", "#14b8a6", "#111827"],
    customizationAreas: ["front", "wrap", "handle-side"],
    active: true
  },
  {
    slug: "memory-tee",
    name: "Memory Cotton T-Shirt",
    category: "T-Shirts",
    price: 599,
    compareAt: 799,
    description: "Soft cotton tee with crisp DTG print support for photos and custom text.",
    leadTime: "3 days",
    rating: 4.7,
    orders: 910,
    material: "Cotton",
    colors: ["#ffffff", "#0f172a", "#facc15", "#ef4444"],
    customizationAreas: ["chest", "back"],
    active: true
  },
  {
    slug: "snap-cover",
    name: "Snap Phone Cover",
    category: "Phone Covers",
    price: 449,
    compareAt: 649,
    description: "Durable matte phone cover with edge-to-edge image personalization.",
    leadTime: "2 days",
    rating: 4.6,
    orders: 760,
    material: "Polycarbonate",
    colors: ["#111827", "#ffffff", "#7c3aed", "#22c55e"],
    customizationAreas: ["full-back", "camera-safe"],
    active: true
  },
  {
    slug: "gallery-frame",
    name: "Gallery Photo Frame",
    category: "Photo Frames",
    price: 699,
    compareAt: 999,
    description: "Premium tabletop frame with printed photo insert and message strip.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 620,
    material: "Engineered wood",
    colors: ["#111827", "#ffffff", "#92400e", "#0f766e"],
    customizationAreas: ["photo", "caption"],
    active: true
  }
];

export const statusFlow = [
  "Design approval",
  "Printing",
  "Quality check",
  "Packed",
  "Shipped",
  "Delivered"
];
