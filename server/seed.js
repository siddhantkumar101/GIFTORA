import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { seedProducts } from "./data/seedData.js";

async function forceSeed() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    console.log("Deleting existing products...");
    await Product.deleteMany({});

    console.log("Inserting new products with correct images...");
    await Product.insertMany(seedProducts);

    console.log("Success! Product catalog updated.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

forceSeed();
