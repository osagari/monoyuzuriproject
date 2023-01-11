const express = require('express');
const router = express.Router();

router.get("/",(reqest,response) =>{
    response.send("ユーザ部分です");
});

router.get("/info",(request,response) =>{
    response.send("ユーザ情報です");
});

//適当なidを取得
router.get("/:id",(request,reponse)=>{
    reponse.send(`${request.params.id}のユーザ情報です`);
});

//他のファイルで使えるようにする
module.exports = router;