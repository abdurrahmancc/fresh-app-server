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
  isAdmin,
} = require("../../Controller/loginController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../../middleWares/login/loginValidators");

// verify Token
router.get("/isValidToken", isValidToken);

// check admin
router.get("/admin/:email", verifyJWT, isAdmin);

// get token
router.get("/:email", getToken);

// login pages
router.post("/", doLoginValidators, doLoginValidationHandler, loginController);

// logout wite remove cookie
router.delete("/", logout);

module.exports = router;
