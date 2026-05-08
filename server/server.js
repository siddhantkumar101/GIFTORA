import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import User from "./models/User.js";
import { seedProducts, statusFlow } from "./data/seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

const memoryStore = {
  products: seedProducts.map((product) => ({ ...product })),
  orders: [],
  users: []
};

let mongoReady = false;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

function cleanProduct(product) {
  const raw = product.toObject ? product.toObject() : product;
  return {
    id: raw.slug,
    slug: raw.slug,
    name: raw.name,
    category: raw.category,
    price: raw.price,
    compareAt: raw.compareAt,
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

function cleanOrder(order) {
  const raw = order.toObject ? order.toObject() : order;
  return {
    orderNumber: raw.orderNumber,
    customer: raw.customer,
    address: raw.address,
    items: raw.items,
    totals: raw.totals,
    payment: raw.payment,
    status: raw.status,
    tracking: raw.tracking,
    createdAt: raw.createdAt || new Date().toISOString()
  };
}

function makeOrderNumber() {
  return `GFT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
}

async function connectMongo() {
  if (!process.env.MONGODB_URI) {
    console.log("MongoDB URI not set. Running with in-memory demo data.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
    }
    mongoReady = true;
    console.log("MongoDB connected for Giftora.");
  } catch (error) {
    mongoReady = false;
    console.log("MongoDB unavailable. Continuing with in-memory demo data.");
    console.log(error.message);
  }
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    app: "Giftora Studio",
    stack: "MERN",
    database: mongoReady ? "mongodb" : "in-memory-demo",
    statuses: statusFlow
  });
});

app.get("/api/products", async (req, res) => {
  if (mongoReady) {
    const products = await Product.find({ active: true }).sort({ category: 1, price: 1 });
    return res.json(products.map(cleanProduct));
  }
  res.json(memoryStore.products.map(cleanProduct));
});

app.patch("/api/products/:slug", async (req, res) => {
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
});

app.post("/api/products", async (req, res) => {
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
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, phone, role = "consumer" } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (mongoReady) {
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: "Email already registered" });
      const user = await User.create({ name, email, password, phone, role });
      return res.status(201).json({ id: user._id, role: user.role, name: user.name, email: user.email, phone: user.phone });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  const existing = memoryStore.users.find((user) => user.email === email);
  if (existing) return res.status(409).json({ message: "Email already registered" });
  const user = { id: `usr-${Date.now()}`, role, name, email, password, phone };
  memoryStore.users.push(user);
  res.status(201).json(user);
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (mongoReady) {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (role && user.role !== role) {
      return res.status(403).json({ message: `Access denied. Account is registered as ${user.role}.` });
    }
    return res.json({ id: user._id, role: user.role, name: user.name, email: user.email, phone: user.phone });
  }

  const user = memoryStore.users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  if (role && user.role !== role) {
    return res.status(403).json({ message: `Access denied. Account is registered as ${user.role}.` });
  }
  res.json(user);
});

app.get("/api/orders", async (req, res) => {
  const email = req.query.email?.toString();

  if (mongoReady) {
    const query = email ? { "customer.email": email } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    return res.json(orders.map(cleanOrder));
  }

  const orders = email
    ? memoryStore.orders.filter((order) => order.customer.email === email)
    : memoryStore.orders;
  res.json(orders.map(cleanOrder));
});

app.post("/api/orders", async (req, res) => {
  const { customer, address, items, totals, payment } = req.body;
  if (!customer?.name || !customer?.email || !address?.line1 || !items?.length) {
    return res.status(400).json({ message: "Customer, address, and cart items are required" });
  }

  const order = {
    orderNumber: makeOrderNumber(),
    customer,
    address,
    items,
    totals,
    payment: {
      method: payment?.method || "Giftora Secure Demo Pay",
      status: "Paid in demo mode",
      transactionId: `TXN-${Date.now()}`
    },
    status: "Design approval",
    tracking: [
      {
        label: "Order confirmed",
        at: new Date(),
        note: "Custom design received by Giftora Studio."
      }
    ],
    createdAt: new Date().toISOString()
  };

  if (mongoReady) {
    const created = await Order.create(order);
    return res.status(201).json(cleanOrder(created));
  }

  memoryStore.orders.unshift(order);
  res.status(201).json(cleanOrder(order));
});

app.patch("/api/orders/:orderNumber/status", async (req, res) => {
  const { status } = req.body;
  if (!statusFlow.includes(status)) {
    return res.status(400).json({ message: "Unsupported order status" });
  }

  const trackingEntry = {
    label: status,
    at: new Date(),
    note: `Order moved to ${status}.`
  };

  if (mongoReady) {
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { status, $push: { tracking: trackingEntry } },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(cleanOrder(order));
  }

  const order = memoryStore.orders.find((item) => item.orderNumber === req.params.orderNumber);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.status = status;
  order.tracking.push(trackingEntry);
  res.json(cleanOrder(order));
});

const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Giftora API running on http://localhost:${PORT}`);
  });
});
