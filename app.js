/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var baseRouter = require('./routes/base');

// create a new express server
var app = express();

 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', baseRouter);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

 /* // catch 404 and forward to error handler
 app.use(function(req, res, next) {
  next(createError(404));
});

 // error handler
 app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err)
  res.render('error');
}); */

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

module.exports = app;

 //To be deleted after app set (not for prod, only dev)
 //app.listen(3000)
 
 

 

 

