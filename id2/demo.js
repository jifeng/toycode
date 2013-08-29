var db = {
	get: function (key, cb) {
		process.nextTick(function () {
      cb(null, JSON.stringify(key));
		});
	}
}
function func1 (key, callback) {
	db.get(key, function(err, data) {
	if (err) {
	    return callback(err);
	  }
	  try {
	    callback(null, JSON.parse(data.toString()))
	  } catch(e) {
	    callback(e);
	  }
	});
}

func1('hello world', function (err, item) {
	console.log(err, item);
	// throw new Error('new Error');
	d
});