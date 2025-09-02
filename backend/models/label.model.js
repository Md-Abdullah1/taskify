const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      default: "#3498db", // default blue
      match: [/^#([0-9A-F]{6})$/i, "Invalid hex color"],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Label", labelSchema);
