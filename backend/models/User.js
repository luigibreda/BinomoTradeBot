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
  history: {
    type: Array,
    required: false,
    default: [],
    fill: {
      timeStart: {
        type: String,
        required: true,
      },
      timeEnd: {
        type: String,
        required: true,
      },
      initialBalance: {
        type: Number,
        required: true,
      },
      finalBalance: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      profit: {
        type: Number,
        required: true,
      },
      isProfit: {
        type: Boolean,
        required: true,
      },
    },
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
