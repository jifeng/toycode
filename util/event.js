var EventEmitter = require('events').EventEmitter;
var sys = require('sys');


var Dome1 = function () {};
sys.inherits(Dome1, EventEmitter);
var dome1 = new Dome1();
dome1.on('shot', function (name) {
  console.log(name + ' is shoted!');
});
dome1.emit('shot', 'dome1');

var Dome2 = function () {};
Dome2.prototype =  EventEmitter.prototype;
var dome2 = new Dome2();
dome2.on('shot', function (name) {
  console.log(name + ' is shoted!');
});
dome2.emit('shot', 'dome2');

var e = new EventEmitter();
e.on('shot', function (name) {
  console.log(name + ' is shoted!');
});
e.emit('shot', 'EventEmitter');