var redux = require('redux');

console.log('Starting todo redux example');

// 1 CREATE REDUCER (which passes 1 state, 2 action)
var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  return state;
};

// 2 CREATE STORE, save new state
var store = redux.createStore(reducer);

// 3 GET STATE, return state object
var currentState = store.getState(); // return state object
console.log('currentState', currentState);
