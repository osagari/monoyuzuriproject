//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /new
router.get("/new",(req,res) => {
    res.render("../views/new");
});

<<<<<<< HEAD
<<<<<<< HEAD
// /new/result
router.get("/new/result",(req,res)=>{
    res.render("../views/uploadreult");
=======
=======
>>>>>>> 8036d39bfa8b6209fc7d3cfdd69d2b4930fcd260
//投稿するときのpost(submitのボタンが押されたら呼ばれる)
router.post("/new", (req,res) =>{

    if(!req.files) return res.status(400).render("../views/new",{imgerror:true});

    let imgFile = req.files.monoimg;
    let imgfilepath = `./uploaded-img/${imgFile.name}`;
    patharray.push(imgfilepath); //配列に追記する
    for (let i in patharray){
        console.log(patharray[i]); //パスを確認
    }

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err); //空のレスポンスを返さないためにreturn
        }
        res.render("../views/uploadresult");
    });
<<<<<<< HEAD
>>>>>>> 739836d4f8fafa2f2c8ba20f406209996755b558
=======
>>>>>>> 8036d39bfa8b6209fc7d3cfdd69d2b4930fcd260
});

//他のファイルから参照できるようにする
module.exports = router;