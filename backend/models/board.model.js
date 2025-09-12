 const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    // Core Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    // Ownership & Access
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Team Members with Roles
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member", "viewer"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Privacy Settings
    visibility: {
      type: String,
      enum: ["private", "workspace", "public"],
      default: "private",
    },

    // Visual Customization
    backgroundImage: {
      type: String, // URL or base64
    },
    backgroundGradient: {
      type: String, // e.g., "to right, #ffecd2, #fcb69f"
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },

    // Is the board archived?
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);