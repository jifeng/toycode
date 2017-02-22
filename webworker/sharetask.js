


var counter = 0;
var connections = [];
onconnect = function(eConn) {
  var port = eConn.ports[0]; // 此连接的特有port

  //当有消息的时候通知所有的连接
  port.onmessage = function(eMsg) {
    // console.log(new Date().getTime());
    // var reciveTime = new Date().getTime();
    // var count = eMsg.data.count;
    // var sendTime = eMsg.data.sendTime;
    port.postMessage({})
  }
  port.start();
  connections.push(port);
}
