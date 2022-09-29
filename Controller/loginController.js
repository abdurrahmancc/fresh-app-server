// external imports
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const parser = require("ua-parser-js");

// internal imports
const User = require("../models/newUser");

const loginController = async (req, res, next) => {
  console.log("datadfasfaf", req.body);
  try {
    const loginDevices = parser(req.headers["user-agent"]);
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { phoneNumber: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);

      if (isValidPassword) {
        // prepare the user object ot generate token
        const userObject = {
          userId: user._id,
          username: user.displayName,
          phoneNumber: user.phoneNumber || null,
          email: user.email,
          role: user.role || "user",
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //  Update IP address when login with different devices
        const options = { upsert: true };
        const filter = { email: user.email };
        const existIp = user.IPAddress.find((ip) => ip === req.ip);
        if (!existIp) {
          const addNewIpAddress = [...user.IPAddress, req.ip];
          const updateDoc = {
            $set: {
              IPAddress: addNewIpAddress,
            },
          };
          await User.findOneAndUpdate(filter, updateDoc, options);
        }

        // Update Devices when login with different devices
        const existDevice = user.loginDevices.find((devices) => devices.ua === loginDevices.ua);
        if (!existDevice) {
          const addNewLoginDevices = [...user.loginDevices, loginDevices];
          const updateDoc = {
            $set: {
              loginDevices: addNewLoginDevices,
            },
          };
          //update
          await User.findOneAndUpdate(filter, updateDoc, options);
        }

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.status(200).send({ token: token, message: "success" });
        // set logged in user local identifier
        res.locals.loggedInUser = userObject;
      } else {
        throw createError("Login failed! Please try again!");
      }
    } else {
      throw createError("Incorrect Username or Password");
    }
  } catch (error) {
    res.status(500).send({
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// logout
const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).send({ message: "logged out" });
};

// is valid token
const isValidToken = (req, res) => {
  res.send({ admin: true });
  // let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  // if (cookies) {
  //   const token = cookies[process.env.COOKIE_NAME];
  //   jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
  //     if (error) {
  //       res.send({ message: false });
  //     } else if (decoded) {
  //       res.send({ message: true });
  //     }
  //   });
  // } else {
  //   res.send({ message: false });
  // }
};

// get token
const getToken = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (user && user._id) {
      const token = cookies(process.env.COOKIE_NAME);
      res.status(200).send({ token: token });
    } else {
      throw createError("Incorrect Username or Password");
    }
  } catch (error) {
    res.status(500).send({
      data: {
        username: req.params.email,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// is Admin
const isAdmin = async (req, res) => {
  if (req.user.role) {
    const isAdmin = req.user.role === ("admin" || "moderator");
    res.send({ admin: isAdmin });
  } else {
    res.send({ admin: false });
  }
};

module.exports = { loginController, logout, getToken, isValidToken, isAdmin };
