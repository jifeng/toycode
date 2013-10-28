/*!
 * path - cookie/path
 * Copyright(c) 2012 jifeng
 * MIT Licensed
 */

var connect = require('connect');

var app = connect();
var count = 0;
app.use(function (req, res, next) {
  if(count === 0) {
  	res.statusCode = 302;
  	count++;
  	res.setHeader('Set-Cookie', 'cs=mainindex; Max-Age=6307200000000; Path=/; Expires=Sat, 02 Jan 2213 09:34:50 GMT; domain=.work1.com');
  	res.setHeader('Location',  'http://test.s2.work1.com:1987');
    return res.end();
  }
  res.statusCode = 200;
  res.end('working on s2');

});

app.listen(1987, function () {
  console.log('server is listen on 80');
});
