const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST||"localhost",
    database: process.env.DB_NAME||"tripgenius",
    user: process.env.DB_USERNAME||"root",
    password: process.env.DB_PASSWORD||'',
  })
  .promise();

module.exports = db;
