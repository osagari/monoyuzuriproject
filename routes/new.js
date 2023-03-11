//express 読み込み
const express = require('express');

//fileuploadのモジュール読み込み
const fileupload = require('express-fileupload');

const mysql = require('mysql');

//dotenv読み込み
const dotenv = require('dotenv');
const dbinfo = dotenv.config();

//router
const router = express.Router();

//使うことを宣言
router.use(fileupload());

//データベースとの接続プール
//config()のオブジェクト.parsed -> json形式で記述の意
const pool = mysql.createPool({
    connectionLimit: dbinfo.parsed.CCL,
    host: dbinfo.parsed.HOSTNAME,
    user: dbinfo.parsed.DBUSER,
    password: dbinfo.parsed.PASSWORD,
    database: dbinfo.parsed.DBNAME
});

// /new
router.get("/new",(req,res) => {
    res.render("../views/new",{imgerror:false});
});

//投稿するときのpost(submitのボタンが押されたら呼ばれる)
router.post("/new", (req,res) =>{

    if(!req.files) return res.render("../views/new",{imgerror:true});

    let imgFile = req.files.monoimg;
    let imgdb_filepath = `/uploaded-img/${imgFile.name}`; //DBに格納するファイルパス名
    let imgfilepath = `./public${imgdb_filepath}`;

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err);
        }
        res.render("../views/uploadresult");
    });

    //接続してid,画像ファイルパスを挿入する
    pool.getConnection((err,connection)=>{
        if(err) throw err; //接続失敗時に例外を出す
        
        console.log("接続が完了しました");

        //text varchar型だと変数だとしてもダブルコーテーションで繰らないといけないことに注意
        const sql=`INSERT INTO img_table(img_path) VALUES ("${imgdb_filepath}")`;
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(err){
                console.log(err);
            }

            //一応挿入時のidを確認用に出力
            console.log(rows.insertId);
        });
    });
});

//他のファイルから参照できるようにする
module.exports = router;