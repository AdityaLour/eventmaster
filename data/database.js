const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/event";

const connectDB = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    throw error; // IMPORTANT: lets app.js fail fast
  });

module.exports = connectDB;
