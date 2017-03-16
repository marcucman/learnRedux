var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

// you typically use one Store to store your entire application
// REDUCER = pure function that takes your existing and state and action as arguments and compute a new state
// ES5 way of assigning default values
// var reducer = (state, action) => {
//   state = state || {name: 'Anonymous'}; // create default
//
//   console.log('New action', action);
// };

// var stateDefault = {
//   name: 'Anonymous',
//   hobbies: [],
//   movies: []
// };
// var nextHobbyId = 1;
// var nextMovieId = 1;

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



// NAME REDUCER and ACTION GENERATORS
// ***************************************
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};
// ACTION GENERATOR
var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name // is identical to name: name
  }
};


// HOBBIES REDUCER and ACTION GENERATORS
// ***************************************
var nextHobbyId = 1;
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
// ACTION GENERATOR
var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby // is identical to hobby: hobby
  }
};
// ACTION GENERATOR
var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// MOVIES REDUCER and ACTION GENERATORS
// ***************************************
var nextMovieId = 1;
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
      return state.filter( (movie) => movie.id !== action.id)
    default:
      return state;
  }
};
// ACTION GENERATOR
var addMovie = (movieName, movieGenre) => {
  return {
    type: 'ADD_MOVIE',
    movieName,
    movieGenre
  }
};
// ACTION GENERATOR
var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};

// MAP REDUCER and ACTION GENERATORS
// ***************************************
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined // clear url if there was one
      }
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      }
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
};

// requests data from 3rd party api
var fetchLocation = () => {
  store.dispatch(startLocationFetch()); // isFetching: true

  axios.get('http://ipinfo.io').then(function(res) {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc)); // isFetching: false
  });
};

// COMBINE REDUCERS
var reducer = redux.combineReducers({
  // the name state will be managed by the name reducer
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  // make redux devtool work
  // if a devToolsExtension exists, use it. If not, pass the request through
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

// SUBSCRIBE TO CHANGES
var unsubscribe = store.subscribe(() => { // this saves unsubscribe method
  var state = store.getState();

  console.log('New state', store.getState());

  if (state.map.isFetching) { // if retrieving
    document.getElementById('app').innerHTML = 'loading...';
  } else if (state.map.url) { // if data has arrived
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
  }
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

fetchLocation();

// change name using action generator
store.dispatch(changeName('Carly'));

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

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bambi'
});

// change name using action generator
store.dispatch(changeName('Dan'));
store.dispatch(addHobby('streaking'));
store.dispatch(removeHobby(1));
store.dispatch(addMovie('42', 'biopic'));
store.dispatch(removeMovie(2));
// check that action changed the name
// console.log('Name should be Brian', store.getState());
