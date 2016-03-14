
var Store = require('./store')

class DataModel {
  constructor() {
    
  }

  select(name) {
    return this[name];
  }

  create(name, store) {
    this[name] = new Store(store)
    return this[name];
  }

  update(name, store) {

  }

  remove(name, store) {

  }
}


var dataModel = new DataModel();
module.exports = dataModel;
