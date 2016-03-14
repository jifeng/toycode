(function () {
	// console.log('hello world');
	// var promise = new Promise(function(resolve, reject) {
	  
 //    var success = false;
 //    var value = 'value1';
 //    var error = 'mock error';
 //    // JSON.parse('fafafafa')
	//   if (success) {
	//     resolve(value);
	//   } else {
	//     reject(error);
	//   }
	// });

	// promise.then(function (data) {
 //    console.log('data', data);
	// }, function (err) {
	// 	console.log('error', err);
	// }).catch(function (err) {
 //    console.log('catch err', err);
	// });

  // var later = function (ms) {
  //   var promise = new Promise((resolve, reject)=>
  //     setTimeout(resolve, ms, 'done')
  //   )
  //   return promise;
  // }

  // later(1000).then((value)=> console.log(value));


   // callback转化成promise

  var transform = ()=> {
  	console.log('hello world');
  }
  


  var api = {
  	create: function (func1) {
  	  console.log('func1', func1);
  	  var promise = new Promise(function (resolve, reject) {

  	  });
  	}
  }

  api.create(transform)
})()
