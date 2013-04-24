var http = require('http');

var w1count = 0;
var w2count = 0;
exports.w1 = http.createServer(function (req, res, next) {
  res.end('work1 is working, ' + w1count++);
});

exports.w2 = http.createServer(function (req, res, next) {
  res.end('work2 is working, ' + w2count++);
});
