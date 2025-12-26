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

async function login(req, res) {
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!enteredData.email || !enteredData.password) {
    return res.render("auth/login", {
      error: "Please provide both email and password.",
    });
  }

  try {
    const enteredUser = await User.findOne({ email: enteredData.email }).select(
      "+password"
    );

    if (!enteredUser) {
      return res.render("auth/login", {
        error: "Invalid email or password.",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(
      enteredData.password,
      enteredUser.password
    );

    if (!passwordIsCorrect) {
      return res.render("auth/login", {
        error: "Invalid email or password.",
      });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Login Error:", error);
    res.render("auth/login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  getSignUp,
  getLogin,
  signUp,
};
