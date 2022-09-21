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

const {
  addUserValidators,
  addUserValidationHandler,
} = require("../../middleWares/users/userValidators");
const router = express.Router();

/**
 * @api {get} /tools All tools
 * @apiDescription Get all the tools
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the tools.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */

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

// add user  with image upload
/* router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUser); */

// add user  without image upload
router.post("/", addUserValidators, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
