export const fallbackProducts = [
  {
    id: "signature-mug",
    slug: "signature-mug",
    name: "Signature Ceramic Mug",
    category: "Mugs",
    price: 349,
    compareAt: 499,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
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
    id: "memory-tee",
    slug: "memory-tee",
    name: "Memory Cotton T-Shirt",
    category: "T-Shirts",
    price: 599,
    compareAt: 799,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
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
    id: "snap-cover",
    slug: "snap-cover",
    name: "Snap Phone Cover",
    category: "Phone Covers",
    price: 449,
    compareAt: 649,
    image: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&auto=format&fit=crop",
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
    id: "gallery-frame",
    slug: "gallery-frame",
    name: "Gallery Photo Frame",
    category: "Photo Frames",
    price: 699,
    compareAt: 999,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop",
    description: "Premium tabletop frame with printed photo insert and message strip.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 620,
    material: "Engineered wood",
    colors: ["#111827", "#ffffff", "#92400e", "#0f766e"],
    customizationAreas: ["photo", "caption"],
    active: true
  },
  {
    id: "acrylic-keychain",
    slug: "acrylic-keychain",
    name: "Acrylic Photo Keychain",
    category: "Keychains",
    price: 199,
    compareAt: 299,
    image: "https://images.unsplash.com/photo-1560421833-2ca724baeb5f?q=80&w=800&auto=format&fit=crop",
    description: "Crystal clear acrylic keychain with double-sided photo printing.",
    leadTime: "2 days",
    rating: 4.5,
    orders: 1540,
    material: "Acrylic",
    colors: ["#ffffff", "#000000"],
    customizationAreas: ["front", "back"],
    active: true
  },
  {
    id: "comfort-cushion",
    slug: "comfort-cushion",
    name: "Comfort Photo Cushion",
    category: "Cushions",
    price: 499,
    compareAt: 749,
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=800&auto=format&fit=crop",
    description: "Soft velvet cushion with full-bleed photo print and washable cover.",
    leadTime: "3 days",
    rating: 4.7,
    orders: 830,
    material: "Velvet",
    colors: ["#ffffff", "#f8fafc", "#fef2f2"],
    customizationAreas: ["full-front"],
    active: true
  },
  {
    id: "steel-bottle",
    slug: "steel-bottle",
    name: "Steel Insulated Bottle",
    category: "Water Bottles",
    price: 899,
    compareAt: 1299,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
    description: "Double-walled steel bottle with laser-engraved name or logo.",
    leadTime: "4 days",
    rating: 4.9,
    orders: 450,
    material: "Stainless Steel",
    colors: ["#1e293b", "#f1f5f9", "#ef4444", "#3b82f6"],
    customizationAreas: ["front", "vertical"],
    active: true
  },
  {
    id: "modern-clock",
    slug: "modern-clock",
    name: "Modern Wall Clock",
    category: "Wall Clocks",
    price: 999,
    compareAt: 1499,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop",
    description: "Silent movement wall clock with custom photo dial and sleek hands.",
    leadTime: "5 days",
    rating: 4.8,
    orders: 310,
    material: "Plastic & Glass",
    colors: ["#ffffff", "#000000"],
    customizationAreas: ["dial"],
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

export const placements = [
  { id: "top", label: "Top" },
  { id: "center", label: "Center" },
  { id: "bottom", label: "Bottom" }
];

export const fonts = ["Sans", "Serif", "Mono", "Script"];

export const defaultCustomizer = {
  image: "",
  imageName: "",
  text: "Best Gift Ever",
  textColor: "#172033",
  productColor: "#ffffff",
  placement: "center",
  font: "Sans",
  quantity: 1,
  size: "Standard"
};

export const blankUser = {
  name: "",
  email: "",
  phone: ""
};

export const blankAddress = {
  line1: "",
  city: "",
  state: "",
  pincode: ""
};
