// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  loginController,
  logout,
  getToken,
  isValidToken,
  isAdmin,
  googleUser,
} = require("../../Controller/loginController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../../middleWares/login/loginValidators");

// verify Token
router.get("/isValidToken", verifyJWT, isValidToken);

// login pages
router.post("/", doLoginValidators, doLoginValidationHandler, loginController);

/*---------- google user------------*/
router.put("/google", googleUser);

// logout wite remove cookie
router.delete("/", logout);

// check admin
router.get("/admin/:email", verifyJWT, isAdmin);

// get token
router.get("/:email", getToken);

module.exports = router;
