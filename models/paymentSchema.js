const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    orderId: String,
    transactionId: String,
    userName: String,
    totalPaid: String,
    email: String,
    status: {
      type: String,
      enum: ["shipping", "processing", "pending"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
