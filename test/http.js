var connect = require('connect');
var urllib = require('url');
var r302 = function (res, url) {
  res.setHeader('Location',  url);
  res.statusCode = 302;
  res.end();
};

var app = connect();
app.use(connect.favicon())
app.use(connect.cookieParser());

app.use(function (req, res, next) {
  var urlObj = urllib.parse(req.url, true);
  var params = urlObj.query;

  if (params && params.username) {
    return res.end(JSON.stringify(params));
  }
  return r302(res, 'http://ndxp-test.alibaba-inc.com:8080/s/login?app=ide&code=f76b270d848bda61xxxx&redirect=' + encodeURIComponent('http://localhost:1723'));

  return res.end('hell world');
});

app.listen(1723);


