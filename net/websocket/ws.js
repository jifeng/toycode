var qws = require('qws');
var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer(function (req, res) {
  res.end('hello world');
});

w = qws.createServer(server, function(data, msg) {
  console.log('websocket ..........', data);
  // msg.close();
  msg.write('Get : ' + data);
});

server.listen(1337, function() {
  var WebSocket = require('ws');
  var ws = new WebSocket('ws://localhost:1337/ws');
  ws.on('open', function() {
    ws.send('something');
  });
  ws.on('message', function(data, flags) {
    console.log(data, flags);
      // flags.binary will be set if a binary data is received
      // flags.masked will be set if the data was masked
  });

  // var options = {
  //   port: 1337,
  //   hostname: '127.0.0.1',
  //   path: 'ws://localhost:1337/ws',
  //   headers: {
  //     'Connection': 'Upgrade',
  //     'Upgrade': 'websocket',
  //     'Sec-WebSocket-Version': 13,
  //     'Sec-WebSocket-Key': 'AClaoyJTMDHvUDlLrKDWJw=='
  //   }
  // };
  // console.log(options);
  
  // // var req = http.request(options, function (res) {

  // // });
  // // req.write('hell world');
  // // req.end();
  // var req = http.request(options);
  // req.on('upgrade', function(res, socket, upgradeHead) {
  //   console.log('got upgraded!');
  //   res.on('data', function (data) {
  //     console.log('client data', data);
  //   });

  //   socket.end(JSON.stringify(ws.createFrame({data: 'hello world'})));
  // });

  // req.end();
});