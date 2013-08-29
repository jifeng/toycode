
## nodejs 官网镜像

[nodejs](http://nodejs-org.qiniudn.com/)


## setter and getter

[Object.defineProperty vs __defineGetter__ vs normal](http://jsperf.com/object-defineproperty-vs-definegetter-vs-normal)

## callback

### 异常处理

大家觉得以下的代码有什么问题

```js
function func1 (key, callback) {
	db.get(key, function(err, data) {
	if (err) {
	    return callback(err);
	  }
	  try {
	    callback(null, JSON.parse(data.toString()))
	  } catch(e) {
	    callback(e);
	  }
	});
}
```

### cb 是可选的参数时

```js
if (cb) {
  cb()
}
```

=>

```js
start : (cb=->) ->
```

### 嵌套

```js
func1(err, function(err1, data1) {
  func2(err1, function(err2, data2) {
    func3(err3, function(err3, data3) {
      func4(err4, function(err4, data4) {
        .......
      })
    })
  })
})
```

解决方案:

[event-pipe](https://github.com/q3boy/event-pipe)
[step](https://github.com/creationix/step)
[async](https://github.com/caolan/async#series)
[eventproxy](https://github.com/JacksonTian/eventproxy)


