connect = require 'connect'
crypto = require 'crypto'

md5 = (buffer)->
  hash = crypto.createHash 'md5'
  hash.update buffer
  hash.digest 'hex'


app = connect()

# app.use (req, res, next)=>
app.use (req, res, next)->
  method = req.method
  chunks = []
  if method is 'POST' or method is 'PUT'
    req.on 'data', (chunk)->
      chunks.push chunk
    req.on 'end', ()->
      buffer = Buffer.concat chunks
      req.body = buffer
      next()
    return
  else

    next()

  
app.use (req, res, next)=>
  headers = req.headers or {}
  method = req.method
  accept = headers.accept
  date = headers.Date
  contentType = headers['Content-Type']

  content = ''
  if method is 'GET'
    content = ''

  action = req.originalUrl

  body = req.body or ''
  console.log 'body', body, body.toString(), md5(body) 
  console.log 'url', action


  res.statusCode = 200
  res.end 'hello world'

app.listen 8080