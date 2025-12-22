// This file defines data structure + database guarantees only.
const db = require("../data/database");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    strict: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

