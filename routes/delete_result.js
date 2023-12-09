//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /home
router.get("/delete_result",(req,res)=>{

    res.render("../views/delete_result");
});


module.exports = router;