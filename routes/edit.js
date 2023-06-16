//express 読み込み
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
    timezone: "jst",
    charset: "utf8mb4" //文字化け対策の指定
});

//指定されたidの物の商品名を取得する関数
//引数: id: データ挿入時のid
async function getname(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        //指定のidであったら商品テーブルの物の名前を取得するsql
        connection.query(`SELECT mono_name FROM product_table WHERE mono_id=${id}`,(err,rows)=>{
            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    //console.log(rows);
    return rows;
}


// /edit
router.get("/edit",(req,res)=>{

      //即時関数で非同期実行
      (async () =>{
        await getimg();
        
        //home.ejsファイルを描画
        res.render("../views/home",{mono_data:newmono_data});
    })();

    res.render("../views/edit");
});


module.exports = router;