const router = require("express").Router();
const {  createUser, login } = require("../controllers/users");
// const userRouter = require("./users");

const itemRouter = require("./clothingItems");
const { NOT_FOUND_ERROR } = require("../utils/errors");

router.post('/signin', login);
router.post('/signup', createUser);

// router.use("/items", itemRouter);
// router.use("/users", userRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found. (404)" });
});

module.exports = router;
