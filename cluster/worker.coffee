connect = require 'connect'
http = require 'http'


app = connect()
app.use (req, res, next)->
  res.statusCode = 200
  res.end 'child process hello world'

server = http.createServer app

process.on 'request', (req, res)->
  server.emit 'request', req, res
  
server.listen '7001', ()->
  console.log 'child server is listening on 7001'