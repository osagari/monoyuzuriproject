//express 読み込み
const express = require('express');

//router
const router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());

patharray = [];

// /new
router.get("/new",(req,res) => {
    res.render("../views/new",{imgerror:false});
});

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
});

//他のファイルから参照できるようにする
module.exports = router;