


var counter = 0;
var connections = [];
onconnect = function(eConn) {
  var port = eConn.ports[0]; // 此连接的特有port

  //当有消息的时候通知所有的连接
  port.onmessage = function(eMsg) { 
    counter++;
    for (var i=0; i < connections.length; i++) {
      connections[i].postMessage({
        message: eMsg.data,
        a: counter
      });
    }
   }
  port.start();
  connections.push(port);
}

var j = 0;
function timedCount1(){
  console.log('hello world');
  j++;
  for (var i=0; i < connections.length; i++) {
    connections[i].postMessage({a: j});
  }
  setTimeout(timedCount1, 1000);
}

timedCount1();