var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js', // use script-loader npm module
    'script!foundation-sites/dist/foundation.min.js', // use script-loader npm module
    './app/app.jsx'
  ], // where to pull the app code from
  externals: { // key = module name, value = variable name we want available in external script files
    jquery: 'jQuery' // allows foundation properly attach methods to jQuery object
  },
  plugins: [
    new webpack.ProvidePlugin({ // key = variable name to watch for, value = module to replace with
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname, // gives the path to the current folder (the root directoy)
    filename: './public/bundle.js' // where to compile the app code at
  },
  resolve: {
    root: __dirname,
    alias: {
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx'] // all the types of files to include
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss') // make sassLoader aware of this directory
    ]
  },
  devtool: 'inline-source-map'
};
