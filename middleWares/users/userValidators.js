// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const User = require("../../models/User");

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors)?.length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files?.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `/../public/uploads/avatars/${filename}`), (err) => {
        if (err) console.log(err.message);
      });
    }

    // response the errors
    res.status(500).send({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidationHandler,
};
