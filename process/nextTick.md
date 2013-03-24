## nextTick

### 同步emit时间，保证时序
[nodejs net模块](https://github.com/joyent/node/blob/master/lib/net.js#L806)

```js
var EventEmitter = require('events').EventEmitter;

function StreamLibrary(resourceName) { 
    this.emit('start');

    // read from the file, and for every chunk read, do:        
    this.emit('data', chunkRead);       
}
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;
```

```js
var stream = new StreamLibrary('fooResource');

stream.on('start', function() {
    console.log('Reading has started');
});

stream.on('data', function(chunk) {
    console.log('Received: ' + chunk);
});

```
问题：我们可能永远也监听不到"start"事件，因为这个事件在调用构造函数时，已经马上抛出了这个事件

解决方案
```js
function StreamLibrary(resourceName) {      
    var self = this;

    process.nextTick(function() {
        self.emit('start');
    });

    // read from the file, and for every chunk read, do:        
    this.emit('data', chunkRead);       
}
```

### cpu高密集代码段

```js
var http = require('http');

function compute() {
    // performs complicated calculations continuously
    // ...
    process.nextTick(compute);
}

http.createServer(function(req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello World');
}).listen(5000, '127.0.0.1');

compute();
```


这点其实是非常难以界定,个人的一个感觉：让业务方来决定，自己写模块时不要做



### 经典文章
[Understanding process.nextTick()](http://howtonode.org/understanding-process-next-tick)
[nextTick and setTimeout](http://cnodejs.org/topic/4f16442ccae1f4aa2700109b)
[test case about nextTick and setTimeout](https://gist.github.com/mmalecki/1257394)
