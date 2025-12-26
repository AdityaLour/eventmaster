const User = require("../models/user-model");
const validation = require("../util/validation");
const bcrypt = require("bcrypt");

function getSignUp(req, res) {
  res.render("auth/signup");
}

function getLogin(req, res) {
  res.render("auth/login");
}

async function signUp(req, res) {
  const enteredData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  if (
    !validation.userDetailsAreValid(
      enteredData.email,
      enteredData.password,
      enteredData.username
    ) ||
    !validation.emailIsConfirmed(enteredData.email, req.body.confirmEmail)
  ) {
    return res.render("auth/signup", {
      error: "Please fill all fields correctly.",
    });
  }

  try {
    const existingUser = await User.findOne({ email: enteredData.email });

    if (existingUser) {
      return res.render("auth/login", {
        error: "Email already exists. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(enteredData.password, 12);

    const user = new User({
      email: enteredData.email,
      password: hashedPassword,
      name: enteredData.username,
    });

    await user.save();

    res.redirect("/auth/login");
  } catch (error) {
    console.error("Signup error:", error);

    res.render("auth/signup", {
      error: "Signup failed. Please try again later.",
    });
  }
}

module.exports = {
  getSignUp,
  getLogin,
  signUp,
};
