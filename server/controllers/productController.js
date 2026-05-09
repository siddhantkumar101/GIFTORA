import Product from "../models/Product.js";
import { mongoReady, memoryStore } from "../config/db.js";

function cleanProduct(product) {
  const raw = product.toObject ? product.toObject() : product;
  return {
    id: raw.slug,
    slug: raw.slug,
    name: raw.name,
    category: raw.category,
    price: raw.price,
    compareAt: raw.compareAt,
    image: raw.image,
    description: raw.description,
    leadTime: raw.leadTime,
    rating: raw.rating,
    orders: raw.orders,
    material: raw.material,
    colors: raw.colors,
    customizationAreas: raw.customizationAreas,
    active: raw.active
  };
}

export const getProducts = async (req, res) => {
  if (mongoReady) {
    const products = await Product.find({ active: true }).sort({ category: 1, price: 1 });
    return res.json(products.map(cleanProduct));
  }
  res.json(memoryStore.products.map(cleanProduct));
};

export const updateProduct = async (req, res) => {
  const allowed = ["price", "compareAt", "active", "leadTime"];
  const updates = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) => allowed.includes(key))
  );

  if (mongoReady) {
    const product = await Product.findOneAndUpdate({ slug: req.params.slug }, updates, {
      new: true
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(cleanProduct(product));
  }

  const index = memoryStore.products.findIndex((product) => product.slug === req.params.slug);
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  memoryStore.products[index] = { ...memoryStore.products[index], ...updates };
  res.json(cleanProduct(memoryStore.products[index]));
};

export const createProduct = async (req, res) => {
  const { name, category, price, description, material, colors, customizationAreas } = req.body;
  
  if (!name || !category || !price) {
    return res.status(400).json({ message: "Name, category, and price are required" });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const productData = {
    id: slug,
    slug,
    name,
    category,
    price: Number(price),
    compareAt: Math.round(Number(price) * 1.3),
    description: description || "",
    leadTime: "3 days",
    rating: 5.0,
    orders: 0,
    material: material || "Mixed",
    colors: colors || ["#ffffff"],
    customizationAreas: customizationAreas || ["center"],
    active: true
  };

  if (mongoReady) {
    try {
      const existing = await Product.findOne({ slug });
      if (existing) return res.status(409).json({ message: "Product name already exists" });
      const product = await Product.create(productData);
      return res.status(201).json(cleanProduct(product));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  const existing = memoryStore.products.find(p => p.slug === slug);
  if (existing) return res.status(409).json({ message: "Product name already exists" });
  
  memoryStore.products.push(productData);
  res.status(201).json(cleanProduct(productData));
};
