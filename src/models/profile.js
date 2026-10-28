import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  birth_date: Date,
  address: {
    country: String,
    city: String,
    street: String,
    street_number: Number,
  },
  deleted_at: { type: Date, default: null },
});

export const ProfileModel = mongoose.model("Profile", profileSchema);
