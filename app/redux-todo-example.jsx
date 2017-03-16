var redux = require('redux');

console.log('Starting todo redux example');

// 1 CREATE REDUCER (which passes 1 state, 2 action)
var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  console.log('New action', action);
  // HANDLE ACTION
  switch(action.type) {
    case 'CHANGE_SEARCHTEXT': // generate new state with name in action used to replace old name
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
  return state;
};

// 2 CREATE STORE, save new state
var store = redux.createStore(reducer, redux.compose(
  // make redux devtool work
  // if a devToolsExtension exists, use it. If not, pass the request through
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

// SUBSCRIBE TO CHANGES
var unsubscribe = store.subscribe(() => { // this saves unsubscribe method
  var state = store.getState();

  console.log('Search text is ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

// 3 GET STATE, return state object
var currentState = store.getState(); // return state object
console.log('currentState', currentState);

// ACTION = object, must have 'type' property
var action = {
  type: 'CHANGE_SEARCHTEXT', // action name
  searchText: 'alphabet' // value to pass
};

// DISPATCH ACTION
store.dispatch(action);

// check that action changed the name
console.log('searchText should be different', store.getState());

store.dispatch({
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'better'
});

// check that action changed the name
console.log('searchText should be different', store.getState());

store.dispatch({
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'candle'
});
