const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyJWT = (req, res, next) => {
  let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.clearCookie(process.env.COOKIE_NAME);
      next(createError(403, "Forbidden Access!"));
    }
  } else if (req?.headers?.authorization) {
    try {
      const token = req?.headers?.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.clearCookie(process.env.COOKIE_NAME);
      next(createError(403, "Forbidden access!"));
    }
  } else {
    res.clearCookie(process.env.COOKIE_NAME);
    return res.status(401).send({
      errors: {
        common: {
          msg: "UnAuthorized Access",
        },
      },
    });
  }
};

// redirect already logged-in user
const existCookie = (req, res, next) => {
  let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (!cookies) {
    next();
  } else {
    res.redirect("/login");
  }
};

// guard to protect routes that need role-based authorization
const requireRole = (role) => {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      res.status(401).send({
        errors: {
          common: {
            msg: "You are not authorized!",
          },
        },
      });
    }
  };
};

module.exports = { verifyJWT, existCookie, requireRole };

/* const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      errors: {
        common: {
          message: "UnAuthorize access",
        },
      },
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next("Authentication failure!");
  }
};

module.exports = checkLogin; */
