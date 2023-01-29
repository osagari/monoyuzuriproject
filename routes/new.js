//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /new
router.get("/new",(req,res) => {
    res.render("../views/new");
});

//他のファイルから参照できるようにする
module.exports = router;