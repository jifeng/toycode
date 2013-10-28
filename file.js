fs = require 'fs'
for i in [ 0...1000 ]
  fs.writeFile "./temp/#{i}", 'test'