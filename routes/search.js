const express = require('express');

//router
const router = express.Router();

// /search
router.get("/search",(req,res)=>{
    console.log(req.query.query); //入力された内容を出力
    res.render("../views/search");
});
module.exports = router;