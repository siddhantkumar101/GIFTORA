import mongoose from "mongoose";
import Product from "../models/Product.js";
import { seedProducts } from "../data/seedData.js";

export const memoryStore = {
  products: seedProducts.map((product) => ({ ...product })),
  orders: [],
  users: []
};

export let mongoReady = false;

export async function connectMongo() {
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
