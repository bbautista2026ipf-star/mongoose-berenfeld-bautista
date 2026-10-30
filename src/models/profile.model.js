import mongoose from "mongoose";

// esquema PROFILES
const profileSchema = new Schema({
  // 1:1
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    unique: true,
  },
  birth_date: {
    type: Date,
    require: true,
    unique: true,
  },
  address: {
    street: String,
    street_number: String,
    city: String,
    country: String,
  },
  deleted_at: { type: Date, default: null },
});

// exportar modelo
export const ProfileModel = mongoose.model("Profile", profileSchema);
