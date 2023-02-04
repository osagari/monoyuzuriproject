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
    res.render("../views/mypage");
    console.log(req.params.mono_id);
});

router.get("/mypage/posted",(req,res)=>{
    res.render("../views/mypage",{selct:req.query.select});
    console.log(req.query.select);
});

router.get("/")


module.exports = router;