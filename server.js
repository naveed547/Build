var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static(__dirname));
app.get('/', function (req, res) {
   //res.sendFile( __dirname + "/" + "main.html" );
})
/*app.get('/rApi', function (req, res) {
   fs.readFile( __dirname + "/app/" + "people.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})*/

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})