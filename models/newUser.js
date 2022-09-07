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
    },
    password: {
      type: String,
      // required: true,
    },
    avatar: {
      type: String,
    },
    photoURL: {
      type: String,
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
