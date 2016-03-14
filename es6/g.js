// var func = function (options, cb){
//   process.nextTick(function(){
//     cb(null, options);
//   });
// }

var options = {a: 1, b: 2};
// func(options, console.log);

function *gernerator (options) {
	 yield(null, options);
  // process.nextTick(function(){
  //   yield(null, options);
  // });
  return 'done'
}

// function *othergerner

var G = gernerator(options);

console.log(G.next());