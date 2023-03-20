//express 読み込み
const express = require('express');

//fileuploadのモジュール読み込み
const fileupload = require('express-fileupload');

//router
const router = express.Router();

//使うことを宣言
router.use(fileupload());

// /new
router.get("/new",(req,res) => {
    res.render("../views/new",{imgerror:false});
});

//投稿するときのpost(submitのボタンが押されたら呼ばれる)
router.post("/new", (req,res) =>{

    if(!req.files) return res.render("../views/new",{imgerror:true});

    let imgFile = req.files.monoimg;
    let imgfilepath = `./uploaded-img/${imgFile.name}`;
    patharray.push(imgfilepath); //配列に追記する
    for (let i in patharray){
        console.log(patharray[i]); //パスを確認
    }

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err);
        }
        res.render("../views/uploadresult");
    });
});

//他のファイルから参照できるようにする
module.exports = router;