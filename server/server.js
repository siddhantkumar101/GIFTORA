import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { connectMongo, mongoReady } from "./config/db.js";
import { statusFlow } from "./data/seedData.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.CLIENT_ORIGIN,
        "http://localhost:5173",
        "http://localhost:3000"
      ].filter(Boolean);
      
      if (!origin || allowed.some(a => origin.startsWith(a.replace(/\/+$/, "")))) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback: allow all in case of misconfiguration
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
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

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== "test") {
  connectMongo().then(() => {
    app.listen(PORT, () => {
      console.log(`Giftora API running on http://localhost:${PORT}`);
    });
  });
}

export default app;
