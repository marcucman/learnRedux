var redux = require('redux');

console.log('Starting redux example');

// you typically use one Store to store your entire application
// REDUCER = pure function that takes your existing and state and action as arguments and compute a new state
// ES5 way of assigning default values
// var reducer = (state, action) => {
//   state = state || {name: 'Anonymous'}; // create default
//
//   console.log('New action', action);
// };

// ES6 way of assigning default values
var reducer = (state = {name: 'Anonymous'}, action) => {
  console.log('New action', action);

  // HANDLE ACTION
  switch(action.type) {
    case 'CHANGE_NAME': // generate new state with name in action used to replace old name
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer);

var currentState = store.getState(); // return state object
console.log('currentState', currentState);

// ACTION = object, must have 'type' property
var action = {
  type: 'CHANGE_NAME', // action name
  name: 'Brian' // value to pass
};

// DISPATCH ACTION
store.dispatch(action);

// check that action changed the name
console.log('Name should be Brian', store.getState());
