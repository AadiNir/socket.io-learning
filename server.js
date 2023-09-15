const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(`user connect id ${socket.id}`);
    socket.on("send_message",(data)=>{
        //socket.broadcast.emit("receive_message",data)
        socket.to(data.room).emit("receive_message",data);
    })
    socket.on("join_room",(data)=>{
        socket.join(data);
    })
})
server.listen('3001',()=>{
    console.log("server is hosted");

})