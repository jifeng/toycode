"use strict"
const cp = require('child_process');


const base = 6001;
const workers = [];
for (var i = 0; i < 10; i++) {
  let port = base + i;
  let worker = cp.fork(`${__dirname}/worker.js`, [ 'worker', port ], {env: { port: port } });
  workers.push(worker);
}

const send = function (options) {
  for (var i = 0; i < workers.length; i++) {
    workers[i].send(options);
  }
};

var obj = require('./data')
setInterval(function () {
  console.log('master send message');
  send(obj);
}, 1000)