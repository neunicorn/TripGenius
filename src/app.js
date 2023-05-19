const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const authRoutes = require("./routes/api/v1/auth.js");

const app = express();
const env = dotenv.config().parsed;

//parsing application/json
app.use(express.json());

app.use("/v1/auth", authRoutes);

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

const PORT = env.APP_PORT;
const HOST = env.APP_HOST;

const server = http.createServer(app);
console.log(`Server running at http://${HOST}:${PORT}/`);
server.listen(PORT, HOST);
