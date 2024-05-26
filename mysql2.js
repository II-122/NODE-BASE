// 2024-05-07 create
// 2024-05-17 update

// Get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password : process.env.DB_PASSWORD,
  // timezone : 'Asia/Seoul',
  database: 'Youtube',
  dateStrings : true
});

module.exports = connection;