//express 読み込み
const express = require('express');

//router
const router = express.Router();

router.get("/detail/:mono_id",(req,res)=>{
    res.render("../views/detail");
    console.log(req.params.mono_id);
});

module.exports = router;