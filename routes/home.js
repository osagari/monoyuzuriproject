//express 読み込み
const express = require('express');

//router
const router = express.Router();

const mysql = require('mysql');

//dotenv読み込み
const dotenv = require('dotenv');
const dbinfo = dotenv.config();

//取得してきたデータを格納するために使う
let newmono_data = null;

//データベースとの接続プール
//config()のオブジェクト.parsed -> json形式で記述の意
const pool = mysql.createPool({
    connectionLimit: dbinfo.parsed.CCL,
    host: dbinfo.parsed.HOSTNAME,
    user: dbinfo.parsed.DBUSER,
    password: dbinfo.parsed.PASSWORD,
    database: dbinfo.parsed.DBNAME
});

// /home
router.get("/home",(req,res)=>{
    
    pool.getConnection((err,connection)=>{
        if(err) throw err; //接続失敗時に例外を出す
        
        console.log("接続が完了しました");

        const sql='SELECT * FROM img_table WHERE mono_id IS NOT NULL';
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(err){
                console.log(err);
            }

            newmono_data = rows;
        });
    });

    //home.ejsファイルを描画
    res.render("../views/home",{mono_data:newmono_data});
});


module.exports = router;