const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { Internal_Server_Error } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res
    .status(Internal_Server_Error)
    .send({ message: "Requested resource not found." });
});

module.exports = router;
