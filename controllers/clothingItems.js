const clothingItem = require("../models/clothingItem");
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require("../utils/errors");

// POST /item
const createItem = (req, res) => {
  // console.log(req);
  console.log(req.body);
  console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;
  const owner  = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// GET /items
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((event) => {
      res.status(500).send({ message: "Error from getItem", event });
    });
};

// PUT /item
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(NOT_FOUND_ERROR).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// DELETE /item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((itemId) => res.status(200).send({}))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });}
    );
};

// PUT /:itemId/likes
const likeItem = (req, res) => {
  console.log(req.user._id);

  const userId = req.user._id;
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true },
    )
      .orFail()
      .then((item) => res.status(200).send({ data: item }))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
        } else if (err.name === "CastError") {
          return res.status(NOT_FOUND_ERROR).send({ message: err.message });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      })
};

// DELETE /:itemId/likes
const dislikeItem = (req, res) => {
  console.log(req.user._id);

  const userId = req.user._id;
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true },
    )
      .orFail()
      .then((item) => res.status(200).send({ data: item }))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
        } else if (err.name === "CastError") {
          return res.status(NOT_FOUND_ERROR).send({ message: err.message });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      })
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
