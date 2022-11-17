const express = require('express');
const app = express()
const port = 3000

//htmlファイルなどの静的ファイル読み込み
app.use(express.static('public'))

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/public/move.html')
})

app.listen(port,() => {
    console.log('server start')
})