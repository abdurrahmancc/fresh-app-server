const express = require("express");
const {
  addUser,
  getUsers,
  removeUser,
  makeRole,
  getAllAdmins,
} = require("../../Controller/usersController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

const {
  addUserValidators,
  addUserValidationHandler,
} = require("../../middleWares/users/userValidators");
const router = express.Router();

// get users
router.get("/:email", verifyJWT, requireRole(["admin", "moderator"]), getUsers);

// get all admin
router.get("/admin/:email", verifyJWT, requireRole(["admin"]), getAllAdmins);

// make Role
router.post("/makeRole/:id", verifyJWT, requireRole(["admin"]), makeRole);

// add user  with image upload
/* router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUser); */

// add user  without image upload
router.post("/", addUserValidators, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
