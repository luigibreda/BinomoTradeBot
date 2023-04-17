import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    direction: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tradingAsset: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Entry = mongoose.model("Entry", entrySchema);
