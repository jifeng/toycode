https = require 'https'
fs = require 'fs'


options = 
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')


server = https.createServer options, (req, res)->
  res.statusCode = 200
  res.end 'hello world'

server.listen 8080