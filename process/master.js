var child_process = require('child_process');
var path = require('path');

var n = child_process.fork('./child.js', [], {
  execPath: '/Users/jifeng/tools/nvm/v0.10.4/bin/node',
  env: undefined
});
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });


process.on('SIGINT', function (){
	console.log('SIGINT');
});

process.on('SIGQUIT', function (){
	console.log('SIGQUIT');
});

process.on('exit', function (){
	console.log('exit');
});

process.on('SIGTERM', function (){
	console.log(arguments);
	n.kill();
	console.log('SIGTERM');
});

process.on('SIGUSR1', function (){
	console.log('SIGUSR1');
});
