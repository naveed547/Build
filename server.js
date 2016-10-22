/* var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static(__dirname));
app.get('/', function (req, res) {
   //res.sendFile( __dirname + "/" + "main.html" );
})
app.get('/rApi', function (req, res) {
   fs.readFile( __dirname + "/app/" + "people.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

}) */


//Migrating to Mean App

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var index = require('./routes/index');
var todos = require('./routes/todo');
var app = express();
// view engine setup
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);
app.use('/api/v1/', todos);
app.get('/', function (req, res) {
   //res.sendFile( __dirname + "/" + "main.html" );
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});
var server = app.listen(3000, function() {
var host = 'localhost';
var port = server.address().port;
console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;