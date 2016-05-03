
var promise = function (options) {
  return new Promise(function(resolve, reject) {
    resolve({value: options, helper: {x: 1} })
    // resolve(options, {x: 1} )
  });
};


var args = { a: 1, b: 2 };
promise(args).then(function ({value, helper}){
	// console.log(arguments);
	console.log(value, helper);
  // console.log(one, two);
});




