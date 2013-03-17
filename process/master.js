var child_process = require('child_process');

child = child_process.spawn('ls', ['-lh', '/usr']);
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
  console.log(data);
});

child_process.exec('ls -lh /usr', function(err, stdout, stderr) {
  console.log(stdout);
});


var n = child_process.fork('./child.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });