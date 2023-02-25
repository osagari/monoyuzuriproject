const express = require('express');

//router
const router = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
router.use(bodyparser.urlencoded({extended: false}));
router.use(bodyparser.json());
router.use(logger);

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

=======
>>>>>>> 739836d4f8fafa2f2c8ba20f406209996755b558
=======
>>>>>>> 8036d39bfa8b6209fc7d3cfdd69d2b4930fcd260
// /search
router.get("/search",(req,res)=>{
    console.log(req.query.word); //入力された内容を出力
    res.render("../views/search");
});
<<<<<<< HEAD
<<<<<<< HEAD

//urlを表示するログ
function logger(req,res,next){
    if(req.originalUrl !== undefined){
        console.log(req.originalUrl);
    }
    next();
}

=======
>>>>>>> 739836d4f8fafa2f2c8ba20f406209996755b558
=======
>>>>>>> 8036d39bfa8b6209fc7d3cfdd69d2b4930fcd260
module.exports = router;