import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, default: "" }
    },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    items: [
      {
        productSlug: String,
        name: String,
        price: Number,
        quantity: Number,
        customization: mongoose.Schema.Types.Mixed
      }
    ],
    totals: {
      subtotal: Number,
      delivery: Number,
      discount: Number,
      grandTotal: Number
    },
    payment: {
      method: String,
      status: { type: String, default: "Paid in demo mode" },
      transactionId: String
    },
    status: { type: String, default: "Design approval" },
    tracking: [
      {
        label: String,
        at: Date,
        note: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
