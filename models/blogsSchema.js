const mongoose = require("mongoose");
const blogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    description1: {
      type: String,
      required: true,
      trim: true,
    },
    description2: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    blockquote: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("blog", blogsSchema);
module.exports = Blogs;
