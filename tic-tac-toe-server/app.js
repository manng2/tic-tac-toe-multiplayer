const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5500'
  },
  pingInterval: 10000,
  pingTimeout: 60000
});

app.get('/', (req, res) => {
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('disconnected');
  })

  socket.on('join', () => {
    console.log('joined');
  })

  socket.on('select-cell', data => {
    console.log(data);

    io.emit('select-cell', data);
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
