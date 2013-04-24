
var proxy = require('./proxy');
var worker = require('./work');

proxy.listen(1723, function () {
  console.log('proxy is listening');
});

var w1 = worker.w1;
var w2 = worker.w2;

w1.listen(1823);
w2.listen(1923);