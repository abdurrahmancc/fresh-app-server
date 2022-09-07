const createError = require("http-errors");
const Product = require("../models/productSchema");

// add product
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

// get all products
const allProducts = async (req, res, next) => {
  const category = req.body;
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.size);
  try {
    let query;
    if (category.length) {
      query = { category: { $in: category } };
    } else {
      query = {};
    }
    const products = await Product.find(query)
      .skip(page * count)
      .limit(count);
    res.send(products);
  } catch (error) {
    next(createHttpError(500, "there was an server error"));
  }
};

// get all products length
const getProductsLength = async (req, res, next) => {
  try {
    const count = await Product.estimatedDocumentCount();
    res.send({ count });
  } catch (error) {
    next(createHttpError(500, "there was an server error"));
  }
};

// get cart-products
const getCartProducts = async (req, res, next) => {
  const keys = req.body;
  try {
    let query = { _id: { $in: keys } };
    const result = await Product.find(query);
    res.send(result);
  } catch (error) {
    next(createHttpError(500, "there was an server error"));
  }
};

module.exports = { addProduct, allProducts, getProductsLength, getCartProducts };
