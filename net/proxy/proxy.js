var net = require('net');
var worker = require('./work');

var w1 = worker.w1;
var w2 = worker.w2;

w1.listen(1823);
w2.listen(1923);

var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('data', function (data) {
    // console.log(data.toString());
    console.log('read:' + c.read(4096));
  });
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.on('readable', function () {
    // console.log(c.read(4096));
    console.log('read:' + c.read(4096));
  });
  var loc = net.connect({port: 1823}, function() {
    // loc.pipe(c);
  });
  // c.pipe(loc);
});

server.listen(1723, function () {
  console.log('proxy is listening');
});