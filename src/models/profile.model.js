import mongoose from "mongoose";

// esquema PROFILES
const profileSchema = new mongoose.Schema({
  // 1:1
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    unique: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    street_number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  deleted_at: { type: Date, default: null },
});

// exportar modelo
export const ProfileModel = mongoose.model("Profile", profileSchema);
