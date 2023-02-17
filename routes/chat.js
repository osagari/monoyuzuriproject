//express 読み込み
const express = require('express');

//router
const router = express.Router();

router.get("/chat/:mono_id/:chat_id",(req,res)=>{

    //タイトルとidをejsに渡す
    res.render("../views/chat",{title:"chat",
                                ids:{mono_id: req.params.mono_id, chat_id: req.params.chat_id}});
});

module.exports = router;