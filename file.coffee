fs = require 'fs'
for i in [ 0...3000 ]
  fs.writeFile "./temp/#{i}", 'test'