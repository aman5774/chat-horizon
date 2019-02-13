const express = require('express');
const socket = require('socket.io');

// setting up the app
const app = express();

const PORT = 4000;
const server = app.listen(PORT, function(){
  console.log(`Listening to requests on port ${PORT}`);
});

// serving static files
app.use(express.static('public'));

// socket setup
const io = socket(server);

io.on('connection', function(socket){
  console.log(`Socket connection made with ID ${socket.id}`);

  // listen to chat message
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  // listen to typing message
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
});
