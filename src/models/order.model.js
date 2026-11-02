import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // 1:N
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  // N:M
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  status: { type: String, default: "pending" },
  order_date: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export const OrderModel = mongoose.model("Order", orderSchema);
