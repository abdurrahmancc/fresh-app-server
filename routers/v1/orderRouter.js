const router = require("express").Router();
const { newAddOrder, getUserOrders, getOrder } = require("../../Controller/orderController");
const { verifyJWT } = require("../../middleWares/common/checkLogin");

/* new add order */
router.post("/", verifyJWT, newAddOrder);

/* get User Orders */
router.get("/userOrder/:email", verifyJWT, getUserOrders);

/* get Order for payment */
router.get("/:id", verifyJWT, getOrder);

module.exports = router;
