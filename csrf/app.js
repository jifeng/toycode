var http = require('http');
var urllib = require('url');
var fs = require('fs');
var crypto = require('crypto');
var cookieValue = crypto.createHash('md5').update('jifeng_jifeng').digest('hex');
var querystring = require('querystring');
var result = {func: '', value: ''};

var html_post = fs.readFileSync('./app_post.html');
var html_get = fs.readFileSync('./app_get.html');
var html_login = fs.readFileSync('./login.html');


function getCookie(headers){
  var cookies = {};
  headers.cookie && headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.split('=');
    cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
  });  
  return cookies;
}

function checkUser(req, res, callback){
  var chunks = [];
  var length = 0;
  var rows = null;
  req.on('data', function(data){
    chunks.push(data);
    length += data.length;
  }) 
  req.on('end', function(){
    var rows = new Buffer(length);
    var len = 0;
    for (var i = 0, il = chunks.length; i < il; i++) {
      chunks[i].copy(rows, len);
      len += chunks[i].length;
    }
    var args = querystring.parse(rows.toString());
    if (args && args.name === 'jifeng' && args.password ==='jifeng') {
      res.setHeader('Set-Cookie', ['cookie1987=' + cookieValue]);
      callback(null, true);   
    } else {
      callback(null, false);
    }
  }) 
}
function authMiddle(req, res, callback){
  var flag = false;
  var params = urllib.parse(req.url, true);
  if (params.pathname === '/checkuser') {
    return checkUser(req, res, callback);    
  } else {
    var headers = req.headers;
    var cookies = getCookie(headers);
    if (cookies && cookies.cookie1987) {
      var v = cookies.cookie1987;
      if (v == cookieValue) {
        flag = true;  
      }
    }
    callback(null, flag)
  }
}


function controller(req, res){
  var params = urllib.parse(req.url, true);
  if (params.pathname === '/get/setvalue') {
    res.end(html_get);
  } else if (params.pathname === '/get/checkvalue') {
    var args = urllib.parse(req.url, true);
    result.func = args.query.func;
    result.value = args.query.value;
    res.end(JSON.stringify(result));
  } else if (params.pathname === '/post/setvalue') {
    res.end(html_post);
  } else if (params.pathname === '/post/check') {
    var chunks = [];
    var length = 0;
    var rows = null;
    req.on('data', function(data){
      chunks.push(data);
      length += data.length;
    }) 
    req.on('end', function(){
      var rows = new Buffer(length);
      var len = 0;
      for (var i = 0, il = chunks.length; i < il; i++) {
        chunks[i].copy(rows, len);
        len += chunks[i].length;
      }
      var args = querystring.parse(rows.toString());
      if (args && args.func && args.value) {
        result.func = args.func;
        result.value = args.value;
      }
      res.end(JSON.stringify(result));
    })
  } else {
    res.end(JSON.stringify(result)); 
  }
}

var app = http.createServer(function(req, res) {
  authMiddle(req, res, function(err, checkValue){
    if (!checkValue) return res.end(html_login);
    controller(req, res);  
  });
});

app.listen(5678, function(){
  console.log('server is listening on 5678');  
});