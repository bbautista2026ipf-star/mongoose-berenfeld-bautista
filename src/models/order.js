import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  order_date: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export const OrderModelo = mongoose.model("Order", orderSchema);
