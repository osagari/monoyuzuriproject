//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /home
router.get("/home",(req,res)=>{
    res.render("../views/home");
});

module.exports = router;