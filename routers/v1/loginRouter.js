// external imports
const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();

// internal imports
const {
  loginController,
  logout,
  getToken,
  googleLoginController,
  isValidToken,
} = require("../../Controller/loginController");

const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../../middleWares/login/loginValidators");

// verify Token
router.get("/isValidToken", isValidToken);

// get token
router.get("/:email", getToken);

// login pages
router.post("/", doLoginValidators, doLoginValidationHandler, loginController);

// logout wite remove cookie
router.delete("/", logout);

module.exports = router;
