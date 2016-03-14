
var common = require('../lib/common');
var parseFunction = common.parseFunction;

class Store {
  constructor(data) {
    this.data = data;
  }

  // options: 1.函数 or 2.object
  find (options) {

  	var filter = function(item, data) {
  		options = options || {}
      for(var key in options) {
      	var value = options[key];
      	if (item[key] === undefined) {
          return false;
      	}
      	if (item[key] !== value) {
      		return false;
      	}
      }
      return true;
  	}
  	if (typeof options === 'function') {
  		filter = options;
  	}
    var data = this.data || [];
    var arr = []
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (filter(item, data)) {
        arr.push(item);
      }
    }
    return arr;
  }
  

  save (options) {
    var data = this.data;
    data.push(options);
    return options;
  }
  
  mapReduce (map, reduce, options) {
  	var mapData = {};
  	var result = [];
    var data = this.data;
    var emit = function (key, value) {
    	mapData[key] = mapData[key] || [];
    	mapData[key].push(value)
    }
    var code = map.toString();
    var info = parseFunction(code);
    var args = info.args;
    args.push('emit')
    var runCode = info.runCode;
    var newMap = new Function(args.join(','), runCode)
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      newMap(item, emit);
    } 

    for(var key in mapData) {
    	var value = mapData[key];
      result.push(reduce(key, value))
    }
    return result; 	
  }
}


module.exports = Store;
