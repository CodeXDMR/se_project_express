const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
// const { createUser } = require("./controllers/users");
// const {auth} = require("./middleware/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Code implementation for the next sprint.
// app.use((req, res, next) => {
//   req.user = {
//     _id: "65bfed1ed2dca4ea70b291b4",
//   };
//   next();
// });

const routes = require("./routes");
// app.use(auth)

// app.post("/signup", createUser);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
