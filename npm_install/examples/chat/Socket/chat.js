module.exports = function (socket) {
  console.log('user connected');
  
  socket.broadcast.emit('message', socket.id + ' says: Hi !');
  
  socket.emit('message', 'Welcome, you are ' + socket.id);
  
  socket.on('disconnect', function () {
    socket.broadcast.emit('message', socket.id + ' says: Bye !');
    console.log('user disconnected');
  });
  
  socket.on('message', function (msg) {
    console.log('message: ' + msg);
    socket.broadcast.emit('message', socket.id + ' says: ' + msg);
    socket.emit('message', 'You said: ' + msg);
  });
};
