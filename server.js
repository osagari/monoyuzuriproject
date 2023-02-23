//expressの読み込み
const express = require('express');

const app = express();
const port = 3000;
const UserRouter = require('./routes/user');

//ミドルウェアの読み込み
app.use(logger);

//ejsテンプレートエンジン設定部分
app.set('view engine','ejs');


//localhostのとき
app.get("/", (request, response) => {
    //response.send('大元のページです');
    
    //ejsを読み込んで表示
    response.render("index",{text: "Node.jsとexpress"})
});

//ルーティング部分
app.use("/user",UserRouter);

//存在しないとき
app.get('*',(request,response) =>{
    response.send(404,'お探しのページが見つかりませんでした');
});

//仲介役のミドルウェア(認証などの管理を行う?)
function logger(request,response,next){
    console.log(request.originalUrl);
    next();
}

app.listen(port,() => console.log(`サーバが起動しました.ポート番号は${port}です.`));