const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  if (err) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("there was an error");
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
