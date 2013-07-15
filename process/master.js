var child_process = require('child_process');
var path = require('path');

var n = child_process.fork('./child.js', [], {
  execPath: '/Users/jifeng/tools/nvm/v0.10.4/bin/node'
});
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });
