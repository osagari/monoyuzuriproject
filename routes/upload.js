//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /home
router.get("/upload",(req,res)=>{
    
    //home.ejsファイルを描画
    res.render("../views/upload");
});


module.exports = router;