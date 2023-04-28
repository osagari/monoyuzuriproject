const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    connectionLimit: process.env.CCL,
    host: process.env.HOSTNAME,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    timezone: "jst",
    charset: "utf8mb4"
});

router.get('/search', (req, res) => {
    const keyword = req.query.query; // 入力されたキーワードを取得
    const sql = `SELECT * FROM product_table WHERE mono_name LIKE '%${keyword}%'`; // 入力されたキーワードを含むデータを取得するSQLクエリ
  
    pool.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render('search', { results: results });
    });
});

module.exports = router;