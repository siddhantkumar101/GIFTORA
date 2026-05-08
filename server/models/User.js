import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["consumer", "seller"], default: "consumer", index: true },
    phone: { type: String, default: "" },
    addresses: [
      {
        label: String,
        line1: String,
        city: String,
        state: String,
        pincode: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
