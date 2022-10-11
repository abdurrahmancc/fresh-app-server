const createError = require("http-errors");
const Order = require("../models/ordersSchema");
const mongoose = require("mongoose");

/* ------------ new add order -------------- */
const newAddOrder = async (req, res, next) => {
  try {
    const info = req.body;
    console.log(req.body);
    const newOrder = new Order(info);
    newOrder.save((err) => {
      if (err) {
        next(createError(500, "there was an server error"));
      } else {
        res.status(200).send({
          acknowledged: true,
          message: "User was added successfully!",
        });
      }
    });
  } catch (error) {
    next(createError(500, "there was an server error"));
  }
};

/* ---------- get user order --------- */
const getUserOrders = async (req, res, next) => {
  try {
    const email = req.params.email;
    const query = { userEmail: email };
    const result = await Order.find(query);
    res.send(result);
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

/* ---------- get order for payment --------- */
const getOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = { _id: mongoose.Types.ObjectId(id) };
    const result = await Order.findOne(query);
    res.send(result);
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

/* ---------- get orders  --------- */
const getOrders = async (req, res, next) => {
  try {
    const result = await Order.find({});
    res.status(200).send({ status: "success", orders: result });
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

/* ---------- get paid orders  --------- */
const getPaidOrders = async (req, res, next) => {
  try {
    const result = await Order.find({ paid: true });
    res.status(200).send({ status: "success", orders: result });
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

module.exports = {
  newAddOrder,
  getUserOrders,
  getOrder,
  getPaidOrders,
  getOrders,
};
