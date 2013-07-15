var child_process = require('child_process');
child_process.fork('./child.js', {}, {
  execPath: '/Users/jifeng/tools/nvm/v0.10.4/bin/node'
});