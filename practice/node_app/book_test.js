//http通信用のオブジェクト
const http = require('http');

//ファイルを読み込むためのfsオブジェクト
const fs = require('fs');

//ejs読み込み
const ejs = require('ejs');

//htmlテンプレート
const index_page = fs.readFileSync('./index.ejs','utf-8'); 

//otherテンプレート
const other_page = fs.readFileSync('./other.ejs','utf-8');

//css読み込み
const style_css = fs.readFileSync('./style.css','utf-8');

//ルーティングのためのurlオブジェクト(クライアントのアドレスを識別)
const url = require('url');

//関数の切り分けをしてみる
var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start.');
//-----ここまでメイン-------


//getFromClient関数でcreateServerの処理
function getFromClient(request,response){

    //urlをパース(解析)してファイルパスを得る
    var url_parts = url.parse(request.url);
    switch(url_parts.pathname){
        
        //区切り文字が見つかったとき
        case '/':
            var content = ejs.render(index_page,{
                title:"Index",
                content: "これはテンプレート使ったサンプルページです。",
            });       
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
        
        //cssファイルパスが見つかったとき
        case '/style.css':
            response.writeHead(200,{'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;
        
        //otherテンプレートなら
        case '/other.ejs':
            var content = ejs.render(other_page,{
                title:"Other",
                content: "これは新しく用意したページです。",
            });       
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;

        //例外
        default:
            response.writeHead(200,{'Content-Type': 'text/plain'});
            response.end('Plase I am sorry! no page...');
            break;
    }
}