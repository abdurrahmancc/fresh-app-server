const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    photoURL: {
      type: String,
      default: "",
    },
    firebaseUid: {
      type: String,
      default: "",
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
