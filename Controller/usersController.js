// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/newUser");

// get users page
const getUsers = async (req, res, next) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  // console.log(user);
  try {
    const users = await User.find();
    res.send({ users: users });
  } catch (error) {
    next(error);
  }
};

// get all admins
const getAllAdmins = async (req, res, next) => {
  try {
    const users = await User.find({ role: "admin" });
    res.send({ users: users });
  } catch (error) {
    next(createError(401, "Unauthorize Access"));
  }
};

// add user
const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const loginDevices = parser(req.headers["user-agent"]);
  if (req.files && req?.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      IPAddress: req.ip,
      loginDevices: loginDevices,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      IPAddress: req.ip,
      loginDevices: loginDevices,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const userObject = {
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      role: "user",
    };

    // generate token
    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRY,
      httpOnly: true,
      signed: true,
    });

    newUser.save((err) => {
      if (err) {
        res.status(500).send({
          errors: {
            common: {
              msg: "There was a server side error!",
            },
          },
        });
      } else {
        res.status(200).send({
          token: token,
          message: "User was added successfully!",
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
};

// make Role
const makeRole = async (req, res, next) => {
  const id = req.params.id;
  const inputRole = req.body.role;
  const options = { new: true, useFindAndModify: false };
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      role: inputRole,
    },
  };

  try {
    const result = await User.findByIdAndUpdate(filter, updateDoc, options);
    res.send({ result, message: "successfully Update" });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

// remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
        if (err) console.log(err);
      });
    }

    res.status(200).send({
      data: user,
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).send({
      errors: {
        common: {
          massage: "Could not delete the user!",
        },
      },
    });
  }
};

/* ---------- my profile detail ------------ */
const myProfileDetails = async (req, res, next) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const result = await User.findOne(filter).select({ password: 0, _id: 0 });
    res.send(result);
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

/* ---------- handel Update Image ------------ */
const updateImage = async (req, res, next) => {
  try {
    const email = req.params.email;
    const photoURL = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: photoURL,
    };
    await User.findOneAndUpdate(filter, updateDoc, options);
    res.send({ update: true });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

/* ---------- handel Update user number ------------ */
const updateNumber = async (req, res, next) => {
  try {
    const email = req.params.email;
    const phoneNumber = req.body.phoneNumber;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: { phoneNumber: phoneNumber },
    };
    await User.findOneAndUpdate(filter, updateDoc, options);
    res.send({ update: true });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

/* ---------- handel Update user name ------------ */
const updateUserName = async (req, res, next) => {
  try {
    const email = req.params.email;
    const displayName = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: displayName,
    };
    await User.findOneAndUpdate(filter, updateDoc, options);
    res.send({ update: true });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

/* ---------- update Present Address ------------ */
const updatePresentAddress = async (req, res, next) => {
  try {
    const email = req.params.email;
    const info = req.body.info;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        presentAddress: info,
      },
    };
    await User.findOneAndUpdate(filter, updateDoc, options);
    res.send({ result: true });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

/* ---------- update permanent Address ------------ */
const updatePermanentAddress = async (req, res, next) => {
  try {
    const email = req.params.email;
    const info = req.body.info;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        permanentAddress: info,
      },
    };
    await User.findOneAndUpdate(filter, updateDoc, options);
    res.send({ result: true });
  } catch (error) {
    next(createError(500, "There was a server error!"));
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
  getAllAdmins,
  makeRole,
  myProfileDetails,
  updateImage,
  updateNumber,
  updateUserName,
  updatePresentAddress,
  updatePermanentAddress,
};
