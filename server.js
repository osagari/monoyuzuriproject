//expressの読み込み
const express = require('express');

const app = express();
const port = 3000;

//ログイン用
const LoginRouter = require('./routes/login');

//ejsテンプレートエンジン設定部分
app.set('view engine','ejs');

//Loginrouter読み込み
app.use(LoginRouter);

//サーバ起動
app.listen(port,() => console.log(`サーバが起動しました.ポート番号は${port}です.`));