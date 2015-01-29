var connect = require('connect')
  , http = require('http');

var cookieParser = require('cookie-parser')

var app = connect();
app.use(cookieParser());
app.use(function (req, res, next) {
  res.end(JSON.stringify(req.cookies));
});

  // .use(connect.favicon())
  // .use(connect.logger('dev'))
  // .use(connect.static('public'))
  // .use(connect.directory('public'))
  // .use(connect.cookieParser())
  // .use(connect.session({ secret: 'my secret here' }))
//   .use(function (req, res, next) {
//     console.log(req.url);
//     next();
//   })
//   .use(function (req, res, next) {
//     console.log(req.url);
//     next();
//   })
//   .use(function (req, res, next) {
//     console.log(req.url);
//     next();
//   })
//   .use(function(req, res){
//     res.end('Hello from Connect!\n');
//   });


// console.log('hello world');
http.createServer(app).listen(3000);


                                   