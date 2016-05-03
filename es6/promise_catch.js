console.log('promise is doing');

var promise = function (options) {
  return new Promise(function(resolve, reject) {
    resolve(options)
  });
};

var args = { a: 1, b: 2 };

// promise(args).then(function(options) {
//   console.log('options', options);
// }, function(err) { 
//   console.log('error', err);	
// });


// promise(args).then(function(options) {
//   console.log('options', options);
// }).catch(function(err) { 
//   console.log('error', err);	
// });

// promise(args).then(function(options) {
//   console.log('options', options);
// }, function(err) {  //这个error优先捕获
//   console.log('reject error', err);	
// }).catch(function(err) { 
//   console.log('catch error', err);	
// });

promise(args).then(function(options) {
  console.log('options', options);
  // b+1;
  return options;
}).finally();
