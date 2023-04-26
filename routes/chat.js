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

//チャットルームを作成する関数
//引数: id: パスパラメータに指定されたid
async function create_chatroom(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{    
        connection.query(`INSERT INTO chatroom_table(mono_id,creation_time) VALUES (${id},now())`,(err,rows)=>{
            connection.release();            
                if(err) reject(err);//sql文でエラー
                resolve(rows);
        });
    });

    return rows.insertId; //作成したチャットルームのidを返す
}

//指定されたidの物の商品名を取得する関数
//引数: id: データ挿入時のmono_id
async function getname(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        //指定のidであったら商品テーブルの物の名前を取得するsql
        connection.query(`SELECT mono_name FROM product_table WHERE mono_id=${id} LIMIT 1`,(err,rows)=>{
            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    return rows;
}

//指定されたidでチャットルームの作成時間(商品取引開始時間)を取得する関数
//引数: id: チャットルーム作成時のchatroom_id
async function gettime(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        connection.query(`SELECT creation_time FROM chatroom_table WHERE chatroom_id=${id}`,(err,rows)=>{
            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    return rows;
}

//
router.get("/chat/:mono_id",(req,res)=>{
 
    (async () => {
        const chatroom_id = await create_chatroom(req.params.mono_id);
        console.log(chatroom_id);
        res.redirect(`/chat/${req.params.mono_id}/${chatroom_id}`); //作成したチャットルームにリダイレクト
    })();
});

router.get("/chat/:mono_id/:chat_id",(req,res)=>{

    (async () => {
        //商品名の取得
        const mono_name = await getname(req.params.mono_id);

        //チャットルーム作成時間の取得
        const start_time = await gettime(req.params.chat_id);

        //ここから整形処理
        const timedate = start_time[0].creation_time.split(" ");//(半角スペースを区切り文字として日付と時間に分ける)
        const ymd = timedate[0].split("-");//年月日のデータを整形する(-を区切り文字として年月日に分ける)
        const ymdcharset = ["年","月","日"];//年月日、一文字だけの配列
        let formatstrs = []; //ハイフンを抜きにした日付を保持する
        for(let i = 0;i < ymd.length; i++){
            const str = ymd[i] + ymdcharset[i]; //数値に年月日の文字を加えた文字列を作成
            formatstrs.push(str); //配列に追加
        }

        console.log(formatstrs); //yyyy年,mm月,dd日の形の配列
        console.log(timedate[1]); //時刻
        res.render("../views/chat",{mono:mono_name,ymd:formatstrs,time:timedate[1]});
    })();
});

module.exports = router;