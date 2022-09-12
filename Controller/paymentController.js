const createError = require("http-errors");
const Order = require("../models/ordersSchema");
const Payment = require("../models/paymentSchema");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51L0Wy7JukytloPq3yV4K6nko3G4iKpSG8PzMgUK1ERwtdK1ijgB5oW7MYpjrp0n8HEvkxnLDY4D2QJBI0ZxLc6Om00fbzhp8Xh"
);

/*-------------- create payment intent ------------*/
const createPaymentIntent = async (req, res, next) => {
  try {
    const payment = req.body;
    const amount = Math.round(payment.price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

/*------------ payment order ------------*/
const addPayment = async (req, res, next) => {
  const id = req.params.id;
  const payment = req.body;
  const filter = { _id: id };
  const options = { new: true, useFindAndModify: false };
  const updateDoc = {
    $set: {
      paid: true,
      transactionId: payment.transactionId,
      paidDate: payment.paidDate,
      userName: payment.userName,
      totalPaid: payment.totalPaid,
    },
  };

  try {
    const newPayment = new Payment(payment);
    await newPayment.save();
    const updateOrder = await Order.findByIdAndUpdate(filter, updateDoc, options);
    res.send(updateOrder);
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

module.exports = {
  createPaymentIntent,
  addPayment,
};
