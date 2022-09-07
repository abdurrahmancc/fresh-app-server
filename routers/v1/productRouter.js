const express = require("express");
const { addProduct } = require("../../Controller/productController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req);
});

//  add product
router.post("/add-product", verifyJWT, requireRole(["admin", "moderator"]), addProduct);

module.exports = router;
