const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
const dbinfo = dotenv.config();

const pool = mysql.createPool({
    connectionLimit: dbinfo.parsed.CCL,
    host: dbinfo.parsed.HOSTNAME,
    user: dbinfo.parsed.DBUSER,
    password: dbinfo.parsed.PASSWORD,
    database: dbinfo.parsed.DBNAME,
    timezone: "jst",
    charset: "utf8mb4"
});