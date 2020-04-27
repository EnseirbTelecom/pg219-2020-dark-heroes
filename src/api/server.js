//imports
var express = require('express');
var db = require('./database/database');
var test = require('./test/test');


//instantiate server

var server = express();

//configure routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Server deployed </h1>');
});


//launch server
server.listen(8080, function() {
    console.log('Seveur listenning');
});

//bdd deployement 
db.deploy();

//test add new user
test.test1();