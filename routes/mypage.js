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

//投稿状態を表すオブジェクト
const post_state = Object.freeze({
    posting: 0, //投稿中
    deal: 1, //取引中
    pastdeal: 2 //過去の取引
});

//指定された投稿状態のidと商品名を取得する
//引数: state 投稿状態のオブジェクト
async function getpost_name_ids(state){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{

        connection.query(`SELECT mono_id,mono_name FROM product_table WHERE post_state=${state}`,(err,rows)=>{
            connection.release();            
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        });
    });

    return rows;
}

//画像テーブルから指定のidであれば、パスを持った配列を取得する関数
//引数 id: 指定のidの数値
async function getimgpaths(id){
    const connection = await new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err); //接続失敗時
            resolve(connection); 
        });
    });

    const rows = await new Promise((resolve,reject)=>{
        connection.query(`SELECT img_path FROM img_table WHERE mono_id=${id}`,(err,rows)=>{
            if(err) reject(err);//sql文でエラー
            resolve(rows);
        }); 
    });

    //console.log(rows);
    return rows;
}


router.get("/mypage",(req,res)=>{
    res.render("../views/mypage");
});

//お気に入り
router.get("/mypage/fav",(req,res)=>{
    res.render("../views/favorite");
});

router.get("/mypage/posted",(req,res)=>{
    switch(req.query.select){ //クエリパラメータのselectの値が設定されているなら
        case "posting": //投稿中
        (async () => {
            //投稿中のidと商品名を取得
            const post_name_ids = await getpost_name_ids(post_state.posting);

            //オブジェクトではなくidの数値だけの配列を作る
            const idarr = post_name_ids.map(element => {
                return element.mono_id;
            });
            
            let postimg_paths = [];
            for (const idele of idarr){

                //配列の中に配列を作らないようにapplyを書く
                postimg_paths.push.apply(postimg_paths,await getimgpaths(idele)); 
            }

            //取得したデータをejsファイルに(postdataは配列の要素一つ一つがオブジェクト、postpathsは配列)
            res.render('../views/posting',{postdata: post_name_ids,postpaths: postimg_paths});
        })();
        break;

        case "deal": //取引中
        case "pastdeal": //過去の取引のどれかなら
            res.render(`../views/${req.query.select}`);
        break;

        //例外
        default:
            res.status(404).send();
            break;
    }
});

//マイページ物詳細ページ
router.get("/mypage/detail/:mono_id",(req,res)=>{
    res.render("../views/mypagedetail");
});

//マイページ編集用ページ
router.get("/mypage/detail/:mono_id/edit", (req,res) =>{
    res.render("../views/edit",{imgerror:false});
});

router.post("/mypage/detail/:mono_id/edit", (req,res) =>{

    if(!req.files) return res.status(400).render("../views/edit",{imgerror:true});

    let imgFile = req.files.monoimg;
    let imgfilepath = `./uploaded-img/${imgFile.name}`;

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err); //空のレスポンスを返さないためにreturn
        }
        res.render("../views/uploadresult");
    });
});

module.exports = router;