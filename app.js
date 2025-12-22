const express = require("express");
const path = require("path");

const connectDB = require("./data/database");

const baseRoutes = require("./routes/base-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(baseRoutes);
app.use("/auth", authRoutes);

connectDB
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database. Server not started.");
    console.error(err);
    process.exit(1);
  });

