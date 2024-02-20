const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// router.post("/", createUser);
// router.get("/:userId", getUser);
// router.get("/", getUsers);

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;