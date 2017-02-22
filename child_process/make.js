const fs = require('fs');
const num = [100000, 6];
const obj = {};
for (var i = 0; i < num[0]; i++) {
	var key = 'key-' + i;
	obj[key] = {};
	for (var j = 0; j < num[1]; j++) {
		var subKey = 'subkey-' + j;
		obj[key][subKey] = '' + Math.random() + '|' +  Math.random();
	}
}

// console.log(obj);
fs.writeFile('./data.json', JSON.stringify(obj), function () {
  console.log(arguments);
})