const express = require("express");
const {
  addProduct,
  allProducts,
  getProductsLength,
  getCartProducts,
  getProductDetails,
  getWishlistProducts,
  getCompareListProducts,
} = require("../../Controller/productController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");
const router = express.Router();

/*------------- get all products length -----------*/
router.get("/counter", getProductsLength);

/*---------- get product details ------------*/
router.get("/product-details/:id", getProductDetails);

/*----------- get all product -----------*/
router.post("/all-products", allProducts);

/*---------- get all product ------------*/
router.post("/cart-products", getCartProducts);

/*---------- get all wishlist ------------*/
router.post("/wishlist-products", getWishlistProducts);

/*---------- get all compare List products ------------*/
router.post("/compare-List/products", getCompareListProducts);

/*---------- add product -----------*/
router.post("/add-product", verifyJWT, requireRole(["admin", "moderator"]), addProduct);

module.exports = router;
