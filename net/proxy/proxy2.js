var net = require('net');
var worker = require('./work');
var fs = require('fs');

var w1 = worker.w1;
var w2 = worker.w2;

var p1 = './work1.sock';
var p2= './work2.sock';

w1.listen(p1);
w2.listen(p2);

process.on('exit', function () {
  console.log('jfajofajpfajfapojpo');
  try {
    console.log('fjiaofjaiofhoiah');
    w1.close();
    w2.close();
  } catch (e) {
  }
});

var getHead = function (data) {
  if (Buffer.isBuffer(data)) {
    data = data.toString();
  }
  var arr = data.split('\r\n');
  var url = arr[0].split(' ')[1];
  var host = arr[1].split(':')[1];
  return {host: host.trim(), url: url.trim()};
};

var server = net.createServer(function(c) {
  var socket = undefined;
  var first = true;
  c.on('data', function (data) {
    console.log(data.toString());
    var obj = getHead(data);
    var p = p1;
    if (obj.host === 'www.work1.com') {
      p = p1;
    } else if (obj.host === 'www.work2.com') {
      p = p2;
    }
    if (first && !socket) {
      first = false;
      socket = net.connect(p, function() {
        socket.pipe(c);
      });
    }
    socket.write(data);
  });

  c.on('end', function() {
    socket.end();
    console.log('server disconnected');
  });
});

server.listen(1723, function () {
  console.log('proxy is listening');
});

setTimeout(function () {
  process.exit(0);
}, 10 * 1000)
