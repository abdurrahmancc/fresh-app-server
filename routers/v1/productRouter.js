const express = require("express");
const createHttpError = require("http-errors");
const {
  addProduct,
  allProducts,
  getProductsLength,
  getCartProducts,
  getProductDetails,
} = require("../../Controller/productController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");
const Product = require("../../models/productSchema");
const router = express.Router();

// get all products length
router.get("/counter", getProductsLength);

// get product details
router.get("/product-details/:id", getProductDetails);

//  get all product
router.post("/all-products", allProducts);

//  get all product
router.post("/cart-products", getCartProducts);

//  add product
router.post("/add-product", verifyJWT, requireRole(["admin", "moderator"]), addProduct);

module.exports = router;
