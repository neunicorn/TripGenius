const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const checkConnection = async () => {
  try {
    await db.getConnection();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
};
 checkConnection();

module.exports = db;
