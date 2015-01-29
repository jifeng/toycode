connect = require 'connect'
urllib = require 'urllib'

app = connect()

app.use '/facebook', (req, res, next)->
  console.log 'facebook...........'
  urllib.request 'https://www.facebook.com/', (err)->
    return next err if err
    res.end 'hello'


app.use '/500', (req, res, next)->
	console.log 'facebook...........'
  res.statusCode = 500
  res.end 'hello world'

app.use (req, res, next)->
  res.statusCode = -1
  res.end 'hello world'

app.listen 1723, ()->
  console.log 'server listened 1723'