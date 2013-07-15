var app = require('pm').createMaster({
 'pidfile' : '/tmp/demo.pid',
});

app.register('group1', __dirname + '/http.js', {
 'listen' : [8080, 8081]
});

app.on('giveup', function (name, num, pause) {
  // YOU SHOULD ALERT HERE!
});
app.dispatch();
