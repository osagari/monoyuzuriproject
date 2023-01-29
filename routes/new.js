//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /new
router.get("/new",(req,res) => {
    res.render("../views/new");
});

// /new/result
router.get("/new/result",(req,res)=>{
    res.render("../views/uploadreult");
});

//他のファイルから参照できるようにする
module.exports = router;