const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST || "34.101.229.141",
    database: process.env.DB_DATABASE_NAME || "tripgenius",
    user: process.env.DB_USERNAME || "admin",
    password: "admin123",
  })
  .promise();

module.exports = db;
