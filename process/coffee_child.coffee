process.on 'message', (m) ->
  console.log 'CHILD got message:', m


process.on 'message', (m) ->
  console.log 'CHILD got message:', 

process.send { foo: 'bar' }