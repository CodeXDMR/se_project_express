const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middleware/auth");

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, likeItem);

// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
