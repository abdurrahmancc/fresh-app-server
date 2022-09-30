const express = require("express");
const router = express.Router();
const {
  addProduct,
  allProducts,
  getProductsLength,
  getCartProducts,
  getProductDetails,
  getWishlistProducts,
  getCompareListProducts,
  getHomeProducts,
  searchProduct,
} = require("../../Controller/productController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

/*------------- get all products length -----------*/
router.get("/counter", getProductsLength);

/*----------- get all product -----------*/
router.post("/all-products", allProducts);

/*---------- get all product ------------*/
router.post("/cart-products", getCartProducts);

/*---------- get all wishlist ------------*/
router.post("/wishlist-products", getWishlistProducts);

/*---------- get all compare List products ------------*/
router.post("/compare-List/products", getCompareListProducts);

/*----------------- get home products --------------*/
router.get("/home/products/:category", getHomeProducts);

/*---------- add product -----------*/
router.post("/add-product", verifyJWT, requireRole(["admin", "moderator"]), addProduct);

/*---------- search products -----------*/
router.post("/search", searchProduct);

/*---------- get product details ------------*/
router.get("/product-details/:id", getProductDetails);

module.exports = router;
