//express 読み込み
const express = require('express');

//router
const router = express.Router();

// /home
router.get("/edit",(req,res)=>{

    res.render("../views/edit");
});


module.exports = router;