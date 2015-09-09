
http = require 'http'
connect = require 'connect'
# cp = require 'child_process'
# path = require 'path'

# app1 = http.createServer (req, res)->
#   res.statusCode = 200
#   res.end 'app hello world xxxx'

# app2 = http.createServer (req, res)->
#   res.statusCode = 200
#   res.end 'app2 hello world yyyy'

capp = connect()
capp.use (req, res, next)->
  console.log 'middleware 1'
  next()
capp.use (req, res, next)->
  res.statusCode = 200
  res.end 'connect ok'


# worker = path.join __dirname, 'worker.coffee'
# child = cp.fork worker

capp = http.createServer capp
server = http.createServer()
# server.on 'connection', (socket)->
#   console.log 'connection...............'
#   # console.log req.url
#   capp.emit 'connection', socket


server.on 'request', (req, res)->
  console.log 'request...........'
  console.log req.socket
  capp.emit 'connection', req.socket
  # capp.emit 'request', req, res

# server.on 'connect', (request, socket, head)->
#   console.log 'connect ........'
# server = http.createServer (req, res)->
  # child.send 'request', req, res
  # url = req.url
  # app = app1
  # if url.indexOf('/app2') is 0
  #   app = app2
  # else if url.indexOf('/capp') is 0
  #   app = capp
  # app.emit 'request', req, res
  



server.listen 8080, ()->
  console.log 'server is listening on 8080 port'
  # console.log server



# app1.listen server  

