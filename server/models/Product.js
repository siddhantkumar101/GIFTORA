import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    compareAt: { type: Number, default: 0 },
    description: { type: String, required: true },
    leadTime: { type: String, required: true },
    rating: { type: Number, default: 5 },
    orders: { type: Number, default: 0 },
    material: { type: String, required: true },
    colors: [{ type: String }],
    customizationAreas: [{ type: String }],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
