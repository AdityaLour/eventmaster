const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller")

router.get("/signup", authController.getSignUp)

router.get("/login", authController.getLogin);

router.post("/signup", authController.signUp)

module.exports = router;
