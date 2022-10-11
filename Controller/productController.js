const createError = require("http-errors");
const Product = require("../models/productSchema");

/*----------- add product -------------*/
const addProduct = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Forbidden access!"));
  }
  try {
    // console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({ message: "product was inserted successfully!" });
  } catch (error) {
    res.status(500).send({
      errors: {
        common: {
          msg: error.message,
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
  let minPrice = Number(req.query.minPrice);
  let maxPrice = Number(req.query.maxPrice);

  try {
    let query;
    if (categories.length) {
      query = { category: { $in: categories } };
    } else {
      query = {};
    }

    if (minPrice == 50 && maxPrice == 150) {
      minPrice = 1;
      maxPrice = 200;
    }
    const products = await Product.find({
      $and: [query, { price: { $gte: minPrice, $lte: maxPrice } }],
    })
      .skip(page * count)
      .limit(count);
    res.send(products);
  } catch (error) {
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
const getProducts = async (req, res, next) => {
  /* http://localhost:5000/api/v1/product/home/products/:category?limit=3&*/
  try {
    const query = { category: req.params.category };
    let { limit = 5 } = req.query;
    limit = Number(limit);

    let products;
    if (req.params.category === "all") {
      products = await Product.find({}).limit(limit);
    } else {
      products = await Product.find(query).limit(limit);
    }

    res.status(200).json({
      status: "success",
      result: products,
    });
  } catch (error) {
    next(createError(400, error.message));
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
      res.status(200).send({ result, message: "success" });
    } else {
      const result = await Product.find({
        productName: { $regex: inputData, $options: "i" },
      });
      res.status(200).send({ result, message: "success" });
    }
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

module.exports = {
  addProduct,
  allProducts,
  getProducts,
  getProductsLength,
  getCartProducts,
  getProductDetails,
  getWishlistProducts,
  getCompareListProducts,
  searchProduct,
};
