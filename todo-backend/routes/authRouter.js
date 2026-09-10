const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  authController.register
);

authRouter.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

module.exports = authRouter;
