(function () {
  var myWorker = new Worker("task.js");

  var addMessage = function (event) {
		var count = event.data.a;
		document.getElementById('count').innerHTML = '' + count;
  }
  document.getElementById('btn').onclick = function(event) {
  	var btn = document.getElementById('btn')
  	var value = btn.innerHTML;
  	if (value === 'stop') {
  		btn.innerHTML = 'start';
  		myWorker.terminate();
  	} else {
      btn.innerHTML = 'stop';
      myWorker.postMessage("");
      myWorker = new Worker("task.js");
      myWorker.addEventListener("message", addMessage, false);
  	}
  };

	myWorker.addEventListener("message", addMessage, false);

  var myShareWorker = new SharedWorker('sharetask.js');
  myShareWorker.port.onmessage = function(event) {
    console.log(event.data);
    var count = event.data.a;
    document.getElementById('share-count').innerHTML = '' + count;
  };
  myShareWorker.port.start();
  myShareWorker.port.postMessage('hello shared worker!');


})()