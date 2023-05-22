const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USERNAME,
    password:'',
})

db.connect((err)=>{
    if(err) throw err;
    console.log('Database connected');
})

module.exports = db;