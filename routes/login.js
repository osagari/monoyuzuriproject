//express 読み込み
const express = require('express');

//router
const router = express.Router();

// login
router.get("/",(req,res) => {
    res.render("../views/login");
});

// login/terms
router.get("/terms",(req,res) =>{
    res.render("../views/terms");
});

// login/privacy
router.get("/privacy",(req,res) =>{
    res.render("../views/privacy");
});

//他のファイルから参照できるようにする
module.exports = router;