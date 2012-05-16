var http = require('http');
var urllib = require('url');
var fs = require('fs');

var html = fs.readFileSync('./app.html');

var app = http.createServer(function(req, res){
  var params = urllib.parse(req.url, true);
  if (params.pathname === '/login') {
    res.end(html);
  } else if (params.pathname === '/check') {
    var params = urllib.parse(req.url, true);
    res.end(JSON.stringify(params.query));
  }
});

app.listen(5678, function(){
  console.log('server is listening on 5678');  
});
