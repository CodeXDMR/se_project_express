const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BAD_REQUEST_ERROR,
  AUTHORIZATION_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token }, console.log({ token }));
      // authentication successful! user is in the user variable
    })
    .catch((err) => {
      console.error(err);
      if (!email || !password) {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid data. (400)" });
      }

      return res
        .status(AUTHORIZATION_ERROR)
        .send({ message: "Authorization error. (401)" });
    });
};

// POST /signup
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);

  bcrypt
    .hash(password, 10)
    .then(console.log(password))
    .then((hash) =>
      User.create({ name, avatar, email, password: hash }, console.log(hash)),
    )
    .then((user) => res.status(201).send({name: user.name, avatar: user.avatar, email: user.email}))
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Duplicate email. (409)" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Invalid data. (400)" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server. (500)" });
    });
};

//  GET /users
// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occurred on the server. (500)" });
//     });
// };

// GET /user
// const getUser = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       console.error(err);
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(NOT_FOUND_ERROR).send({
//           message: "The request was sent to a non-existent address. (404)",
//         });
//       }
//       if (err.name === "CastError") {
//         return res
//           .status(BAD_REQUEST_ERROR)
//           .send({ message: "Invalid data. (400)" });
//       }
//       return res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occurred on the server. (500)" });
//     });
// };

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: "The request was sent to a non-existent address." });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data." });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {  createUser, getCurrentUser, login };
