import mongoose from "mongoose";

// esquema PRODUCT
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

export const ProductModel = mongoose.model("Product", productSchema);
