# 监听进程退出

## exit
```js
process.on('exit', function() {
  setTimeout(function() {
    console.log('This will not run');
  }, 0);
  console.log('About to exit.');
});
```
## 
```bash 信号量
var quit = function(){
  master.close(function(){
  	console.log("Master Quit.");
    process.exit();
  });
};

process.on('SIGINT', quit);
process.on('SIGQUIT', quit);
```
