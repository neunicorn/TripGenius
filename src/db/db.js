const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USERNAME,
    password: '',
  })
  .promise();

module.exports = db;
