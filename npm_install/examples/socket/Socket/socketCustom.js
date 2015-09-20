module.exports = function (socket) {
 

  console.log(socket.id + ' is now connected to our custom handler');

  socket.on('disconnect', function () { console.log('Bye ' + socket.id + ' !'); });
};


// how to place a good common stuff like this? is it possible, actual,..

//setInterval(
//  function () {
//    server.socket('/Socket/mySocket').emit('message', 'message sent every second...');
//  },
//  1000);
