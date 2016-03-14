var store = {
  getState: function () {
  	// store.value = 'say hi'
  	return store.value;
  	
  },
  dispatch: function(action) {
  	store.value = action;
    console.log('do action.....', action);
  }
};

// store.dispatch('say bye!');

// store.value = 'say hi';
// var logFunction = function (store, action) {
//   console.log('before state:', store.getState());
//   store.dispatch(action)
//   console.log('after  state:', store.getState())
// }

// logFunction(store, 'say bye')

//修改dispatch方法
store.value = 'say hi';
var next = store.dispatch;
store.dispatch = function (action) {
  console.log('before state:', store.getState());
  var result = next(action)
  console.log('after  state:', store.getState())
  return result;

  //类型写法
  // return next(action)
}
store.dispatch('say bye');


//封装store






