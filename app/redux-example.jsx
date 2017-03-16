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

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;

// // ES6 way of assigning default values
// var oldReducer = (state = stateDefault, action) => {
//   // console.log('New action', action);
//
//   // HANDLE ACTION
//   switch(action.type) {
//     case 'CHANGE_NAME': // generate new state with name in action used to replace old name
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       }
//     case 'REMOVE_HOBBY':
//       return {
//         ...state,
//           // return true for every hobby that does not match the id passed
//         hobbies: state.hobbies.filter( (hobby) => hobby.id !== action.id)
//       }
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           ...state.movies,
//           {
//             id: nextMovieId++,
//             movieName: action.movieName,
//             movieGenre: action.movieGenre
//           }
//         ]
//       }
//     case 'REMOVE_MOVIE':
//       return {
//         ...state,
//           // return true for every hobby that does not match the id passed
//         movies: state.movies.filter( (movie) => movie.id !== action.id)
//       }
//     default:
//       return state;
//   }
// };

// NAME REDUCER
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};
// HOBBIES REDUCER
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state, // old items
        { // new item
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter( (hobby) => hobby.id !== action.id);
    default:
      return state;
  }
};
// MOVIES REDUCER
var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state, // old items
        { // new item
          id: nextMovieId++,
          movieName: action.movieName,
          movieGenre: action.movieGenre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter( (movie) => movie.id !== action.id);
    default:
      return state;
  }
};

var reducer = redux.combineReducers({
  // the name state will be managed by the name reducer
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  // make redux devtool work
  // if a devToolsExtension exists, use it. If not, pass the request through
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

// SUBSCRIBE TO CHANGES
var unsubscribe = store.subscribe(() => { // this saves unsubscribe method
  var state = store.getState();

  console.log('Name is ', state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state', store.getState());
});

var currentState = store.getState(); // return state object
console.log('currentState', currentState);

// ACTION = object, must have 'type' property
var action = {
  type: 'CHANGE_NAME', // action name
  name: 'Andy' // value to pass
};

// DISPATCH ACTION
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});
// DISPATCH ACTION
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});
// DISPATCH ACTION
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Stretching'
});
// DISPATCH ACTION
store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

// UNSUBSCRIBE
// unsubscribe();

store.dispatch({
  type: 'ADD_MOVIE',
  movieName: 'Inception',
  movieGenre: 'Drama'
});

store.dispatch({
  type: 'ADD_MOVIE',
  movieName: 'Shawshank Redemption',
  movieGenre: 'Drama'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});

// store.dispatch({
//   type: 'CHANGE_NAME',
//   name: 'Bambi'
// });
// check that action changed the name
// console.log('Name should be Brian', store.getState());
