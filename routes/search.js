const express = require('express');

//router
const router = express.Router();

const mysql = require('mysql');

//dotenv読み込み
const dotenv = require('dotenv');
const dbinfo = dotenv.config();



//データベースとの接続プール
//config()のオブジェクト.parsed -> json形式で記述の意
const pool = mysql.createPool({
    connectionLimit: dbinfo.parsed.CCL,
    host: dbinfo.parsed.HOSTNAME,
    user: dbinfo.parsed.DBUSER,
    password: dbinfo.parsed.PASSWORD,
    database: dbinfo.parsed.DBNAME,
    timezone: "jst" ,
    charset: "utf8mb4"
});
// /search
router.get("/search",(req,res)=>{
    console.log(req.query.word);
    pool.getConnection((err,connection)=>{
        if(err) throw err; //接続失敗時に例外を出す
        
        console.log("接続が完了しました");

        const sql='SELECT * FROM img_table';
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(err){
                console.log(err);
            }
            console.log(rows[0].img_path);
            
        });
    });

    pool.getConnection((err,connection)=>{
        if(err) throw err; //接続失敗時に例外を出す
        
        console.log("タイトル名の接続が完了しました");

        const sql='SELECT mono_name FROM product_table';
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(err){
                console.log(err);
            }
            console.log(rows[0].mono_name);
            
        });
    });
    res.render("../views/search",{path:});
});
module.exports = router;