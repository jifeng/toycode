"use strict"
const http = require('http');

const port = process.env.port
var app = http.createServer(function (req, res, next) {
  res.statusCode = 200;
  res.end('hello world');
});


app.listen(port, function () {
  console.log('server is listening');
});


process.on("message", function (options) {
  console.log('workers message');
});
