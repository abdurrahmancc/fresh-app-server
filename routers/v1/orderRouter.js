const router = require("express").Router();
const {
  newAddOrder,
  getUserOrders,
  getOrder,
  getOrders,
  getPaidOrders,
} = require("../../Controller/orderController");
const { verifyJWT, requireRole } = require("../../middleWares/common/checkLogin");

/* new add order */
router.post("/", verifyJWT, newAddOrder);

/* get User Orders */
router.get("/userOrder/:email", verifyJWT, getUserOrders);

/* ------------- get orders ----------------- */
router.post("/orders", verifyJWT, requireRole(["admin", "moderator"]), getOrders);

/* ------------- get orders ----------------- */
router.get("/paid/Orders", verifyJWT, requireRole(["admin", "moderator"]), getPaidOrders);

/* get Order for payment */
router.get("/:id", verifyJWT, getOrder);

module.exports = router;
