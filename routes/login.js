//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /login
router.get("/login",(req,res) => {
    res.render("../views/login");
});

// /login/terms
router.get("/login/terms",(req,res) =>{
    res.render("../views/terms");
});

// /login/privacy
router.get("/login/privacy",(req,res) =>{
    res.render("../views/privacy");
});


//他のファイルから参照できるようにする
module.exports = router;