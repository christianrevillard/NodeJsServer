module.exports = function (socket) {

  console.log(socket.id + ' is now connected to our custom handler');

  socket.on('disconnect', function () { console.log('Bye ' + socket.id + ' !'); });
};
