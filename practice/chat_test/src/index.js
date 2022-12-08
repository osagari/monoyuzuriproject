const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.Server(app);

//初期化部分
const io = socketIo(server);


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000 , () => {
    console.log('listening start 3000');
});

//クライアントと繋がったら
io.on('connection',(socket) =>{
    console.log('connected');

    socket.on('sendMessage',(message) =>{
        console.log('message has been sent',message);

        io.emit('receiveMessage',message);
    });
});