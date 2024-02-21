const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { auth } = require("../middleware/auth");

// router.post("/", createUser);
// router.get("/:userId", getUser);
// router.get("/", getUsers);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
