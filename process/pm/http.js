var http = require('http').createServer(function (req, res) {
 res.end('hello world');
});

require('pm').createWorker().ready(function (socket, port) {
 http.emit('connection', socket);
});