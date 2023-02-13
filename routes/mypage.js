//express 読み込み
const express = require('express');

//router
const router = express.Router();

router.get("/mypage",(req,res)=>{
    res.render("../views/mypage");
    console.log(req.params.mono_id);
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

module.exports = router;