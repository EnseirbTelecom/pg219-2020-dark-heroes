//imports
var express = require('express');
var mongoose = require('mongoose');
var md = require('./database/model/User_model');


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
var url = 'mongodb://localhost:27017/friend-finder'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("database connected");
});

// create collections based on schema 

db.createCollection('User_Collection');
var collection = db.collection('UserCollection');
var modele = md.user_model();

modele.createCollection().then(function(collection) {
    console.log('Collection is created!');
});

//test add new user
var userTest = md.user_init();
userTest.email = 'test';
userTest.last_name = 'jean';
userTest.birthday = null;
collection.insertOne(userTest);