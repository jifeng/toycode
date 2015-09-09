function * list(a, b, c){
  var y1 = yield a;
  console.log(y1); //next2
  var y2 = yield b;
  console.log(y2); //next3
  var y3 = yield c;
  console.log(y3); //next4
  return 'done';
};
var List = list(1,2,3); //注意这边是看起来是调用，实际上foo只是做生成器的编译处理，并没有运行函数内程序，需要调用next()才会运行。
console.log( List.next('next1') ); //{ value: 1, done: false }
console.log( List.next('next2') ); //{ value: 2, done: false }
console.log( List.next('next3') ); //{ value: 3, done: false }
console.log( List.next('next4') ); //{ value: 'done', done: true }


