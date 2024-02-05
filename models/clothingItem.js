const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");


const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
  },

  imageURL: {
    type: String,
    required: [true, "The image URL field is required!"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL!",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: "",
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", clothingItem);