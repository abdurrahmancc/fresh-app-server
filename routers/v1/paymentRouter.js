const router = require("express").Router();
const { createPaymentIntent, addPayment } = require("../../Controller/paymentController");
const { verifyJWT } = require("../../middleWares/common/checkLogin");

/* -------------- create payment intent ---------------- */
router.post("/create-payment-intent", verifyJWT, createPaymentIntent);

/* -------------- create payment intent ---------------- */
router.patch("/:id", verifyJWT, addPayment);

module.exports = router;
