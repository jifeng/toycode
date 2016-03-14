// var server = require('http').createServer(function(req, res, next){
// 	res.statusCode = 200;
// 	res.end("hello world");
// });
// var io = require('socket.io')(server);
// io.on('connection', function(socket){
//   socket.on('event', function(data){
//   	console.log('data', data);
//   });
//   socket.on('disconnect', function(){
//   	console.log('disconnect');
//   });
// });
// server.listen(8080, '0.0.0.0');


var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8080;

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('ws', ws);
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });