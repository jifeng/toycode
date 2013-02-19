/*!
 * path - cookie/path
 * Copyright(c) 2012 jifeng
 * MIT Licensed
 */

var connect = require('connect');

var app = connect();
app.use('/test/index', function (req, res, next) {
  res.setHeader('Set-Cookie', 'cs=testindex; Max-Age=6307200000000; Path=/; Expires=Sat, 02 Jan 2213 09:34:50 GMT')
  // res.setHeader('Set-Cookie', 'cs=testindex; Max-Age=6307200000000; Expires=Sat, 02 Jan 2213 09:34:50 GMT')
  res.statusCode = 200;
  res.end('test index');
});
app.use('/index', function (req, res, next) {
  res.statusCode = 200;
  res.setHeader('Set-Cookie', 'cs=mainindex; Max-Age=6307200000000; Path=/; Expires=Sat, 02 Jan 2213 09:34:50 GMT')
  res.end('main page');
});

app.listen(1987, function () {
  console.log('server is listen on 1987');
});

