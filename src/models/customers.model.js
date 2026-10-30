import mongoose from "mongoose";

// esquema CUSTOMERS
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
  },
  deleted_at: { type: Date, default: null },
});

// exportar modelo
export const CustomerModel = mongoose.model("Customer", customerSchema);
