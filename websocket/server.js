var app = require('connect')();
// app.use(function(req, res, next) {
// 	console.log('http connect');
//   res.statusCode = 200;
//   res.end("hello world");
// });
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){ 
  console.log('io connect');
});
server.listen(3000);