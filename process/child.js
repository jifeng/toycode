
var optStr = process.env.options;

console.log(typeof optStr, optStr);

process.on('message', function(m) {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });

setInterval(function () {
	console.log('hello world');
}, 2000)