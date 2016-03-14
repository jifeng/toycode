var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname));

app.listen(8080, function () {
  console.log('server is listen on 8080');
});
