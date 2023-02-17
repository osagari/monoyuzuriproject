//express 読み込み
const express = require("express");

//router
const router = express.Router();

// /home
router.get("/home",(req,res)=>{
    
    //home.ejsファイルを描画
    res.render("../views/home",{title:"home"});
});

module.exports = router;