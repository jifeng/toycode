var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('data', function (data) {
    console.log(data.toString());
  });
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(8124, function(err) { //'listening' listener
  console.log(err);
  console.log('8124 server bound');
});

process.on('SIGINT', function () {
  console.log('closing');
  server.close(function () {
    console.log('closed');
    process.exit()
  });
});
// server.listen(8125, function(err) { //'listening' listener
//   console.log(err);
//   console.log('8125 server bound');
// });