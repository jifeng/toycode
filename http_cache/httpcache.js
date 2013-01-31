var connect = require('connect');
var urlparse = require('url').parse;
var crypto = require('crypto');
var fs = require('fs');

function md5(data) {
  var hash = crypto.createHash('md5');
  return hash.update(data, 'utf-8').digest('hex');
}

var app = connect();
//加页面缓存
app.use('/public', function (req, res, next) {
  var url = req.originalUrl || req.url;
  var pathname = urlparse(req.url).pathname;
  var file = __dirname + '/public' + pathname;

  fs.exists(file, function (exists) {
    if (exists) {
      fs.readFile(file, function(err, content) {
        var token = md5(content);
        var header = req.headers;
        var ifNoneMatch = header['If-None-Match'];
        var ifModifiedSince = header['If-Modified-Since'];
        if (ifNoneMatch || ifNoneMatch === token) {
          //使用页面缓存
          res.statusCode = 304;
          res.setHeader('Etag', token);
          return res.end();
        } else {
          return next();
        }
 
      });
    } else {
      next();
    }
  })
});

app.use('/public', connect.static(__dirname + '/public'));

//正常逻辑
app.use('/', function (req, res, next) {
  res.statusCode = 200;
  res.end('hello world');
});

app.listen(1723, function () {
  console.log('server is listening on port of 1723');
})
