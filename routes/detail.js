//express 読み込み
const express = require('express');

//router
const router = express.Router();

router.get("/detail/:mono_id",(req,res)=>{
    //ejsファイルにmono_idを渡す
    res.render("../views/detail",{detail_id:req.params.mono_id});
});

module.exports = router;