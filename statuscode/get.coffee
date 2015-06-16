http = require 'http'

g = http.get 'http://localhost:1723', (res)->
  console.log res.statusCode

# g = http.get 'http://localhost:1723/facebook', (res)->
#   console.log res.statusCode

g.on 'error', (err)->
  console.log err

# http.get 'http://taobao.com', (err, info)->
#   console.log err