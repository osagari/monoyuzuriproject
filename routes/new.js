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
    connectionLimit: 2,
    host: dbinfo.parsed.HOSTNAME,
    user: dbinfo.parsed.DBUSER,
    password: dbinfo.parsed.PASSWORD,
    database: dbinfo.parsed.DBNAME,
    timezone: "jst"
});

//投稿状態を表すオブジェクト
const post_state = Object.freeze({
    posting: 0, //投稿中
    deal: 1, //取引中
    pastdeal: 2 //過去の取引
});

//idと画像ファイルパスを挿入する関数
//引数path: ファイルパス
async function insertimg(path){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{
        connection.query(`INSERT INTO img_table(img_path) VALUES ("${path}")`,(err,rows)=>{
            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    console.log(rows);
    //connection.release();
    return rows.insertId;//挿入したときのidを返す
}

//商品テーブルにデータを挿入する関数
//引数 id: mono_idの値(画像挿入時のid) product_info: 物の名前と説明を保持したオブジェクト
async function insert_product(id,product_info){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{
        connection.query(`INSERT INTO product_table(mono_name,mono_explanation,mono_id,post_time,update_time,post_user,post_state) VALUES ("${product_info.mononame}","${product_info.monoexplan}",${id},now(),now(),"ht21a023",${post_state.posting})`,(err,rows)=>{
            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    console.log(rows);
    //connection.release();
}

// /new
router.get("/new",(req,res) => {
    res.render("../views/new",{imgerror:false});
});

//投稿するときのpost(submitのボタンが押されたら呼ばれる)
router.post("/new",(req,res) =>{

    //画像ファイルが選択されていないとき
    if(!req.files) return res.render("../views/new",{imgerror:true});

    const imgFile = req.files.monoimg;
    const imgdb_filepath = `/uploaded-img/${imgFile.name}`; //DBに格納するファイルパス名
    const imgfilepath = `./public${imgdb_filepath}`;

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err);
        }
        res.render("../views/uploadresult");
    });

    //即時関数で非同期実行
    (async () =>{
        const insertId = await insertimg(imgdb_filepath);
        await insert_product(insertId,req.body);
        pool.end();//プロセス終了
    })();
});

//他のファイルから参照できるようにする
module.exports = router;