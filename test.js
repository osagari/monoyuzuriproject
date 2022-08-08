//httpモジュールを利用する
const port = 3000;//ポート番号
const http = require("http");

const server = http.createServer((request,response) =>{
    //ヘッダー情報
    response.writeHead(200,{"Content-Type":"text/html"});

    //レスポンス
    const responseMessage = "<h1>Hello Node.js<h1>";
    response.write(responseMessage);
    response.end();

    console.log(`Sent a response : ${responseMessage}`);
});

server.listen(port);
console.log(`The server has started. port number:${port}`);