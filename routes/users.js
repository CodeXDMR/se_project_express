const router = require("express").Router();
const { createUser, getUser, getUsers } = require("../controllers/users");

router.post("/", createUser);
router.get("/:userId", getUser);
router.get("/", getUsers);


module.exports = router;