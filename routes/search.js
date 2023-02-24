const express = require('express'); //express 読み込み
const mysql = require('mysql');

//router
const router = express.Router();

// mysqlとの接続情報
/*const dbinfo = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monoyuzuri_db'
});

dbinfo.connect((err) =>{
    if(err) throw err;//接続エラーとなったら例外を出す
    console.log('database is connectied.'); 
    let sql = "select student_num from user";//sql文

    //クエリ文で学籍番号を取得
    dbinfo.query(sql,(err,result,fileds)=>{
        if(err) throw err;
        console.log(result); //取得してきたデータはjson形式
    });
});*/

// /search
router.get("/search",(req,res)=>{
    console.log(req.query.str);
    res.render("../views/search");
});

module.exports = router;