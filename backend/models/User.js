import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  entries: {
    type: Array,
    required: false,
    default: [],
    fill: {
      direction: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      traddingAsset: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
