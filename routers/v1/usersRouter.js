const express = require("express");
const {
  addUser,
  getUsers,
  removeUser,
  makeRole,
  getAllAdmins,
  myProfileDetails,
  updateNumber,
  updateImage,
  updateUserName,
  updatePresentAddress,
  updatePermanentAddress,
} = require("../../Controller/usersController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

const { addUserValidationHandler } = require("../../middleWares/users/userValidators");
const router = express.Router();

/*---------- get user details------------*/
router.get("/my-profile-details/:email", verifyJWT, myProfileDetails);

/*------------- update image --------------*/
router.put("/update/photoURL/:email", verifyJWT, updateImage);

/*---------- update image ----------*/
router.put("/update/Number/:email", verifyJWT, updateNumber);

/*---------- update user name ----------*/
router.put("/update/userName/:email", verifyJWT, updateUserName);

/*---------- update present address ----------*/
router.patch("/update/presentAddress/:email", verifyJWT, updatePresentAddress);

/*---------- update permanent address ----------*/
router.patch("/update/permanentAddress/:email", verifyJWT, updatePermanentAddress);

// get users
router.get("/:email", verifyJWT, requireRole(["admin", "moderator"]), getUsers);

// get all admin
router.get("/admin/:email", verifyJWT, requireRole(["admin"]), getAllAdmins);

// make Role
router.post("/makeRole/:id", verifyJWT, requireRole(["admin"]), makeRole);

// add user  without image upload
router.post("/", addUserValidationHandler, addUser);

// remove user
router.delete("/:id", verifyJWT, requireRole(["admin"]), removeUser);

module.exports = router;
