var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation, not needed after including sassLoader to webpack.config.js
// require('style!css!foundation-sites/dist/foundation.min.css'); // use style-loader and css-loader module
$(document).foundation(); // attach foundation to document

// app css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <p>Boilerplate</p>,
  document.getElementById('app')
);

require('./redux-example.jsx');
