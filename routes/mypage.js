//express 読み込み
const express = require('express');

//router
const router = express.Router();

router.get("/mypage",(req,res)=>{
    res.render("../views/mypage");
});

//お気に入り
router.get("/mypage/fav",(req,res)=>{
    res.render("../views/favorite");
});

router.get("/mypage/posted",(req,res)=>{
    switch(req.query.select){
        case "posting": //投稿中
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
    res.render("../views/detail");
});

//マイページ編集用ページ
router.get("/mypage/detail/:mono_id/edit", (req,res) =>{
    res.render("../views/edit",{imgerror:false});
});

router.post("/mypage/detail/:mono_id/edit", (req,res) =>{

    if(!req.files) return res.status(400).render("../views/edit",{imgerror:true});

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
});

module.exports = router;