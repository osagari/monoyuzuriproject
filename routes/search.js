// express 読み込み
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

async function getimg() {
    const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            resolve(connection);
        });
    });

    const rows = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM img_table', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    return rows;
} // ここに追加

async function searchByKeyword(keyword) {
    const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            resolve(connection);
        });
    });

    const rows = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM img_table`, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    const searchData = [];

    for (const row of rows) {
        const nameData = await getname(row.mono_id);
        if (nameData[0].mono_name.includes(keyword)) {
            searchData.push({ ...row, mono_name: nameData[0].mono_name });
        }
    }

    return searchData;
} // ここに追加

async function getname(id) {
    const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            resolve(connection);
        });
    });

    const rows = await new Promise((resolve, reject) => {
        connection.query(`SELECT mono_name FROM product_table WHERE mono_id=${id}`, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    return rows;
}

// /search
router.get("/search", async (req, res, next) => {
    try {
        const keyword = req.query.keyword; // 検索キーワードをクエリパラメータから取得

        if (!keyword) {
            // キーワードが指定されていない場合は全データを表示
            const imgData = await getimg();
            res.render("../views/search", { mono_data: imgData });
        } else {
            // キーワードが指定されている場合は該当するデータを表示
            const searchData = await searchByKeyword(keyword);
            res.render("../views/search", { mono_data: searchData });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
