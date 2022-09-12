const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    country: String,
    streetAddress: String,
    streetAddress2: String,
    townCity: String,
    state: String,
    postcode: String,
    phone: String,
    emailAddress: String,
    orderNotes: String,
    userEmail: String,
    photoURL: String,
    orderInfo: Array,
    totalPrice: String,
    paid: {
      type: Boolean,
      default: false,
    },
    totalPaid: String,
    transactionId: String,
    userName: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
