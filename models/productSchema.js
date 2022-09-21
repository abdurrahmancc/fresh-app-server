const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    by: String,
    price: String,
    regularPrice: String,
    quantity: String,
    productCode: String,
    SKU: String,
    brand: String,
    productDescription: String,
    reviewQuantity: String,
    rating: String,
    category: Array,
    colors: Array,
    weight: Array,
    productImages: Array,
    metaData: {
      metaKeyword: String,
      metaTitle: String,
      metaDescription: String,
    },
    allReview: {
      userName: String,
      email: String,
      date: {
        type: Date,
        default: Date.now,
      },
      comment: String,
      rating: String,
      photoURL: String,
    },

    stockStatus: {
      type: String,
      enum: ["in stock", "out of stock"],
      default: "in stock",
    },
    dimensions: {
      type: String,
      enum: ["N/A", "Yes"],
      default: "N/A",
    },
    productBadges: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  {
    lastUpdated: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
