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
    res.render("../views/mypage");
});

//マイページ編集用ページ
router.get("/mypage/detail/:mono_id/edit",(req,res)=>{
    res.render("../views/mypage");
});

module.exports = router;