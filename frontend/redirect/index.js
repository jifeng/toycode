var connect = require('connect');

var app = connect();
app.use('/public', connect.static(__dirname + '/public'));
app.use('/redirect', function (req, res, next) {
  res.statusCode = 302;
  res.setHeader('Location', 'http://www.taobao.com');
  // res.setHeader('Location', '/public/helloworld.html');
  res.end();
});

app.use('/post', connect.bodyParser());
app.use('/post', function (req, res, next) {
  console.log(req.body);
  return res.end(JSON.stringify(req.body));
});
app.listen(1723, function () {
  console.log('server is listening on port of 1723');
});