const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const app = require("express");
const jwt = require("jsonwebtoken");
const Todo = require('./todo');
const config = require('config');
const schemaUser = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a postive number");
        }
      },
    },
    tokens: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

schemaUser.methods.genreateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.get('jwtPrivateKey'));
  user.tokens.push(token);
  await user.save();
  return token;
};

schemaUser.virtual("Todolist", {
  ref: "Todo",
  localField: "_id",
  foreignField: "owner",
});

//for login
schemaUser.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = ( password == user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};


const User = mongoose.model("User", schemaUser);

module.exports = User;
