import mongoose from "mongoose";

// esquema PRODUCT
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
