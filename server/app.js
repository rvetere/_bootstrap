var express         = require('express');
var path            = require('path');
//var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var errorhandler    = require('errorhandler');
var methodOverride  = require('method-override');

var app             = express(),
    env             = process.env.NODE_ENV || 'development';

/**
 * Development Settings
 *
 * This will change in production since we'll be using the dist folder
 * This covers serving up the index page
 */
if ('development' == env) {
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  app.use(errorhandler());
  console.warn('dev mode activated!');
}

/**
 * Production Settings
 */
if('production' == env) {
  app.use(express.static(path.join(__dirname, '/dist')));
}

app.use(morgan('dev'));                               // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                           // parse application/json
app.use(cookieParser());                              // parse cookies
app.use(methodOverride());                            // simulate DELETE and PUT

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  app.use(errorhandler());
  //res.json({
  //  message: err.message,
  //  error: err
  //});
});

module.exports = app;

app.listen(8080);
console.log('Magic happens on port 8080');            // shoutout to the user
