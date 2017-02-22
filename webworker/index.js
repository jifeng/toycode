(function () {
 //  var myWorker = new Worker("task.js");

 //  var addMessage = function (event) {
	// 	var count = event.data.a;
	// 	document.getElementById('count').innerHTML = '' + count;
 //  }
 //  document.getElementById('btn').onclick = function(event) {
 //  	var btn = document.getElementById('btn')
 //  	var value = btn.innerHTML;
 //  	if (value === 'stop') {
 //  		btn.innerHTML = 'start';
 //  		myWorker.terminate();
 //  	} else {
 //      btn.innerHTML = 'stop';
 //      myWorker.postMessage("");
 //      myWorker = new Worker("task.js");
 //      myWorker.addEventListener("message", addMessage, false);
 //  	}
 //  };

    var sizeof = function(str, charset){
        var total = 0,
            charCode,
            i,
            len;
        charset = charset ? charset.toLowerCase() : '';
        if(charset === 'utf-16' || charset === 'utf16'){
            for(i = 0, len = str.length; i < len; i++){
                charCode = str.charCodeAt(i);
                if(charCode <= 0xffff){
                    total += 2;
                }else{
                    total += 4;
                }
            }
        }else{
            for(i = 0, len = str.length; i < len; i++){
                charCode = str.charCodeAt(i);
                if(charCode <= 0x007f) {
                    total += 1;
                }else if(charCode <= 0x07ff){
                    total += 2;
                }else if(charCode <= 0xffff){
                    total += 3;
                }else{
                    total += 4;
                }
            }
        }
        return total;
    }

	// myWorker.addEventListener("message", addMessage, false);
  // var tick = Math.random();
  // var myShareWorker = new SharedWorker('sharetask.js?tick=' + tick);
  // myShareWorker.port.onmessage = function(event) {
  //   console.log(event.data);
  //   // var count = event.data.a;
  //   // document.getElementById('share-count').innerHTML = '' + count;
  // };
  // var count = 0;
  // var buffer = '';
  // for (var i = 0; i < 10000000; i++) {
  //    buffer += 'b'
  // }

  // // )))))console.log(
  // // console.log(sizeof(buffer, 'utf-16'))

  // myShareWorker.port.start();
  // setInterval(function () {
  //   count++
  //   var d = '';
  //   for (var j = 0; j < count; j ++) {
  //     d += buffer;
  //   }
  //   var sendTime = new Date().getTime();
  //   myShareWorker.port.postMessage({count: count, data: d, sendTime: sendTime});
  // }, 1000 * 60) 


  var tick = Math.random();
  var buffer = '';
  var myShareWorker = new SharedWorker('sharetask.js?tick=' + tick);
    for (var i = 0; i < 16000000; i++) {
     buffer += 'b'
  }
  var uInt8Array = buffer;
  // var uInt8Array = new Uint8Array(1024*1024*32); // 32MB
  // for (var i = 0; i < uInt8Array.length; ++i) {
  //   uInt8Array[i] = i;
  // }
  myShareWorker.port.onmessage = function(event) {
    var receiveTime = new Date().getTime();
    console.log(receiveTime - sendTime);
    // console.log('uInt8Array', uInt8Array);

  };


  var sendTime = new Date().getTime();
  setInterval(function () {
    sendTime = new Date().getTime();
    myShareWorker.port.postMessage(uInt8Array);
  }, 1000 * 10) 

  // var sendTime = new Date().getTime();
  // setInterval(function () {
  //   sendTime = new Date().getTime();
  //   myShareWorker.port.postMessage(uInt8Array);
  // }, 1000 * 10) 

  // var tick = Math.random();
  // var myShareWorker = new SharedWorker('sharetask.js?tick=' + tick);
  // var uInt8Array = new Uint8Array(1024*1024*32); // 32MB
  // for (var i = 0; i < uInt8Array.length; ++i) {
  //   uInt8Array[i] = i;
  // }
  // console.log('uInt8Array.......', uInt8Array);
  // myShareWorker.port.onmessage = function(event) {
  //   var receiveTime = new Date().getTime();
  //   console.log(receiveTime - sendTime);
  //   console.log('uInt8Array', uInt8Array);

  // };



  // var sendTime = new Date().getTime();
  // setInterval(function () {
  //   sendTime = new Date().getTime();
  //   myShareWorker.port.postMessage(uInt8Array);
  // }, 1000 * 10) 
})()