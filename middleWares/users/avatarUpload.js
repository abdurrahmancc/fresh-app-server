const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "only .jpg, jpeg, or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).send({
        errors: {
          avatar: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
