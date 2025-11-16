import mongoose from "mongoose";

const SweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Sweet", SweetSchema);
