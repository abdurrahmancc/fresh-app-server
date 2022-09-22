const createError = require("http-errors");
const Blogs = require("../models/blogsSchema");

const addBlog = async (req, res, next) => {
  try {
    const blog = new Blogs(req.body);
    blog.save((error) => {
      if (error) {
        next(createError(500, "There was an server error"));
      } else {
        res.status(200).send({
          acknowledged: true,
          message: "Blog was added successfully!",
        });
      }
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

const getBlogsLength = async (req, res, next) => {
  try {
    const count = await Blogs.estimatedDocumentCount();
    res.send({ count });
  } catch (error) {
    next(createError(500, error.message));
  }
};

const getBlogs = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.size);
  try {
    let blogs = await Blogs.find()
      .skip(page * count)
      .limit(count);
    res.send({ blogs });
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

/* ------------- get blog details -------------*/
const getBlogDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById({ _id: id });
    res.send(blog);
  } catch (error) {
    next(createError(500, "There was an server error"));
  }
};

module.exports = {
  addBlog,
  getBlogsLength,
  getBlogs,
  getBlogDetails,
};
