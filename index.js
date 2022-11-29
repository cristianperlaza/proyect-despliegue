const express = require("express");
//const { createServer } = require("http");
const { Server: HttpServer } = require("http");
//const { Server } = require("socket.io");
const { Server: IOServer } = require("socket.io");
const { CLIENT_RENEG_LIMIT } = require("tls");
const { SerialPort } = require('serialport');
const port = new SerialPort({ path: 'COM10', baudRate: 9600 })

const app = express();
const httpServer = new HttpServer(app);
//const httpServer = createServer(app);
//const io = new Server(httpServer, { cors: { origin: "*" } });
const io = new IOServer(httpServer, { cors: { origin: "*" } });

app.use(express.static('public'));
port.read()

port.on('data', (data) => {
    console.log(data.toString())
    io.emit('data', data.toString())
});


/* io.on("connection", (socket) => {
    console.log("coonected")
    socket.emit("data", "levantamiento");

    socket.on('temp', (data) => {
        console.log(data);
    }); 

}); */

const server = httpServer.listen(8000, ()=>{
    console.log("server running")
});
