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

//指定されたidの物の商品名と説明を取得する関数
//引数: id: パスパラメータに指定されたid
//戻り値: 物の商品名と説明のオブジェクト
async function get_name_exp(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        //指定のidであったら商品テーブルの物の名前と説明を取得するsql
        connection.query(`SELECT mono_name, mono_explanation FROM product_table WHERE mono_id=${id}`,(err,rows)=>{
            connection.release();            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    //rowsはオブジェクトを要素に持つ配列?...
    return rows;
}

//画像ファイルのパスを取得する関数
//引数 id: パスパラメータに指定されたid
async function get_imgpath(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        //指定のidであったら商品テーブルの物の名前と説明を取得するsql
        connection.query(`SELECT img_path FROM img_table WHERE mono_id=${id}`,(err,rows)=>{
            connection.release();            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    //接続開放
    //connection.release();

    //rowsはオブジェクトを要素に持つ配列?...
    return rows;
}

//コメントをデータベースに挿入する関数
//引数 text: コメントの内容 id: パスパラメータに指定されたid
async function insert_comment(text,id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    await new Promise((resolve,reject)=>{

        connection.query(`INSERT INTO comment_table(comment_time,comment_text,mono_id,student_num) VALUES (now(),"${text}",${id},"ht21a023")`,(err,rows)=>{
            connection.release();            
            if(err) reject(err);//sql文でエラー
            resolve();
        });
    });

    //console.log(rows);
    return;
}

//特定の商品のコメントを取得する関数
//引数 id: パスパラメータに指定されたid
async function get_comment(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        connection.query(`SELECT comment_text,student_num FROM comment_table WHERE mono_id=${id}`,(err,rows)=>{
            connection.release();            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    //接続開放
    //connection.release();

    return rows;
}

router.get("/detail/:mono_id",(req,res)=>{

     //即時関数で非同期実行
     (async () =>{
        //商品、コメント、画像の情報を取得
        const product_obj = await get_name_exp(req.params.mono_id);
        const comment_obj = await get_comment(req.params.mono_id);
        const imgpath = await get_imgpath(req.params.mono_id);

        //ejsファイルに取得した情報を渡す
        res.render("../views/detail",{mono:product_obj,comment:comment_obj,path:imgpath});
    })();   
});

router.post("/detail/:mono_id",(req,res) => {

    //即時関数で非同期実行
    (async () =>{
        //商品、コメント、画像の情報を取得
        const product_obj = await get_name_exp(req.params.mono_id);
        const comment_obj = await get_comment(req.params.mono_id);
        const imgpath = await get_imgpath(req.params.mono_id);
        
        //コメントの内容を取得
        const text = req.body.comment;

        //コメントをデータベースに挿入
        const result_comment= await insert_comment(text,req.params.mono_id);

        console.log(result_comment);
        //ejsファイルに取得した情報を渡す
        res.render("../views/detail",{mono:product_obj,comment:comment_obj,path:imgpath});
    })();
});

//エラー処理
router.get((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

module.exports = router;