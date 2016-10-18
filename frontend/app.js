'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var path = require("path");
var app = express();
var fs = require('fs');
var DatabasePath = path.join(__dirname, "/database");

//Set Body parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

//Static
app.use(express.static(__dirname + "/public"));

//All Other Routes
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.post('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

var PortListening = 9001;
app.listen(PortListening, function() {
	console.log('Server running at: http://localhost:' + PortListening);
});
