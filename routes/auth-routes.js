const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/signup", function (req, res) {
  if (
    req.body.username == "" ||
    req.body.password == "" ||
    req.body.email == ""
  ) {
    res.render("auth/signup", { error: "Fill all the fields" });
    return;
  }
  if (req.body.password.length < 6) {
    res.render("auth/signup", {
      error: "Minimum 6 characters required in Password",
    });
    return;
  }
  console.log(req.body);
  res.redirect("/auth/login");
});

module.exports = router;
