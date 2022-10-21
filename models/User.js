const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      required: [true, "Please provide your name"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      unique: [true, "{VALUE} already used"],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      unique: [true, "{VALUE} must be unique"],
      validate: [validator.isMobilePhone, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    avatar: {
      type: String,
    },
    photoURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    firebaseUid: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    providerId: {
      type: String,
      enum: ["google.com", "password", "facebook.com"],
      default: "password",
    },
    IPAddress: {
      type: Array,
      default: [],
    },
    loginDevices: {
      type: Array,
      default: [],
    },
    presentAddress: {
      country: String,
      district: String,
      streetAddress: String,
      zipCode: String,
    },
    presentAddress: {
      country: String,
      district: String,
      streetAddress: String,
      zipCode: String,
    },
    permanentAddress: {
      country: String,
      district: String,
      streetAddress: String,
      zipCode: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified, otherwise it will change every time we save the user!
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
