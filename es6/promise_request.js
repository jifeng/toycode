var request = require('request')
var newRequest = function (options) {
	return promise = new Promise(function(resolve, reject) {
		request(options, function(err, _res, body) {
      if (err) {
      	return reject(err)
      }
      resolve(_res, body)
		});
	})
};



newRequest({url: 'http://www.baidu.com'}).then(function(_res, body) {
	console.log(_res.body);
});