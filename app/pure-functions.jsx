// PURE FUNCTION = always returns same result given same input
// PURE FUNCTION = no side effects, changes no variables outside of function
// PURE FUNCTION = no asynchronous effects
// PURE FUNCTION = cannot update values passed in
function add (a, b) {
  return a + b;
}

// not pure, relies on variable outside itself, does not always return same me output for same inputs( a coule change)
var a = 3;
function add (b) {
  return a + b;
}

var result;
function add (a, b) {
  result = a + b;
  return result;
}

// not pure, same input will not always give same output
function add(a, b) {
  return a + b + new Date().getSeconds();
}

// objects, arrays are passed by refernce, not by value

// you can't define a function to change an object key like this
function changeProp(obj) {
  // THIS WAY IS NOT PURE
  // obj.name = 'Jen';
  // return obj; // this way the original value is changed. you are returning the SAME OBJECT
  // you gotta do this
    return { // this way the original value is not changed. you are returning a NEW OBJECT
      // THIS WAY IS PURE
      ...obj,
      name: 'Jen'
    }
}

var startingValue = {
  name: 'Andrew',
  age: 25
};

var res = changeProp(startingValue);

console.log(startingValue);
console.log(res);
