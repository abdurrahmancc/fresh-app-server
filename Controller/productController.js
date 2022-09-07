const createError = require("http-errors");
const Product = require("../models/productSchema");

const addProduct = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Forbidden access!"));
  }
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).send({ message: "product was inserted successfully!" });
  } catch (error) {
    res.status(500).send({
      errors: {
        common: {
          msg: "There was a server error!",
        },
      },
    });
  }
};

module.exports = { addProduct };
