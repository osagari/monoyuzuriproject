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
        const keyword = req.query.query; // 検索キーワードをクエリパラメータから取得
        
        if (!keyword) {
            // キーワードが指定されていない場合は「データがありません」の文字を表示
            res.render("../views/search", { mono_data: "データがありません" });
        } else {
            const imgData = await getimg();

            // imgData の各要素に対して商品名を取得して新しいプロパティを追加
            const imgDataWithNames = await Promise.all(imgData.map(async (imgItem) => {
                const nameData = await getname(imgItem.mono_id);
                return {
                    ...imgItem,
                    mono_name: nameData[0].mono_name, // 商品名を新しいプロパティに追加
                };
            }));
            

            // キーワードが指定されている場合は該当するデータを表示
            // const searchData = await searchByKeyword(keyword);
            res.render("../views/search", { mono_data: imgDataWithNames });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
