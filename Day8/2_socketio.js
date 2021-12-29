const express = require('express');
const logger = require('morgan');
const static = require('serve-static');
const path = require('path');
const socketio = require('socket.io');

const app = express();

app.use(logger('dev'));
app.use('/public', static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});

const io = socketio(server);

io.sockets.on('connection', (socket) => {
    console.log(`connection : ${socket.request.connection._peername}`);
    socket.remoteAddress = socket.request.connection._peername.address;
    console.log(`socket.remoteAddress : ${socket.remoteAddress}`);
    socket.remotePort = socket.request.connection._peername.port;
    console.log(`socket.remotePort : ${socket.remotePort}`);

    socket.on('message', function(message){
        console.log(`message 이벤트를 받았습니다`);
        console.dir(message);
        io.sockets.emit('message', message);
    });
});




