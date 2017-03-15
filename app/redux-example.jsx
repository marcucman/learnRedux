var redux = require('redux');

console.log('Starting redux example');

// you typically use one Store to store your entire application
// REDUCER = pure function that takes your existing and state and action as arguments and compute a new state
// ES5 way of assigning default values
var reducer = (state, action) => {
  state = state || {name: 'Anonymous'}; // create default
};

// ES6 way of assigning default values
var reducer = (state = {name: 'Anonymous'}, action) => {
  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState(); // return state object
console.log('currentState', currentState);
