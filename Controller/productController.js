const createError = require("http-errors");
const Product = require("../models/productSchema");

/*----------- add product -------------*/
const addProduct = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Forbidden access!"));
  }
  try {
    const product = new Product(req.body);
    await product.save();
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

/*------------ get all products -------------*/
const allProducts = async (req, res, next) => {
  const categories = req.body;
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.size);
  const minPrice = parseInt(req.query.minPrice);
  const maxPrice = parseInt(req.query.maxPrice);

  try {
    let query;
    if (categories.length) {
      query = { category: { $in: categories } };
    } else {
      query = {};
    }
    const products = await Product.find({
      $and: [query, { price: { $gte: minPrice, $lte: maxPrice } }],
    })
      .skip(page * count)
      .limit(count);
    res.send(products);
  } catch (error) {
    console.log(error);
    next(createError(500, "there was an server error"));
  }
};

/*----------- get all products length ---------*/
const getProductsLength = async (req, res, next) => {
  try {
    const count = await Product.estimatedDocumentCount();
    res.send({ count });
  } catch (error) {
    next(createError(500, "there was an server error"));
  }
};

/*---------- get cart products ---------*/
const getCartProducts = async (req, res, next) => {
  const keys = req.body;
  try {
    let query = { _id: { $in: keys } };
    const result = await Product.find(query);
    res.send(result);
  } catch (error) {
    next(createError(500, "there was an server error"));
  }
};

/*-------- get wishlist-products ---------- */
const getWishlistProducts = async (req, res, next) => {
  const keys = req.body;
  try {
    let query = { _id: { $in: keys } };
    const result = await Product.find(query);
    res.send(result);
  } catch (error) {
    next(createError(500, "there was an server error"));
  }
};
/*--------- get compare List products ----------*/
const getCompareListProducts = async (req, res, next) => {
  const keys = req.body;
  try {
    let query = { _id: { $in: keys } };
    const result = await Product.find(query);
    res.send(result);
  } catch (error) {
    next(createError(500, "there was an server error"));
  }
};

/* --------- getProductDetails ----------- */
const getProductDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    next(createError());
  }
};

/*---------------- get Home Products ----------------*/
const getHomeProducts = async (req, res, next) => {
  try {
    const category = req.params.category;
    const query = { category: category };
    const result = await Product.find(query);
    res.status(200).send({ message: "success", result });
  } catch (error) {
    next(createError());
  }
};

/*------------ search product ------------------*/
const searchProduct = async (req, res, next) => {
  try {
    const { inputData, category } = req.body;
    if (category) {
      const result = await Product.find({
        category: category,
        productName: { $regex: inputData, $options: "i" },
      });
      if (result.length >= 1) {
        res.status(200).send({ result, message: "success" });
      } else {
        res.status(204).send({ message: "There are no results" });
      }
    } else {
      const result = await Product.find({
        productName: { $regex: inputData, $options: "i" },
      });
      if (result.length >= 1) {
        res.status(200).send({ result, message: "success" });
      } else {
        res.status(204).send({ message: "There are no results" });
      }
    }
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

module.exports = {
  addProduct,
  allProducts,
  getProductsLength,
  getCartProducts,
  getProductDetails,
  getWishlistProducts,
  getCompareListProducts,
  getHomeProducts,
  searchProduct,
};
