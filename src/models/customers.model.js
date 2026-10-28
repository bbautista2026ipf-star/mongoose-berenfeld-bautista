import mongoose from "mongoose";

// esquema CUSTOMERS
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  last_name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    require: true,
    unique: true,
  },
  deleted_at: { type: Date, default: null },
});

// exportar modelo
export const CustomerModel = mongoose.model("Customer", customerSchema);
