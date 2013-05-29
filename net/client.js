var request = require('request');

request.post({url: 'http://www.work1.com:1723/post/', form: {a: '1', b: 'b'}}, function (err, rows) {
  console.log(arguments);
});