var ws = new WebSocket("ws://127.0.0.1:8080/ws");

ws.onopen = function () {
  alert("About to send data");
  ws.send("Hello World"); // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!!
  alert("Message sent!");
};

ws.onmessage = function (evt) {
  alert("About to receive data");
  var received_msg = evt.data;
  alert("Message received = "+received_msg);
};
ws.onclose = function () {
    // websocket is closed.
  alert("Connection is closed...");
};
