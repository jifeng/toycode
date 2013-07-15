pm = require 'pm'

app = pm.createMaster({
 'pidfile' : '/tmp/demo.pid',
})

app.register('group1', __dirname + '/http.js', {
 'listen' : [8080, 8081]
})

app.on 'giveup', (name, num, pause) ->
  console.log 'give up'

app.dispatch()