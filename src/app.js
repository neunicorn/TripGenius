const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/api/v1/auth.js");
const userRoutes = require("./routes/api/v1/user.js");
const db = require("./db/db.js");
const app = express();

//parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "0.0.0.0" }));

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoutes);

//error route handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  // next(err);
  res.status(404).json({
    message: "Not Found",
    status: 404,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
