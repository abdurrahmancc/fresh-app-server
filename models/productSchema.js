const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "product name must be required"],
      trim: true,
    },
    by: {
      type: String,
      required: [true, "product by must be required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product price must be required"],
      trim: true,
    },
    regularPrice: {
      type: Number,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "product quantity must be required"],
      trim: true,
    },
    productCode: {
      type: Number,
      required: [true, "product product Code must be required"],
      trim: true,
      unique: [true, "product Code must be unique"],
    },
    SKU: {
      type: String,
      required: [true, "product SKU must be required"],
      trim: true,
      unique: [true, "product SKU must be unique"],
    },
    brand: {
      type: String,
      required: [true, "product brand must be required"],
      trim: true,
    },
    productDescription: {
      type: String,
      required: [true, "product description must be required"],
      trim: true,
    },
    reviewQuantity: String,
    rating: String,
    category: [
      {
        type: String,
        required: [true, "product category must be required"],
        trim: true,
      },
    ],
    colors: Array,
    weight: Array,
    productImages: [
      {
        type: String,
        required: [true, "product image url must be required"],
      },
    ],
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
