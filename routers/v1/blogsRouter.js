// external imports
const router = require("express").Router();

const {
  addBlog,
  getBlogsLength,
  getBlogs,
  getBlogDetails,
} = require("../../Controller/blogsController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

router.post("/", verifyJWT, requireRole(["admin", "moderator"]), addBlog);

/*----------- get Blogs Length -----------*/
router.get("/counter", getBlogsLength);

/*----------- get Blogs -----------*/
router.get("/", getBlogs);

/*----------- get Blog  details -----------*/
router.get("/:id", getBlogDetails);

module.exports = router;
