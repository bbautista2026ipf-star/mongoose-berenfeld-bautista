import mongoose from "mongoose";

// esquema PRODUCT
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
    unique: true,
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
