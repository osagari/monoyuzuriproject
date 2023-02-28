//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /new
router.get("/new",(req,res) => {
    res.render("../views/new");
});

<<<<<<< HEAD
//投稿するときのpost(submitのボタンが押されたら呼ばれる)
router.post("/new", (req,res) =>{

    if(!req.files) return res.status(400).render("../views/new",{imgerror:true});

    let imgFile = req.files.monoimg;
    let imgfilepath = `./uploaded-img/${imgFile.name}`;
    patharray.push(imgfilepath); //配列に追記する

    //画像ファイルの場所指定設定
    imgFile.mv(imgfilepath,(err) =>{
        if(err) {
            return res.status(500).send(err); //空のレスポンスを返さないためにreturn
        }
        res.render("../views/uploadresult");
    });
=======
// /new/result
router.get("/new/result",(req,res)=>{
    res.render("../views/uploadreult");
>>>>>>> routingbranch
});

//他のファイルから参照できるようにする
module.exports = router;