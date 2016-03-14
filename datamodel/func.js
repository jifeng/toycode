var obj = {
	a: {b: 1, d: 2},
	c: {b: 3, d: 4},
  e: {b: 3, d: 4}
}

var hacker = function (obj) {
	obj.filter = function (cb, needHacker) {
		needHacker = needHacker === undefined? false: true;
		var newObj = {}
		for(var key in obj) {
			var value = obj[key];
			if (typeof value === 'function') {
				if (needHacker === true) {
					newObj[key] = value;
				}
				continue;
			}
			if (cb(value, key, this)) {
				newObj[key] = value
			}
		}
		return newObj;
	}

	obj.map = function(cb, needHacker) {
		needHacker = needHacker === undefined? true: false;
		var newObj = {}
		for(var key in obj) {
			var value = obj[key];
			if (typeof value === 'function') {
				if (needHacker === true) {
					newObj[key] = value;
				}
				continue;
			}
			newObj[key] = cb(value, key, this)
		}
		return newObj;
	}

	obj.reduce = function(cb) {
		needHacker = needHacker === undefined? true: false;

		var newObj = {}
		var count = 0;
	  var result = undefined;
	  var previousValue = undefined;
		for(var key in obj) {
			var value = obj[key];
			if (typeof value === 'function') {
				if (needHacker === true) {
					newObj[key] = value;
				}
				continue;
			}
			count++;
			if (count === 1) {
				result = previousValue = value;
			} else {
	      result = cb(result, value, key, obj);
			}
		}	
	  return result;
	}
}


var filter = function(value, index, obj) {
  return value.b === 1;
}

console.log(obj.filter(filter))

var map = function(value, index, obj) {
	value.x = 1;
	return value;
}

console.log(obj.map(map))


var reduce = function (previousValue, currentValue, index, array) {
  var info = {
    b: previousValue.b + currentValue.b,
    d: previousValue.d + currentValue.d 	
  }
  return info
}

console.log(obj.reduce(reduce))


