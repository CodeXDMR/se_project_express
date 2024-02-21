const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required!"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL!",
    },
  },
  email: {
    type: String,
    required: [true, "The email field is required!"],
    // match: [/.+\@.+\..+/, "Invalid email address!"],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address!",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    maxlength: 80,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      console.log({ user });
      if (!user) {
        return Promise.reject(new Error("Incorrect email"));
      }
      return bcrypt
        .compare(password, user.password)
        .then(console.log("", password, "\n", user.password))
        .then((matched) => {
          // console.log(matched);
          if (!matched) {
            return Promise.reject(new Error("No matching password"));
          }
          console.log(user);
          return user; // now user is available
        });
    });
};

module.exports = mongoose.model("user", userSchema);
