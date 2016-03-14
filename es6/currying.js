
'use strict';

const logger = store => next => action => {
	console.log('yyyyyyyyyy');
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

var store = {
  getState: function () {
  	return { a: 1, b: 2 }
  },
  dispatch: function(action) {
  	console.log('action....', action);
  }
};

logger(store)(store.dispatch)('hello world');


// console.log('aaaaaaaaaaa');
// var mid = logger(function() {
// 	console.log(arguments);
// });
// mid(store);