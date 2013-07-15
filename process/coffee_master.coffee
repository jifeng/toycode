child_process = require 'child_process'
path = require 'path'

n = child_process.fork('./child.js', [], {
  # execPath: path.join(require.resolve('coffee-script'), '../../../bin/coffee')
  execPath: '/Users/jifeng/tools/nvm/v0.10.4/bin/node'
})

n.on 'message', (m) ->
  console.log 'PARENT got message:', m

process.nextTick ()->
  n.send({ hello: 'world' })