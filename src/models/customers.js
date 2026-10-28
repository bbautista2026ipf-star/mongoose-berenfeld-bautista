import mongoose from "mongoose";

// esquema CUSTOMERS
const customerSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  email: String,
  phone_number: Number,
  deleted_at: { type: Date, default: null },
});

// exportar modelo
export const CustomerModel = mongoose.model("Customer", customerSchema);
