//expressの読み込み
const express = require('express');

const app = express();
const port = process.env.PORT || 3000; //ポート番号

//ログイン用
const LoginRouter = require('./routes/login');

//homeからのルータ
const HomeRouter = require('./routes/home');

const newRouter = require('./routes/new');

const detailRouter = require('./routes/detail');

const mypageRouter = require('./routes/mypage');

const serachRouter = require('./routes/search');

const chatRouter = require('./routes/chat');

//静的ファイル設定
app.use(express.static('public'));
app.use(express.static('uploaded-img'));

//ejsテンプレートエンジン設定部分
app.set('view engine','ejs');

//Router類読み込み
app.use(LoginRouter);
app.use(HomeRouter);
app.use(newRouter);
app.use(detailRouter);
app.use(mypageRouter);
app.use(serachRouter);
app.use(chatRouter);

app.get("/",(req,res)=>{

    //localhostにアクセスしたら一旦loginにリダイレクト
    res.redirect('/login');
});

//サーバ起動
app.listen(port,() => console.log(`サーバが起動しました.ポート番号は${port}です.`));